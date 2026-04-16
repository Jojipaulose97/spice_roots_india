import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

export const updateProfile = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.passwordHash = req.body.password;
    }
    
    // update addresses
    if (req.body.addresses && Array.isArray(req.body.addresses)) {
      user.addresses = req.body.addresses;
    }

    const updatedUser = await user.save();
    res.json({ success: true, data: { _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email } });
  } catch (error) {
    next(error);
  }
};

export const getWishlist = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user.wishlist });
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const { productId } = req.body;
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    
    res.json({ success: true, data: user.wishlist });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
    await user.save();

    res.json({ success: true, data: user.wishlist });
  } catch (error) {
    next(error);
  }
};
