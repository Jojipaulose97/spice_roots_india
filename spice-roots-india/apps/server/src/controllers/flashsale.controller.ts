import { Request, Response, NextFunction } from 'express';
import { FlashSale } from '../models/FlashSale';

// GET /api/v1/flash-sale — public
export const getFlashSale = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let sale = await FlashSale.findOne();
    if (!sale) sale = await FlashSale.create({});
    res.json({ success: true, data: sale });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/flash-sale — admin only
export const updateFlashSale = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isActive, label, message, discountPct, endsAt } = req.body;
    let sale = await FlashSale.findOne();
    if (!sale) {
      sale = await FlashSale.create({ isActive, label, message, discountPct, endsAt });
    } else {
      if (isActive   !== undefined) sale.isActive    = isActive;
      if (label      !== undefined) sale.label       = label;
      if (message    !== undefined) sale.message     = message;
      if (discountPct!== undefined) sale.discountPct = discountPct;
      if (endsAt     !== undefined) sale.endsAt      = new Date(endsAt);
      await sale.save();
    }
    res.json({ success: true, data: sale });
  } catch (error) {
    next(error);
  }
};
