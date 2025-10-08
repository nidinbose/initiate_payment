import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
    } = await request.json();

    // Verify the signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Connect to MongoDB
      await connectDB();

      // Save payment details to database
      const payment = new Payment({
        name,
        amount: 100, // ₹1 = 100 paise
        currency: 'INR',
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        status: 'completed',
      });

      await payment.save();

      return NextResponse.json({
        success: true,
        message: 'Payment verified and saved successfully',
        payment: payment,
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Payment verification failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
