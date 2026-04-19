import mongoose, { Document, Schema } from 'mongoose';

export interface IFlashSale extends Document {
  isActive: boolean;
  label: string;
  message: string;
  discountPct: number;
  endsAt: Date;
}

const FlashSaleSchema = new Schema<IFlashSale>(
  {
    isActive:   { type: Boolean, default: false },
    label:      { type: String,  default: 'FLASH SALE' },
    message:    { type: String,  default: 'Up to 26% OFF on all Kerala Spices!' },
    discountPct:{ type: Number,  default: 26, min: 1, max: 100 },
    endsAt:     { type: Date,    default: () => new Date(Date.now() + 8 * 60 * 60 * 1000) },
  },
  { timestamps: true }
);

export const FlashSale = mongoose.model<IFlashSale>('FlashSale', FlashSaleSchema);
