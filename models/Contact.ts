import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  phone: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded'],
    default: 'new',
  },
}, {
  timestamps: true,
});

// Create indexes
ContactSchema.index({ status: 1 });
ContactSchema.index({ createdAt: -1 });

export default models.Contact || model<IContact>('Contact', ContactSchema);
