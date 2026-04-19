import express from 'express';
import { getFlashSale, updateFlashSale } from '../controllers/flashsale.controller';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.get('/',  getFlashSale);
router.put('/',  protect, admin, updateFlashSale);

export default router;
