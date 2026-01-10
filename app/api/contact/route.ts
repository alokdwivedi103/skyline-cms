import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Contact from '@/models/Contact';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET /api/contact - Get all contact submissions (admin)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const skip = (page - 1) * limit;

    const query: any = {};
    if (status) query.status = status;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Contact.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
