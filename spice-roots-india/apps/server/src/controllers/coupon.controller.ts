import { Request, Response, NextFunction } from 'express';
import { Coupon } from '../models/Coupon';

export const validateCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, orderValue } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon) return res.status(404).json({ success: false, message: 'Invalid or inactive coupon' });

    if (coupon.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: 'Coupon expired' });
    }

    if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses) {
      return res.status(400).json({ success: false, message: 'Coupon usage limit reached' });
    }

    if (orderValue < coupon.minOrderValue) {
      return res.status(400).json({ success: false, message: `Minimum order value of ₹${coupon.minOrderValue} required` });
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (orderValue * coupon.discountValue) / 100;
    } else {
      discount = coupon.discountValue;
    }

    res.json({ success: true, discount, type: coupon.discountType, value: coupon.discountValue });
  } catch (error) {
    next(error);
  }
};
