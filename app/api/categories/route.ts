import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Category from '@/models/Category';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

// GET /api/categories - List all categories
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const parentOnly = searchParams.get('parentOnly') === 'true';

    const query: any = { isActive: true };
    if (parentOnly) {
      query.parentCategory = { $exists: false };
    }

    const categories = await Category.find(query)
      .populate('parentCategory', 'name slug')
      .sort({ displayOrder: 1, name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create category
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Generate slug from name if not provided
    if (!body.slug) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const category = await Category.create(body);

    return NextResponse.json({
      success: true,
      data: category,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
