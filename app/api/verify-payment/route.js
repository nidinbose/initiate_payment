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

    console.log('Payment verification request:', {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature: razorpay_signature ? 'present' : 'missing',
      name,
    });

    // Check if all required fields are present
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !name) {
      console.error('Missing required fields for payment verification');
      return NextResponse.json(
        { success: false, message: 'Missing required payment information' },
        { status: 400 }
      );
    }

    // Check if environment variables are available
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error('RAZORPAY_KEY_SECRET is not set');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Verify the signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    console.log('Signature verification:', {
      expected: expectedSignature,
      received: razorpay_signature,
      match: expectedSignature === razorpay_signature
    });

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      try {
        // Connect to MongoDB
        await connectDB();

        // Save payment details to database
        const payment = new Payment({
          name,
          amount: 200, // ₹2 = 200 paise (updated to match new amount)
          currency: 'INR',
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          status: 'completed',
        });

        await payment.save();

        console.log('Payment saved successfully:', payment._id);

        return NextResponse.json({
          success: true,
          message: 'Payment verified and saved successfully',
          paymentId: payment._id,
        });
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Even if DB save fails, payment is still verified
        return NextResponse.json({
          success: true,
          message: 'Payment verified successfully (database save failed)',
          warning: 'Payment verified but not saved to database',
        });
      }
    } else {
      console.error('Signature verification failed');
      return NextResponse.json(
        { success: false, message: 'Payment signature verification failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Payment verification failed',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
