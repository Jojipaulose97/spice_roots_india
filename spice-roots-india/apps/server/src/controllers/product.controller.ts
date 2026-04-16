import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product';
import { Review } from '../models/Review';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    const query: any = { isActive: true };

    if (req.query.search) {
      query.$text = { $search: req.query.search as string };
    }
    if (req.query.category) {
      query.category = req.query.category;
    }

    const sortOpt: any = {};
    if (req.query.sort === 'price_asc') sortOpt['prices.INR'] = 1;
    else if (req.query.sort === 'price_desc') sortOpt['prices.INR'] = -1;
    else if (req.query.sort === 'newest') sortOpt.createdAt = -1;
    else if (req.query.sort === 'best_selling') sortOpt.reviewCount = -1; // roughly best selling

    const products = await Product.find(query).sort(sortOpt).skip(skip).limit(limit);
    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    
    // Also fetch reviews optionally
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const getProductReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    
    const reviews = await Review.find({ productId: product._id }).populate('userId', 'name').sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

export const addReview = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const alreadyReviewed = await Review.findOne({ productId: product._id, userId: req.user._id });
    if (alreadyReviewed) return res.status(400).json({ success: false, message: 'Product already reviewed' });

    const review = await Review.create({
      productId: product._id,
      userId: req.user._id,
      rating: Number(rating),
      comment
    });

    product.reviewCount += 1;
    // Recalculate average rating roughly
    product.avgRating = ((product.avgRating * (product.reviewCount - 1)) + Number(rating)) / product.reviewCount;
    await product.save();

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

// Admin Routes
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Soft delete
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deactivated' });
  } catch (error) {
    next(error);
  }
};
