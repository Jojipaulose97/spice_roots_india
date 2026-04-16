import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  variants: {
    weight: string;
    price: number;
    stock: number;
  }[];
  tags: string[];
  isFSSAI: boolean;
  origin: string;
  isActive: boolean;
  avgRating: number;
  reviewCount: number;
  prices: {
    INR: number;
    USD: number;
    AED: number;
    GBP: number;
  };
  vendorId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    variants: [
      {
        weight: { type: String, required: true }, // e.g., '25g', '50g', '100g'
        price: { type: Number, required: true }, // Base INR price override if needed
        stock: { type: Number, required: true, default: 0 }
      }
    ],
    tags: [{ type: String }],
    isFSSAI: { type: Boolean, default: true },
    origin: { type: String, default: 'Kerala, India' },
    isActive: { type: Boolean, default: true },
    avgRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    prices: {
      INR: { type: Number, required: true },
      USD: { type: Number },
      AED: { type: Number },
      GBP: { type: Number }
    },
    vendorId: { type: String }
  },
  { timestamps: true }
);

// Indexes for search
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });

export const Product = mongoose.model<IProduct>('Product', productSchema);
