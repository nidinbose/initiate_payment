'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-blue-700 flex items-center justify-center p-4 text-white">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center border border-white/20">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-blue-100/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-blue-200 mb-4">Payment Successful!</h1>

        <p className="text-blue-100 mb-6">
          Thank you for your payment. Your transaction has been completed successfully.
        </p>

        {/* Payment Info */}
        <div className="bg-blue-500/10 rounded-lg p-4 mb-6 border border-blue-400/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-blue-100">Amount Paid:</span>
            <span className="text-xl font-bold text-blue-300">₹99.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-100">Status:</span>
            <span className="text-green-400 font-semibold">Completed</span>
          </div>
        </div>

        {/* Countdown + Button */}
        <div className="space-y-4">
          <p className="text-sm text-blue-200">
            You will be redirected to the homepage in{' '}
            <span className="font-bold text-white">{countdown}</span> seconds...
          </p>

          <button
            onClick={() => router.push('/')}
            className="w-full bg-gradient-to-r from-blue-400 to-white hover:from-blue-500 hover:to-blue-200 text-black font-semibold py-3 px-4 rounded-full transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
