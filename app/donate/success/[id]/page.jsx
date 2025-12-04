// app/donate/success/[id]/page.js
'use client';

import { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function DonationSuccess() {
  const params = useParams();
  const searchParams = useSearchParams();
  const campaignId = params.id;
  const amount = searchParams.get('amount');

  useEffect(() => {
    // Track conversion or send confirmation email
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">Donation Successful! 🎉</h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your generous donation of{' '}
              <span className="font-semibold text-green-600">KES {parseInt(amount).toLocaleString()}</span>.
              Your support is making a real difference.
            </p>

            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-green-800 mb-2">What happens next?</h2>
              <ul className="text-sm text-green-700 space-y-1 text-left">
                <li>• You'll receive a receipt via email within 24 hours</li>
                <li>• The campaign organizer has been notified of your donation</li>
                <li>• Your support will be reflected in the campaign progress</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/campaigns/${campaignId}`}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
              >
                View Campaign
              </Link>
              
              <Link
                href="/campaigns"
                className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition"
              >
                Explore More Causes
              </Link>
              
              <button
                onClick={() => window.print()}
                className="border border-gray-300 text-gray-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Print Receipt
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Questions about your donation?{' '}
                <a href="/contact" className="text-green-600 hover:underline">
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}