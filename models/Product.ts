import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: mongoose.Types.ObjectId;
  author?: string;
  publisher?: string;
  edition?: string;
  isbn?: string;
  images: string[];
  price: {
    original: number;
    discounted?: number;
    currency: string;
  };
  stock: number;
  isFeatured: boolean;
  isNewRelease: boolean;
  tags: string[];
  downloadUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  shortDescription: {
    type: String,
    trim: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  author: {
    type: String,
    trim: true,
  },
  publisher: {
    type: String,
    trim: true,
  },
  edition: {
    type: String,
    trim: true,
  },
  isbn: {
    type: String,
    trim: true,
  },
  images: [{
    type: String,
  }],
  price: {
    original: {
      type: Number,
      required: [true, 'Original price is required'],
      min: 0,
    },
    discounted: {
      type: Number,
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isNewRelease: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  downloadUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

// Create indexes for faster queries
ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ isNewRelease: 1 });
ProductSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default models.Product || model<IProduct>('Product', ProductSchema);
