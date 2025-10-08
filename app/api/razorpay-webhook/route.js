import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    console.log('Webhook received:', {
      hasSignature: !!signature,
      bodyLength: body.length
    });

    if (!signature) {
      console.error('No signature provided');
      return NextResponse.json(
        { success: false, message: 'No signature provided' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Webhook signature verification failed');
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);
    console.log('Webhook event:', event.type);

    // Handle payment captured event
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const order = event.payload.order.entity;

      try {
        await connectDB();

        // Save payment details to database
        const paymentRecord = new Payment({
          name: order.notes?.customer_name || 'Unknown',
          amount: payment.amount,
          currency: payment.currency,
          razorpay_order_id: order.id,
          razorpay_payment_id: payment.id,
          razorpay_signature: signature,
          status: 'completed',
        });

        await paymentRecord.save();
        console.log('Payment saved via webhook:', paymentRecord._id);

        return NextResponse.json({
          success: true,
          message: 'Payment processed successfully'
        });
      } catch (dbError) {
        console.error('Database error in webhook:', dbError);
        return NextResponse.json(
          { success: false, message: 'Database error' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook received but no action taken'
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { success: false, message: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
