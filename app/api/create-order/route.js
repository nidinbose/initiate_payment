import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

// Initialize Razorpay with error checking
let razorpay;
try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} catch (error) {
  console.error('Razorpay initialization error:', error);
}

export async function POST(request) {
  try {
    const { name, amount } = await request.json();

    console.log('Create order request:', { name, amount });

    // Check if Razorpay is initialized
    if (!razorpay) {
      console.error('Razorpay not initialized');
      return NextResponse.json(
        { success: false, message: 'Payment service not configured' },
        { status: 500 }
      );
    }

    // Check environment variables
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Missing Razorpay credentials');
      return NextResponse.json(
        { success: false, message: 'Payment service configuration missing' },
        { status: 500 }
      );
    }

    if (!name || !amount) {
      return NextResponse.json(
        { success: false, message: 'Name and amount are required' },
        { status: 400 }
      );
    }

    const options = {
      amount: amount, // Amount in paise (₹2 = 200 paise)
      currency: 'INR',
      receipt: `receipt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      notes: {
        customer_name: name,
        created_at: new Date().toISOString(),
      },
    };

    console.log('Creating Razorpay order with options:', options);

    const order = await razorpay.orders.create(options);

    console.log('Order created successfully:', order.id);

    return NextResponse.json({
      success: true,
      order: order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    
    // Handle specific Razorpay errors
    if (error.error) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Payment error: ${error.error.description || error.error.code}`,
          error: error.error
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create order',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
