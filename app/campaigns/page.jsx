// app/campaigns/page.js
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CampaignCard from '@/components/CampaignCard';
import { appwriteService } from '@/lib/appwriteService';
import Link from 'next/link';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    sort: 'newest',
    search: ''
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const campaignsResponse = await appwriteService.getActiveCampaigns();
      const campaignsData = campaignsResponse.documents || [];
      
      setCampaigns(campaignsData);
      setFilteredCampaigns(campaignsData);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      setError(err.message || 'Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (campaigns.length === 0) return;
    
    let result = [...campaigns];
    
    if (filters.category !== 'all') {
      result = result.filter(campaign => campaign.category === filters.category);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(campaign => 
        campaign.title.toLowerCase().includes(searchTerm) || 
        campaign.description.toLowerCase().includes(searchTerm) ||
        (campaign.location && campaign.location.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.sort === 'newest') {
      result.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
    } else if (filters.sort === 'most-funded') {
      result.sort((a, b) => (b.raised || 0) - (a.raised || 0));
    } else if (filters.sort === 'ending-soon') {
      result.sort((a, b) => {
        const aDate = a.end_date ? new Date(a.end_date) : new Date(8640000000000000);
        const bDate = b.end_date ? new Date(b.end_date) : new Date(8640000000000000);
        return aDate - bDate;
      });
    }
    
    setFilteredCampaigns(result);
  }, [filters, campaigns]);

  const handleDonateClick = (campaign) => {
    const campaignId = campaign.id || campaign.$id;
    window.location.href = `/campaigns/${campaignId}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* ULTRA-COMPACT HERO SECTION */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-white rounded-full blur-xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-green-300 rounded-full blur-xl"></div>
          </div>
          
          <div className="container mx-auto px-4 py-8 md:py-10 text-center relative z-10">
            <div className="max-w-2xl mx-auto">
              {/* Minimal Hero Badge */}
              <div className="inline-flex items-center bg-white/5 backdrop-blur-sm rounded-full px-2.5 py-1 mb-3">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">Make a Difference</span>
              </div>
              
              {/* Concise Hero Title */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                Support Causes That <span className="text-yellow-300">Move Communities</span>
              </h1>
              
              {/* Super Short Subtitle */}
              <p className="text-sm md:text-base mb-4 opacity-90 max-w-lg mx-auto">
                Create hope and change through collective Harambee giving.
              </p>
              
              {/* Compact CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <button 
                  onClick={() => document.getElementById('campaigns-grid').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-green-700 px-4 py-2 text-xs font-semibold rounded hover:bg-green-50 transition shadow-sm hover:shadow"
                >
                  Explore Campaigns
                </button>
                <Link 
                  href="/campaigns/create" 
                  className="border border-white text-white px-4 py-2 text-xs font-semibold rounded hover:bg-white hover:text-green-700 transition hover:shadow"
                >
                  Start Campaign
                </Link>
              </div>
              
              {/* Minimal Trust Indicators */}
              <div className="mt-4 flex justify-center items-center gap-3 text-xs opacity-70">
                <div className="flex items-center">
                  <svg className="w-2.5 h-2.5 mr-1 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified
                </div>
                <div className="flex items-center">
                  <svg className="w-2.5 h-2.5 mr-1 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Secure
                </div>
              </div>
            </div>
          </div>
          
          {/* Minimal Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 40" className="w-full">
              <path fill="#f9fafb" fillOpacity="1" d="M0,32L48,26.7C96,21,192,11,288,16C384,21,480,43,576,48C672,53,768,43,864,32C960,21,1056,11,1152,10.7C1248,11,1344,21,1392,26.7L1440,32L1440,40L1392,40C1344,40,1248,40,1152,40C1056,40,960,40,864,40C768,40,672,40,576,40C480,40,384,40,288,40C192,40,96,40,48,40L0,40Z"></path>
            </svg>
          </div>
        </section>

        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
              <button 
                onClick={fetchCampaigns}
                className="mt-2 text-red-800 underline text-sm"
              >
                Try again
              </button>
            </div>
          )}

          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Causes to Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search campaigns
                  </div>
                </label>
                <input
                  type="text"
                  placeholder="Search by title, description..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
              
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="all">All Categories</option>
                  <option value="education">Education</option>
                  <option value="medical">Medical</option>
                  <option value="emergency">Emergency</option>
                  <option value="community">Community</option>
                  <option value="business">Business</option>
                  <option value="ruracio">Ruracio</option>
                </select>
              </div>
              
              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  value={filters.sort}
                  onChange={(e) => setFilters({...filters, sort: e.target.value})}
                >
                  <option value="newest">Newest First</option>
                  <option value="most-funded">Most Funded</option>
                  <option value="ending-soon">Ending Soon</option>
                </select>
              </div>
            </div>
          </div>

          {/* Campaigns Grid */}
          <div id="campaigns-grid">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading campaigns...</p>
                </div>
              </div>
            ) : filteredCampaigns.length > 0 ? (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Campaigns Needing Support 
                    <span className="text-green-600 ml-2">({filteredCampaigns.length})</span>
                  </h2>
                  <p className="text-sm text-gray-600">
                    Showing {filteredCampaigns.length} campaigns
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {filteredCampaigns.map(campaign => (
                    <CampaignCard 
                      key={campaign.$id} 
                      campaign={campaign}
                      onDonateClick={handleDonateClick}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="max-w-md mx-auto">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or browse all categories.
                  </p>
                  <button 
                    onClick={() => setFilters({ category: 'all', sort: 'newest', search: '' })}
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl p-8 text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Make a Difference?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Your support can change lives. Whether you donate to existing campaigns or start your own, 
              you become part of a movement that's building a better Kenya together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/campaigns/create" 
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition shadow-md"
              >
                Start a Campaign
              </Link>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-green-50 transition"
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}