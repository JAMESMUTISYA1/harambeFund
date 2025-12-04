// app/donate/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Client, Databases, ID } from 'appwrite';

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

// Collection IDs
const CAMPAIGNS_COLLECTION_ID = process.env.NEXT_PUBLIC_CAMPAIGNS_COLLECTION_ID || 'campaigns';
const DONATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_DONATIONS_COLLECTION_ID || 'donations';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'harambee';

export default function DonatePage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id;
  
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    anonymous: false,
    paymentMethod: 'mpesa', // Default to M-Pesa
    // Card payment fields
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    // Mobile money fields
    mobileMoneyPhone: ''
  });

  useEffect(() => {
    fetchCampaign();
  }, [campaignId]);

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      
      const campaignData = await databases.getDocument(
        DATABASE_ID,
        CAMPAIGNS_COLLECTION_ID,
        campaignId
      );

      setCampaign(campaignData);
    } catch (error) {
      console.error("Error fetching campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Validate form based on payment method
      if (formData.paymentMethod === 'mpesa' || formData.paymentMethod === 'airtel') {
        if (!formData.mobileMoneyPhone) {
          alert('Please enter your phone number for mobile money payment');
          setProcessing(false);
          return;
        }
      } else if (formData.paymentMethod === 'card') {
        if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardName) {
          alert('Please complete all card details');
          setProcessing(false);
          return;
        }
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create donation record
      await databases.createDocument(
        DATABASE_ID,
        DONATIONS_COLLECTION_ID,
        ID.unique(),
        {
          campaign_id: campaignId,
          amount: parseFloat(formData.amount),
          donor_name: formData.anonymous ? 'Anonymous' : formData.name,
          donor_email: formData.email,
          donor_phone: formData.phone,
          message: formData.message,
          payment_method: formData.paymentMethod,
          payment_status: 'completed',
          currency: 'KES',
          is_anonymous: formData.anonymous
        }
      );

      // Update campaign total
      await databases.updateDocument(
        DATABASE_ID,
        CAMPAIGNS_COLLECTION_ID,
        campaignId,
        {
          current_amount: (campaign.current_amount || 0) + parseFloat(formData.amount),
          donor_count: (campaign.donor_count || 0) + 1
        }
      );

      // Redirect to success page
      router.push(`/donate/success/${campaignId}?amount=${formData.amount}`);
      
    } catch (error) {
      console.error("Payment error:", error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const suggestedAmounts = [100, 500, 1000, 2000, 5000];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading campaign...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Campaign Not Found</h2>
            <p className="text-gray-600 mb-4">The campaign you're trying to support doesn't exist.</p>
            <a href="/campaigns" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Browse Campaigns
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Support This Cause</h1>
            <p className="text-gray-600">Be the reason {campaign.beneficiary_name} smiles today.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Campaign Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Campaign Summary</h2>
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex items-center justify-center">
                  {campaign.imageId ? (
                    <img 
                      src={`/api/images/${campaign.imageId}`} 
                      alt={campaign.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-2xl">🤝</span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{campaign.title}</h3>
                  <p className="text-sm text-gray-600">Beneficiary: {campaign.beneficiary_name}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Raised</span>
                  <span className="font-semibold">KES {(campaign.raised || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Goal</span>
                  <span className="font-semibold">KES {(campaign.target_amount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Supporters</span>
                  <span className="font-semibold">{campaign.donor_count || 0}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                    style={{ 
                      width: `${campaign.target_amount > 0 
                        ? Math.min(100, Math.round(((campaign.raised || 0) / campaign.target_amount) * 100)) 
                        : 0}%` 
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1 text-center">
                  {campaign.target_amount > 0 
                    ? Math.min(100, Math.round(((campaign.raised || 0) / campaign.target_amount) * 100)) 
                    : 0}% funded
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  💫 98% of donations go directly to the beneficiary. We charge only a 2% platform fee to keep Harambee running.
                </p>
              </div>
            </div>

            {/* Donation Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Make a Donation</h2>
              
              <form onSubmit={handleDonate} className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Donation Amount (KES) *
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {suggestedAmounts.map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                        className={`p-3 rounded-lg border transition ${
                          formData.amount === amount.toString() 
                            ? 'border-green-500 bg-green-50 text-green-700' 
                            : 'border-gray-300 hover:border-green-300'
                        }`}
                      >
                        {amount.toLocaleString()}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, amount: '' }))}
                      className="p-3 rounded-lg border border-gray-300 hover:border-green-300 col-span-3"
                    >
                      Custom Amount
                    </button>
                  </div>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter custom amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                    min="10"
                  />
                </div>

                {/* Donor Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required={!formData.anonymous}
                      disabled={formData.anonymous}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="anonymous"
                      checked={formData.anonymous}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Donate anonymously
                    </label>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {/* M-Pesa */}
                    <label className={`flex flex-col p-4 border rounded-lg cursor-pointer transition ${
                      formData.paymentMethod === 'mpesa' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 hover:border-green-300'
                    }`}>
                      <div className="flex items-center mb-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="mpesa"
                          checked={formData.paymentMethod === 'mpesa'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">M-Pesa</span>
                      </div>
                      <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center ml-6">
                        <span className="text-white text-xs font-bold">M</span>
                      </div>
                    </label>

                    {/* Airtel Money */}
                    <label className={`flex flex-col p-4 border rounded-lg cursor-pointer transition ${
                      formData.paymentMethod === 'airtel' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 hover:border-green-300'
                    }`}>
                      <div className="flex items-center mb-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="airtel"
                          checked={formData.paymentMethod === 'airtel'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">Airtel Money</span>
                      </div>
                      <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center ml-6">
                        <span className="text-white text-xs font-bold">A</span>
                      </div>
                    </label>

                    {/* Card Payment */}
                    <label className={`flex flex-col p-4 border rounded-lg cursor-pointer transition ${
                      formData.paymentMethod === 'card' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 hover:border-green-300'
                    }`}>
                      <div className="flex items-center mb-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">Card</span>
                      </div>
                      <div className="flex space-x-1 ml-6">
                        <div className="w-6 h-4 bg-blue-500 rounded-sm"></div>
                        <div className="w-6 h-4 bg-yellow-400 rounded-sm"></div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Payment Method Specific Fields */}
                {(formData.paymentMethod === 'mpesa' || formData.paymentMethod === 'airtel') && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {formData.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Airtel Money'} Phone Number *
                    </label>
                    <div className="flex">
                      <div className="w-1/4 mr-2">
                        <select className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                          <option value="+254">+254 (KE)</option>
                          <option value="+255">+255 (TZ)</option>
                          <option value="+256">+256 (UG)</option>
                        </select>
                      </div>
                      <div className="w-3/4">
                        <input
                          type="tel"
                          name="mobileMoneyPhone"
                          value={formData.mobileMoneyPhone}
                          onChange={handleInputChange}
                          placeholder={`Enter your ${formData.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Airtel Money'} number`}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      You will receive a prompt on your phone to complete the payment
                    </p>
                  </div>
                )}

                {formData.paymentMethod === 'card' && (
                  <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="Full name as shown on card"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                        maxLength="19"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                          maxLength="5"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                          maxLength="4"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message of Support (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Leave an encouraging message for the beneficiary..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {processing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Donate KES ${formData.amount ? parseInt(formData.amount).toLocaleString() : '0'}`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}