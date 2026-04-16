import express from 'express';
import { getOrders, getMyOrders, createOrder, getOrderById, createRazorpayOrder, verifyRazorpayPayment } from '../controllers/order.controller';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .post(protect, createOrder) // Or remove protect for guest checkout
  .get(protect, admin, getOrders);

router.get('/myorders', protect, getMyOrders);
router.get('/:id', getOrderById);

// Razorpay routes
router.post('/payments/create-order', protect, createRazorpayOrder);
router.post('/payments/verify', protect, verifyRazorpayPayment);

export default router;
