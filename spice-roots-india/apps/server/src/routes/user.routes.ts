import express from 'express';
import { updateProfile, getWishlist, addToWishlist, removeFromWishlist } from '../controllers/user.controller';
import { protect } from '../middleware/auth';

const router = express.Router();

router.put('/me', protect, updateProfile);
router.get('/me/wishlist', protect, getWishlist);
router.post('/me/wishlist', protect, addToWishlist);
router.delete('/me/wishlist/:productId', protect, removeFromWishlist);

export default router;
