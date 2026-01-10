import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Order from '@/models/Order';
import Product from '@/models/Product';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const { customer, items, paymentMethod } = body;

    if (!customer || !items || !items.length || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: 'Customer, items, and payment method are required' },
        { status: 400 }
      );
    }

    // Validate products and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return NextResponse.json(
          { success: false, error: `Product ${item.product} not found` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { success: false, error: `Insufficient stock for ${product.title}` },
          { status: 400 }
        );
      }

      const price = product.price.discounted || product.price.original;
      totalAmount += price * item.quantity;

      orderItems.push({
        product: product._id,
        title: product.title,
        quantity: item.quantity,
        price: price,
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Create order
    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      customer,
      items: orderItems,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'pending' : 'pending',
    });

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      data: order,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET /api/orders - List orders (admin)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const email = searchParams.get('email');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const skip = (page - 1) * limit;

    const query: any = {};
    if (status) query.status = status;
    if (email) query['customer.email'] = email;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Order.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
