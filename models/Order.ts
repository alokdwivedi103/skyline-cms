import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IOrder extends Document {
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    };
  };
  items: Array<{
    product: mongoose.Types.ObjectId;
    title: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'COD' | 'Online' | 'UPI';
  paymentStatus: 'pending' | 'completed' | 'failed';
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
    },
    email: {
      type: String,
      required: [true, 'Customer email is required'],
    },
    phone: {
      type: String,
      required: [true, 'Customer phone is required'],
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: 'India' },
    },
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'Online', 'UPI'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  trackingNumber: {
    type: String,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

// Create indexes
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ 'customer.email': 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

export default models.Order || model<IOrder>('Order', OrderSchema);
