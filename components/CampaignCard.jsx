// components/CampaignCard.js
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function CampaignCard({ campaign, onDonateClick, isOwner = false }) {
  const [imageUrl, setImageUrl] = useState("/images/placeholder-campaign.jpg");
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, Math.round((campaign.raised / campaign.target) * 100));
  
  // Format currency for Kenyan Shillings
  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `KSh ${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `KSh ${(amount / 1000).toFixed(1)}K`;
    }
    return `KSh ${amount}`;
  };

  // Set image URL when component mounts or campaign changes
  useEffect(() => {
    if (campaign.imageUrl) {
      setImageUrl(campaign.imageUrl);
    } else if (campaign.featured_image && campaign.featured_image.startsWith('http')) {
      setImageUrl(campaign.featured_image);
    }
  }, [campaign.imageUrl, campaign.featured_image]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100 max-w-xs mx-auto">
      <div className="relative">
        <Image 
          src={imageUrl}
          alt={campaign.title}
          width={320}
          height={160}
          className="w-full h-40 object-cover"
          onError={() => setImageUrl("/images/redcross.png")}
        />
        <div className="absolute top-2 left-2">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
            {campaign.category}
          </span>
        </div>
        {isOwner && (
          <div className="absolute top-2 right-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
              Your Campaign
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-base mb-1 line-clamp-1">
          {campaign.title}
        </h3>
        
        <p className="text-gray-600 text-xs mb-2 line-clamp-2">
          {campaign.description}
        </p>
        
        {campaign.location && (
          <p className="text-gray-500 text-xs mb-2 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {campaign.location}
          </p>
        )}
        
        {campaign.ownerName && (
          <p className="text-xs text-gray-500 mb-2">By: {campaign.ownerName}</p>
        )}
        
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            {/* Raised amount - italic, gray */}
            <span className="text-gray-600 italic">
              Raised: {formatCurrency(campaign.raised)}
            </span>
            {/* Goal amount - italic, green */}
            <span className="text-green-600 italic font-medium">
              Goal: {formatCurrency(campaign.target)}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div 
              className="bg-green-500 h-1.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{progressPercentage}% funded</span>
            <span>{campaign.donors || 0} donors</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-50">
          <Link 
            href={`/campaigns/${campaign.id || campaign.$id}`}
            className="text-green-600 hover:text-green-700 font-medium text-xs"
          >
            View Details
          </Link>
          
          <button
            onClick={() => onDonateClick(campaign)}
            className="bg-green-500 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-green-600 transition"
          >
            {isOwner ? 'Support' : 'Donate'}
          </button>
        </div>
      </div>
    </div>
  );
}