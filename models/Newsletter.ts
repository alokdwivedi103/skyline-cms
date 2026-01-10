import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  isActive: boolean;
  subscribedAt: Date;
}

const NewsletterSchema = new Schema<INewsletter>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create index
NewsletterSchema.index({ email: 1 });

export default models.Newsletter || model<INewsletter>('Newsletter', NewsletterSchema);
