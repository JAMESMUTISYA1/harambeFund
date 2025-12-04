// components/PaymentModal.js
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PaymentModal({ campaign, onClose, onSuccess, onError }) {
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [100, 500, 1000, 2000, 5000];

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setDonationAmount(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Validate inputs
    if (!donationAmount || donationAmount < 10) {
      alert('Please enter a valid donation amount (minimum KES 10)');
      setIsProcessing(false);
      return;
    }
    
    if (selectedMethod === 'mpesa' && (!phoneNumber || phoneNumber.length < 9)) {
      alert('Please enter a valid phone number for M-Pesa');
      setIsProcessing(false);
      return;
    }
    
    if (selectedMethod === 'card' && !email) {
      alert('Please enter your email for receipt purposes');
      setIsProcessing(false);
      return;
    }
    
    try {
      // In a real implementation, this would call your API endpoint
      // which would then process the payment with the respective provider
      console.log('Processing payment:', {
        campaignId: campaign.id,
        amount: donationAmount,
        method: selectedMethod,
        phone: phoneNumber,
        email: email
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      onSuccess();
      alert(`Thank you for your donation of KES ${donationAmount} to ${campaign.title}!`);
    } catch (error) {
      onError(error);
      alert('There was an error processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Donate to {campaign.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Donation Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donation Amount (KES)
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {presetAmounts.map(amount => (
                  <button
                    key={amount}
                    type="button"
                    className={`py-2 px-4 rounded border ${
                      donationAmount === amount.toString() && !customAmount
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleAmountSelect(amount.toString())}
                  >
                    {amount.toLocaleString()}
                  </button>
                ))}
              </div>
              <div>
                <label htmlFor="custom-amount" className="sr-only">Or enter custom amount</label>
                <input
                  type="number"
                  id="custom-amount"
                  placeholder="Or enter custom amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  min="10"
                />
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="mpesa"
                    name="payment-method"
                    type="radio"
                    value="mpesa"
                    checked={selectedMethod === 'mpesa'}
                    onChange={() => setSelectedMethod('mpesa')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="mpesa" className="ml-3 flex items-center">
                    <Image src="/images/mpesa-logo.png" alt="M-Pesa" width={60} height={24} className="mr-2" />
                    <span>M-Pesa</span>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="visa"
                    name="payment-method"
                    type="radio"
                    value="visa"
                    checked={selectedMethod === 'visa'}
                    onChange={() => setSelectedMethod('visa')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="visa" className="ml-3 flex items-center">
                    <Image src="/images/visa-logo.png" alt="Visa" width={40} height={24} className="mr-2" />
                    <span>Visa/MasterCard</span>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="airtel"
                    name="payment-method"
                    type="radio"
                    value="airtel"
                    checked={selectedMethod === 'airtel'}
                    onChange={() => setSelectedMethod('airtel')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="airtel" className="ml-3 flex items-center">
                    <Image src="/images/airtel-money-logo.png" alt="Airtel Money" width={60} height={24} className="mr-2" />
                    <span>Airtel Money</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Payment Details */}
            {selectedMethod === 'mpesa' || selectedMethod === 'airtel' ? (
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="e.g., 07XX XXX XXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email (for receipt)
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Donate KES ${donationAmount || '0'}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}