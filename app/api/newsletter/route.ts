import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Newsletter from '@/models/Newsletter';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email: email.toLowerCase() });

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          { success: false, error: 'Email already subscribed' },
          { status: 400 }
        );
      } else {
        // Reactivate subscription
        existing.isActive = true;
        existing.subscribedAt = new Date();
        await existing.save();

        return NextResponse.json({
          success: true,
          message: 'Subscription reactivated successfully',
        });
      }
    }

    // Create new subscription
    const subscription = await Newsletter.create({ email });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscription,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
