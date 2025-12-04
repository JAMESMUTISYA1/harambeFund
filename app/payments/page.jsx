// app/payments/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const campaignId = searchParams.get('id');
  const campaignTitle = searchParams.get('title');
  const amount = searchParams.get('amount') || '';

  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    amount: amount,
    phoneNumber: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mpesaStatus, setMpesaStatus] = useState(''); // 'waiting', 'processing', 'success', 'failed'
  const [checkoutRequestId, setCheckoutRequestId] = useState('');

  useEffect(() => {
    if (!campaignId || !campaignTitle) {
      router.push('/campaigns');
    }
  }, [campaignId, campaignTitle, router]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return false;
    }

    switch (paymentMethod) {
      case 'mpesa':
        if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
          setError('Please enter a valid M-Pesa phone number');
          return false;
        }
        break;
      case 'airtel':
        if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
          setError('Please enter a valid Airtel Money phone number');
          return false;
        }
        break;
      case 'stripe':
        if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.name) {
          setError('Please fill all card details');
          return false;
        }
        break;
      default:
        setError('Please select a payment method');
        return false;
    }
    return true;
  };

  // Poll M-Pesa transaction status
  const pollMpesaStatus = async (checkoutRequestId, maxAttempts = 30) => {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await fetch('/api/payments/mpesa-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ checkoutRequestId }),
        });

        const result = await response.json();

        if (result.status === 'success') {
          setMpesaStatus('success');
          return result;
        } else if (result.status === 'failed') {
          setMpesaStatus('failed');
          throw new Error(result.message || 'Payment failed');
        }
        // If still processing, wait and try again
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      } catch (error) {
        if (attempt === maxAttempts) {
          setMpesaStatus('failed');
          throw new Error('Payment timeout. Please check your phone and try again.');
        }
      }
    }
  };

  const processPayment = async () => {
    try {
      setLoading(true);
      setError('');
      setMpesaStatus('');

      if (!validateForm()) return;

      const paymentData = {
        campaignId,
        campaignTitle,
        amount: parseFloat(formData.amount),
        paymentMethod,
        ...formData
      };

      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Payment failed');
      }

      if (paymentMethod === 'mpesa') {
        // For M-Pesa, wait for user to complete payment on their phone
        setMpesaStatus('waiting');
        setCheckoutRequestId(result.data.CheckoutRequestID);
        
        // Start polling for payment status
        const finalResult = await pollMpesaStatus(result.data.CheckoutRequestID);
        
        // Only redirect if payment was successful
        if (finalResult.status === 'success') {
          router.push(`/payments/success?transactionId=${finalResult.transactionId}`);
        }
      } else {
        // For other payment methods, redirect immediately
        router.push(`/payments/success?transactionId=${result.transactionId}`);
      }

    } catch (err) {
      setError(err.message);
      setMpesaStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.startsWith('0')) {
      return `254${numbers.slice(1)}`;
    } else if (numbers.startsWith('254')) {
      return numbers;
    } else if (numbers.length <= 9) {
      return `254${numbers}`;
    }
    return numbers;
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handlePaymentMethodSelect = (method, e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') {
      return;
    }
    setPaymentMethod(paymentMethod === method ? '' : method);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Donation</h1>
              <p className="text-gray-600">{campaignTitle}</p>
            </div>

            {/* M-Pesa Status Display */}
            {mpesaStatus === 'waiting' && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                  <div>
                    <p className="text-blue-800 font-medium">Waiting for M-Pesa Payment</p>
                    <p className="text-blue-600 text-sm">
                      Please check your phone and enter your M-Pesa PIN to complete the payment.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {mpesaStatus === 'processing' && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-yellow-600 border-t-transparent"></div>
                  <div>
                    <p className="text-yellow-800 font-medium">Processing Payment</p>
                    <p className="text-yellow-600 text-sm">Confirming your payment...</p>
                  </div>
                </div>
              </div>
            )}

            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donation Amount (KES)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">KES</span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.00"
                  min="1"
                  disabled={mpesaStatus === 'waiting' || mpesaStatus === 'processing'}
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Payment Method
              </label>
              
              <div className="space-y-3">
                {/* M-Pesa Option */}
                <div className={`w-full border-2 rounded-xl transition-all ${
                  paymentMethod === 'mpesa' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${mpesaStatus ? 'opacity-50' : ''}`}>
                  <button
                    onClick={(e) => !mpesaStatus && handlePaymentMethodSelect('mpesa', e)}
                    disabled={mpesaStatus}
                    className="w-full p-4 text-left disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">M</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">M-Pesa</div>
                          <div className="text-sm text-gray-600">Pay via M-Pesa</div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        paymentMethod === 'mpesa' ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}></div>
                    </div>
                  </button>
                  
                  {paymentMethod === 'mpesa' && (
                    <div className="px-4 pb-4">
                      <div className="mb-3">
                        <label 
                          htmlFor="mpesa-phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          M-Pesa Phone Number
                        </label>
                        <input
                          id="mpesa-phone"
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({
                            ...formData,
                            phoneNumber: formatPhoneNumber(e.target.value)
                          })}
                          onClick={handleInputClick}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="07XX XXX XXX"
                          maxLength="12"
                          disabled={mpesaStatus === 'waiting' || mpesaStatus === 'processing'}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Other payment methods remain the same but disabled during M-Pesa processing */}
                <div className={`w-full border-2 rounded-xl transition-all ${
                  paymentMethod === 'airtel' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${mpesaStatus ? 'opacity-50' : ''}`}>
                  <button
                    onClick={(e) => !mpesaStatus && handlePaymentMethodSelect('airtel', e)}
                    disabled={mpesaStatus}
                    className="w-full p-4 text-left disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Airtel Money</div>
                          <div className="text-sm text-gray-600">Pay via Airtel Money</div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        paymentMethod === 'airtel' ? 'bg-red-500 border-red-500' : 'border-gray-300'
                      }`}></div>
                    </div>
                  </button>
                  
                  {paymentMethod === 'airtel' && (
                    <div className="px-4 pb-4">
                      <div className="mb-3">
                        <label 
                          htmlFor="airtel-phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Airtel Money Phone Number
                        </label>
                        <input
                          id="airtel-phone"
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({
                            ...formData,
                            phoneNumber: formatPhoneNumber(e.target.value)
                          })}
                          onClick={handleInputClick}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="07XX XXX XXX"
                          maxLength="12"
                          disabled={mpesaStatus === 'waiting' || mpesaStatus === 'processing'}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Stripe Option - similar disabled state */}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={processPayment}
                disabled={loading || mpesaStatus === 'waiting' || mpesaStatus === 'processing'}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {mpesaStatus === 'waiting' ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Waiting for M-Pesa...
                  </div>
                ) : mpesaStatus === 'processing' ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Confirming Payment...
                  </div>
                ) : loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Donate KES ${formData.amount || '0'}`
                )}
              </button>
              
              <button
                onClick={() => router.back()}
                disabled={mpesaStatus === 'waiting' || mpesaStatus === 'processing'}
                className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
              >
                Cancel
              </button>
            </div>

            {/* Security Notice */}
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure payment encrypted with SSL</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}