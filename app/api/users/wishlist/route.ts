import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { headers } from 'next/headers';

const MONGODB_URI = process.env.MONGODB_URI as string;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

const getUserFromToken = async () => {
  const headersList = headers();
  const token = headersList.get('authorization')?.split(' ')[1];

  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

export async function GET(req: Request) {
  try {
    const userId = await getUserFromToken();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await User.findById(userId).populate('wishlist');
    
    return NextResponse.json({
      success: true,
      data: user.wishlist,
    });
  } catch (error) {
    console.error('Wishlist Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserFromToken();
    const { productId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await User.findById(userId);
    
    // Check if product is already in wishlist
    const index = user.wishlist.indexOf(productId);
    let action = '';

    if (index > -1) {
      // Remove from wishlist
      user.wishlist.splice(index, 1);
      action = 'removed';
    } else {
      // Add to wishlist
      user.wishlist.push(productId);
      action = 'added';
    }

    await user.save();

    return NextResponse.json({
      success: true,
      action,
      message: `Product ${action} wishlist`,
    });

  } catch (error) {
    console.error('Wishlist Update Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
