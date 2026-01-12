// app/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CampaignCard from '@/components/CampaignCard';
import PartnershipsSection from '@/components/Partnershipsection';
import TopContributorsHonor from '@/components/TopContributorsHonor'; // New component
import Link from 'next/link';
import { useHomepageData } from '@/hooks/useHomepageData';
import Image from 'next/image';

// Skeleton loader components (remain unchanged)
const CampaignSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-4"></div>
      <div className="h-2 bg-gray-300 rounded mb-2"></div>
      <div className="h-2 bg-gray-300 rounded mb-4"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const TestimonialSkeleton = () => (
  <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm animate-pulse">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 bg-green-800 rounded-full mr-4"></div>
      <div>
        <div className="h-4 bg-green-700 rounded w-24 mb-2"></div>
        <div className="h-3 bg-green-700 rounded w-16"></div>
      </div>
    </div>
    <div className="h-4 bg-green-700 rounded mb-2"></div>
    <div className="h-4 bg-green-700 rounded w-5/6"></div>
  </div>
);

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  
  // Use the custom hook for data fetching
  const { 
    featuredCampaigns, 
    featuredTestimonials, 
    impactStats, 
    loading: homepageLoading, 
    error: homepageError 
  } = useHomepageData();

  // Auto-rotate slides for featured campaigns
  useEffect(() => {
    if (featuredCampaigns && featuredCampaigns.length > 3) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredCampaigns.length / 3));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredCampaigns]);

  const nextSlide = () => {
    if (featuredCampaigns && featuredCampaigns.length > 3) {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredCampaigns.length / 3));
    }
  };

  const prevSlide = () => {
    if (featuredCampaigns && featuredCampaigns.length > 3) {
      setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredCampaigns.length / 3)) % Math.ceil(featuredCampaigns.length / 3));
    }
  };

  const handleDonateClick = (campaign) => {
    window.location.href = `/donate/${campaign.id || campaign.$id}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {homepageError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <div className="container mx-auto">
            <p>{homepageError}</p>
          </div>
        </div>
      )}
      
      <main className="flex-grow">
        {/* Hero Section - Reduced height and smaller hearts */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-12 md:py-16 relative overflow-hidden min-h-[350px] flex items-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-red-300 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-300 rounded-full blur-3xl"></div>
          </div>
          
          {/* Left Heart PNG - Smaller */}
          <div className="absolute top-1/3 left-4 lg:left-8 transform -translate-y-1/2 w-32 h-32 lg:w-40 lg:h-40 z-0">
            <div className="relative w-full h-full animate-float">
              <Image
                src="/images/heart.png"
                alt="Heart icon"
                fill
                className="object-contain opacity-80"
                style={{ filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.1))' }}
                priority
              />
            </div>
          </div>
          
          {/* Right Heart PNG - Smaller */}
          <div className="absolute bottom-1/3 right-4 lg:right-8 transform translate-y-1/2 w-36 h-36 lg:w-44 lg:h-44 z-0">
            <div className="relative w-full h-full animate-float" style={{ animationDelay: '2s' }}>
              <Image
                src="/images/heart.png"
                alt="Heart icon"
                fill
                className="object-contain opacity-80"
                style={{ filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.1))' }}
                priority
              />
            </div>
          </div>
          
          {/* Center Heart PNG - Even Smaller */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 z-0">
            <div className="relative w-full h-full animate-float" style={{ animationDelay: '1s' }}>
              <Image
                src="/images/heart.png"
                alt="Heart icon"
                fill
                className="object-contain opacity-70"
                style={{ filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.1))' }}
                priority
              />
            </div>
          </div>
          
          {/* Hero Content */}
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="relative z-10 mx-auto max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Touching <span className="text-red-500">Hearts</span>, 
                <br />
                Empowering <span className="text-green-600">Youth</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
                Join hands to make a difference. Support verified campaigns and move communities forward through Harambee.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/campaigns" className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition shadow-md">
                  Donate Now
                </Link>
                <Link href="/campaigns/create" className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition">
                  Start a Harambee
                </Link>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
            
            @media (max-width: 768px) {
              .absolute.left-4, .absolute.right-4 {
                display: none;
              }
              .absolute.top-1\\/2 {
                display: none;
              }
            }
          `}</style>
        </section>

        {/* Featured Campaigns with Slider */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Campaigns</h2>
              <Link href="/campaigns" className="text-green-600 font-medium hover:underline flex items-center">
                View All Campaigns
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {homepageLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <CampaignSkeleton key={index} />
                ))}
              </div>
            ) : featuredCampaigns && featuredCampaigns.length > 0 ? (
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredCampaigns.slice(currentSlide * 3, (currentSlide + 1) * 3).map(campaign => (
                    <CampaignCard 
                      key={campaign.$id} 
                      campaign={{
                        ...campaign,
                        progress: Math.round((campaign.current_amount / campaign.target_amount) * 100),
                        raised: campaign.current_amount,
                        target: campaign.target_amount,
                        imageId: campaign.featured_image,
                        id: campaign.$id
                      }}
                      onDonateClick={handleDonateClick}
                    />
                  ))}
                </div>
                
                {featuredCampaigns.length > 3 && (
                  <div className="flex justify-center mt-8 space-x-2">
                    <button onClick={prevSlide} className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    {Array.from({ length: Math.ceil(featuredCampaigns.length / 3) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-green-600' : 'bg-green-200'}`}
                      />
                    ))}
                    
                    <button onClick={nextSlide} className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 md:py-12 bg-gray-50 rounded-lg">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-gray-600">No featured campaigns available at the moment.</p>
                <Link href="/campaigns/create" className="inline-block mt-4 text-green-600 font-medium hover:underline">
                  Start the first campaign
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 md:mb-12">How Harambee Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl md:text-2xl font-bold text-green-700">1</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Create a Campaign</h3>
                <p className="text-sm md:text-gray-600">Share your story and set a fundraising goal for your cause.</p>
              </div>
              
              <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl md:text-2xl font-bold text-green-700">2</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Spread the Word</h3>
                <p className="text-sm md:text-gray-600">Share your campaign with friends, family, and your community.</p>
              </div>
              
              <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl md:text-2xl font-bold text-green-700">3</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Receive Support</h3>
                <p className="text-sm md:text-gray-600">Withdraw funds and make a difference in your community.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Contributors Hall of Fame - NEW SECTION */}
        <TopContributorsHonor />

        {/* Testimonials Section */}
        <section className="py-12 md:py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Touching Hearts, Empowering Youth</h2>
            <p className="text-lg md:text-xl text-center mb-8 md:mb-12 max-w-3xl mx-auto">
              Discover how Harambee is building futures and transforming communities across Kenya
            </p>
            
            {homepageLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {Array.from({ length: 3 }).map((_, index) => (
                  <TestimonialSkeleton key={index} />
                ))}
              </div>
            ) : featuredTestimonials && featuredTestimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {featuredTestimonials.map(testimonial => (
                  <div key={testimonial.$id} className="bg-white bg-opacity-10 p-4 md:p-6 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center mb-4">
                      {testimonial.avatarUrl ? (
                        <Image 
                          src={testimonial.avatarUrl} 
                          alt={testimonial.name || 'Testimonial author'}
                          width={48}
                          height={48}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 md:mr-4 object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-green-800 rounded-full flex items-center justify-center mr-3 md:mr-4">
                          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-sm md:text-base">{testimonial.name || 'Anonymous'}</h3>
                        <p className="text-green-200 text-xs md:text-sm">{testimonial.role || 'Supporter'}</p>
                      </div>
                    </div>
                    <p className="italic text-sm md:text-base">{testimonial.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 md:py-8 bg-green-700 bg-opacity-30 rounded-lg">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-green-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="text-green-100">No testimonials available yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Partnerships Section */}
        <PartnershipsSection />
      </main>
      
      <Footer />
    </div>
  );
}