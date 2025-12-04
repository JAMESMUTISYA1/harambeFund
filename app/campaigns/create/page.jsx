// app/campaigns/create/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CampaignTerms from '@/components/CampaignTerms';
import { Client, Account, Databases, ID } from 'appwrite';

// Initialize AppWrite client
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

// Collection IDs
const CAMPAIGNS_COLLECTION_ID = process.env.NEXT_PUBLIC_CAMPAIGNS_COLLECTION_ID || 'campaigns';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'harambee';

export default function CreateCampaign() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    title: '',
    category: '',
    target_amount: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    location: '',
    
    // Step 2: Story & Details
    description: '',
    story: '',
    
    // Step 3: Additional Info
    beneficiary_name: '',
    beneficiary_relationship: '',
    phone_number: '',
    
    // Single privacy setting (boolean)
    is_public: true // true = visible, false = not visible
  });

  const categories = [
    'Medical Expenses',
    'Education Fees',
    'Emergency Relief',
    'Community Project',
    'Ruracio/Dowry',
    'Business Venture',
    'Environmental Cause',
    'Other'
  ];

  const relationships = [
    'Myself',
    'Family Member',
    'Friend',
    'Colleague',
    'Community Member',
    'Other'
  ];

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setAuthLoading(true);
      const user = await account.get();
      setCurrentUser(user);
    } catch (error) {
      console.log('User not logged in');
      router.push('/auth?redirect=/campaigns/create');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('Please log in to create a campaign');
      router.push('/signup');
      return;
    }

    setLoading(true);
    
    try {

      // Prepare campaign data for AppWrite
      const campaignData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        target_amount: parseFloat(formData.target_amount),
        current_amount: 0,
        currency: 'KES',
        creator_id: currentUser.$id,
        featured_image: '',
        images: [],
        status: 'active',
        verification_status: 'pending',
        location: formData.location || '',
        tags: [],
        donor_count: 0,
        views_count: 0,
        shares_count: 0,
        start_date: formData.start_date,
        end_date: formData.end_date,
        updates: [],
        milestones: [],
        featured: false,
        story: formData.story,
        beneficiary_name: formData.beneficiary_name,
        beneficiary_relationship: formData.beneficiary_relationship,
        phone_number: formData.phone_number,
        privacy_settings: formData.is_public
      };

      // Create campaign in AppWrite
      const response = await databases.createDocument(
        DATABASE_ID,
        CAMPAIGNS_COLLECTION_ID,
        ID.unique(),
        campaignData
      );

      // Redirect to the new campaign page
      alert('Campaign created successfully!');
      router.push(`/campaigns/${response.$id}`);
      
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('There was an error creating your campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Basic Information
  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Campaign Basics</h2>
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Campaign Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="e.g., Medical treatment for John"
          maxLength={500}
          required
        />
        <p className="text-xs text-gray-500 mt-1">Make it clear and compelling (max 500 characters)</p>
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category *
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          required
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="target_amount" className="block text-sm font-medium text-gray-700 mb-1">
            Goal Amount (KES) *
          </label>
          <input
            type="number"
            id="target_amount"
            name="target_amount"
            value={formData.target_amount}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 500000"
            min="1000"
            step="100"
            required
          />
        </div>
        
        <div>
          <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-1">
            Campaign End Date *
          </label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            min={formData.start_date}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Location (Optional)
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="e.g., Nairobi, Kenya"
          maxLength={100}
        />
      </div>
      
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!formData.title || !formData.category || !formData.target_amount || !formData.end_date}
        >
          Next: Story & Details
        </button>
      </div>
    </div>
  );

  // Step 2: Story & Details
  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Tell Your Story</h2>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Short Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Brief summary of your campaign (shown in campaign lists)"
          maxLength={2000}
          required
        />
        <p className="text-xs text-gray-500 mt-1">Max 2000 characters</p>
      </div>
      
      <div>
        <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-1">
          Full Story *
        </label>
        <textarea
          id="story"
          name="story"
          value={formData.story}
          onChange={handleInputChange}
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Share the detailed story behind your campaign. Why do you need support? How will the funds be used?"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Be detailed and authentic. This helps people connect with your cause.</p>
      </div>
      
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!formData.description || !formData.story}
        >
          Next: Privacy & Final Details
        </button>
      </div>
    </div>
  );

  // Step 3: Privacy & Final Details
  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Privacy & Final Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="beneficiary_name" className="block text-sm font-medium text-gray-700 mb-1">
            Beneficiary Full Name *
          </label>
          <input
            type="text"
            id="beneficiary_name"
            name="beneficiary_name"
            value={formData.beneficiary_name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="beneficiary_relationship" className="block text-sm font-medium text-gray-700 mb-1">
            Your Relationship to Beneficiary *
          </label>
          <select
            id="beneficiary_relationship"
            name="beneficiary_relationship"
            value={formData.beneficiary_relationship}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            required
          >
            <option value="">Select relationship</option>
            {relationships.map(rel => (
              <option key={rel} value={rel}>{rel}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
          Your Phone Number *
        </label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="07XX XXX XXX"
          required
        />
        <p className="text-xs text-gray-500 mt-1">For verification and updates about your campaign</p>
      </div>

      {/* Single Privacy Setting */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Campaign Visibility</h3>
        
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium text-gray-800">Make campaign details visible to everyone</h4>
            <p className="text-sm text-gray-600">
              {formData.is_public 
                ? 'Your campaign will be visible to everyone with all details shown.' 
                : 'Your campaign will be private. Only you can see the details.'}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="is_public"
              checked={formData.is_public}
              onChange={handleInputChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>
      
      <CampaignTerms onAgree={setTermsAgreed} />
      
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!termsAgreed || loading || !formData.beneficiary_name || !formData.beneficiary_relationship || !formData.phone_number}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Campaign...' : 'Create Campaign'}
        </button>
      </div>
    </div>
  );

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </main>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Redirecting to login...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Create a Campaign</h1>
              <p className="text-gray-600">Start your fundraising journey in just a few steps</p>
            </div>
            
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <div className={`text-sm font-medium ${step >= 1 ? 'text-green-600' : 'text-gray-500'}`}>Basics</div>
                <div className={`text-sm font-medium ${step >= 2 ? 'text-green-600' : 'text-gray-500'}`}>Story</div>
                <div className={`text-sm font-medium ${step >= 3 ? 'text-green-600' : 'text-gray-500'}`}>Privacy & Details</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}