import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from '@/models/Product';

// Ensure MongoDB connection
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

// GET /api/products - List products with pagination, filtering, search
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const newRelease = searchParams.get('newRelease');
    const sort = searchParams.get('sort') || '-createdAt';

    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (newRelease === 'true') query.isNewRelease = true;
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product (admin)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Generate slug from title if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const product = await Product.create(body);

    return NextResponse.json({
      success: true,
      data: product,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
