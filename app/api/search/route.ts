import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from '@/models/Product';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

// GET /api/search - Search products with autocomplete
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    // Search using text index and regex for partial matches
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
      ],
    })
      .select('title slug images price author')
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error: any) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
