import express from 'express';
import { getProducts, getProductBySlug, getProductReviews, createProduct, updateProduct, deleteProduct, addReview } from '../controllers/product.controller';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.route('/:slug')
  .get(getProductBySlug);

router.route('/:slug/reviews')
  .get(getProductReviews);

router.route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route('/:id/reviews')
  .post(protect, addReview);

export default router;
