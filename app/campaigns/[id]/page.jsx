// app/campaigns/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CampaignCard from '@/components/CampaignCard';
import Link from 'next/link';
import Image from 'next/image';
import { appwriteService } from '@/lib/appwriteService';

export default function CampaignDetail() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id;
  
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [relatedCampaigns, setRelatedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('story');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchCampaignData();
  }, [campaignId]);

  const fetchCampaignData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch campaign data
      const campaignData = await appwriteService.getCampaignById(campaignId);
      setCampaign(campaignData);
      
      // Fetch donations
      const donationsData = await appwriteService.getCampaignDonations(campaignId);
      setDonations(donationsData.documents || []);
      
      // Fetch updates
      const updatesData = await appwriteService.getCampaignUpdates(campaignId);
      setUpdates(updatesData.documents || []);
      
      // Fetch related campaigns
      const relatedData = await appwriteService.getRelatedCampaigns(
        campaignData.category, 
        campaignId
      );
      setRelatedCampaigns(relatedData.documents || []);
      
    } catch (err) {
      console.error("Error fetching campaign data:", err);
      setError(err.message || 'Failed to load campaign');
    } finally {
      setLoading(false);
    }
  };

  const handleDonateClick = () => {
    // Redirect to payments page with campaign ID and title only
    router.push(`/payments?id=${campaignId}&title=${encodeURIComponent(campaign.title)}`);
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'KES 0';
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-KE').format(number);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateProgress = () => {
    if (!campaign || !campaign.target_amount) return 0;
    return Math.min(100, Math.round((campaign.current_amount / campaign.target_amount) * 100));
  };

  const calculateDaysRemaining = () => {
    if (!campaign || !campaign.end_date) return null;
    const deadline = new Date(campaign.end_date);
    const today = new Date();
    return Math.max(0, Math.ceil((deadline - today) / (1000 * 60 * 60 * 24)));
  };

  const nextImage = () => {
    if (!campaign.images) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === campaign.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!campaign.images) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? campaign.images.length - 1 : prevIndex - 1
    );
  };

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

  if (error || !campaign) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-4">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Campaign Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The campaign you\'re looking for doesn\'t exist.'}</p>
            <Link href="/campaigns" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
              Browse Campaigns
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const progressPercentage = calculateProgress();
  const daysRemaining = calculateDaysRemaining();
  const hasImages = campaign.images && campaign.images.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Title Section */}
        <div className="bg-white py-6 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{campaign.title}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Carousel */}
              {hasImages && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                    <Image
                      src={campaign.images[currentImageIndex].startsWith('http') 
                        ? campaign.images[currentImageIndex] 
                        : `/api/image-proxy?url=${campaign.images[currentImageIndex]}`
                      }
                      alt={`Campaign image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Navigation Arrows */}
                    {campaign.images.length > 1 && (
                      <>
                        <button 
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button 
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {campaign.images.length}
                    </div>
                  </div>
                  
                  {/* Thumbnail Navigation */}
                  {campaign.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {campaign.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative aspect-video rounded-md overflow-hidden ${
                            index === currentImageIndex ? 'ring-2 ring-green-500' : 'opacity-70'
                          }`}
                        >
                          <Image
                            src={image.startsWith('http') ? image : `/api/image-proxy?url=${image}`}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Owner Information */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-800 font-semibold">
                      {campaign.owner_name ? campaign.owner_name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        {campaign.owner_name || 'Unknown'}
                      </span>
                      {campaign.verification_status && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Campaign Organizer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {campaign.location}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {campaign.description}
                </p>
              </div>

              {/* Story */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">The Full Story</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {campaign.story || campaign.description}
                </div>
              </div>
            </div>

            {/* Right Column - Campaign Info */}
            <div className="space-y-8">
              {/* Social Media Links */}
              {(campaign.tiktokLink || campaign.youtubeLink) && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">View More Story</h3>
                  <div className="flex flex-col gap-3">
                    {campaign.youtubeLink && (
                      <a
                        href={campaign.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                        Watch on YouTube
                      </a>
                    )}
                    {campaign.tiktokLink && (
                      <a
                        href={campaign.tiktokLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                        Watch on TikTok
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Progress Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold mb-2 text-green-700">{formatCurrency(campaign.current_amount)}</div>
                  <div className="text-sm text-gray-600">raised of {formatCurrency(campaign.target_amount)} goal</div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  <div>
                    <div className="text-xl font-bold">{formatNumber(campaign.donors || 0)}</div>
                    <div className="text-xs text-gray-600">Supporters</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{formatNumber(campaign.views_count || 0)}</div>
                    <div className="text-xs text-gray-600">Views</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{daysRemaining !== null ? daysRemaining : '∞'}</div>
                    <div className="text-xs text-gray-600">Days left</div>
                  </div>
                </div>
                
                {/* Updated Donate Button - Redirects to Payments Page */}
                <button 
                  onClick={handleDonateClick}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition"
                >
                  Donate Now
                </button>
              </div>

              {/* Campaign Info Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-900">{campaign.category}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Created</span>
                    <span className="font-medium text-gray-900">{formatDate(campaign.$createdAt)}</span>
                  </div>
                  
                  {campaign.start_date && (
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Started</span>
                      <span className="font-medium text-gray-900">{formatDate(campaign.start_date)}</span>
                    </div>
                  )}
                  
                  {campaign.end_date && (
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Deadline</span>
                      <span className="font-medium text-gray-900">{formatDate(campaign.end_date)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-medium ${
                      campaign.status === 'active' ? 'text-green-600' : 
                      campaign.status === 'completed' ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {campaign.status?.charAt(0).toUpperCase() + campaign.status?.slice(1)}
                    </span>
                  </div>
                  
                  {campaign.beneficiary_relationship && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Relationship</span>
                      <span className="font-medium text-gray-900">{campaign.beneficiary_relationship}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Campaign</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500 transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.033 10.033 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 00-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
                    </svg>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-900 transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018 0-3.878 3.132-7.018 7-7.018 1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062-2.31 0-4.187 1.956-4.187 4.273 0 2.315 1.877 4.277 4.187 4.277 2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474 0 4.01-2.677 6.86-6.72 6.86z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Related Campaigns */}
              {relatedCampaigns.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Campaigns</h3>
                  <div className="space-y-4">
                    {relatedCampaigns.slice(0, 3).map((relatedCampaign) => (
                      <CampaignCard 
                        key={relatedCampaign.$id} 
                        campaign={relatedCampaign}
                        onDonateClick={() => {}}
                        compact
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}