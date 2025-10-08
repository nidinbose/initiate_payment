'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim(), amount: 9900 }), 
      });

      const data = await response.json();

      if (data.success) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: data.order.currency,
          name: 'UNSTUCK Masterclass',
          description: 'Payment for UNSTUCK 2-Hour Masterclass',
          order_id: data.order.id,
          handler: async function (response) {
            try {
              const verifyResponse = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  name: name.trim(),
                }),
              });

              const verifyData = await verifyResponse.json();
              
              if (verifyData.success) {
                router.push('/success');
              } else {
                alert('Payment verification failed: ' + verifyData.message);
              }
            } catch (error) {
              console.error('Payment verification error:', error);
              alert('Payment verification failed. Please contact support.');
            }
          },
          prefill: {
            name: name.trim(),
          },
          theme: {
            color: '#F59E0B',
          },
          modal: {
            ondismiss: function() {
              setIsLoading(false);
            }
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        alert('Failed to create order: ' + data.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-900 to-yellow-800 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black/40 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 border border-white/10">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">UNSTUCK Masterclass</h1>
          <p className="text-gray-300 mb-6">Join the 2-Hour Live Masterclass</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 rounded-lg p-4 border border-yellow-500/30">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Amount to pay:</span>
              <span className="text-2xl font-bold text-yellow-400">₹99</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isLoading || !name.trim()}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-600 hover:from-yellow-500 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Pay ₹99 Now
              </>
            )}
          </button>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400">
            Secure payment powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
}
