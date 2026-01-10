import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentCategory?: mongoose.Types.ObjectId;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Category name is required'],
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
    trim: true,
  },
  image: {
    type: String,
  },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Create index for faster queries
CategorySchema.index({ slug: 1 });
CategorySchema.index({ isActive: 1, displayOrder: 1 });

export default models.Category || model<ICategory>('Category', CategorySchema);
