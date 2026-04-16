import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  userId?: mongoose.Types.ObjectId; // Optional for guest checkout if allowed
  items: {
    productId: mongoose.Types.ObjectId;
    name: string;
    weight: string;
    qty: number;
    price: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  currency: string;
  paymentMethod: string;
  paymentId?: string;
  razorpayOrderId?: string;
  status: 'Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
  courierName?: string;
  totalAmount: number;
  couponUsed?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        weight: { type: String, required: true },
        qty: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }
      }
    ],
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: 'India' }
    },
    currency: { type: String, default: 'INR' },
    paymentMethod: { type: String, required: true }, // e.g., 'Razorpay', 'COD'
    paymentId: { type: String },
    razorpayOrderId: { type: String },
    status: {
      type: String,
      enum: ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Placed'
    },
    trackingNumber: { type: String },
    courierName: { type: String },
    totalAmount: { type: Number, required: true },
    couponUsed: { type: String }
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', orderSchema);
