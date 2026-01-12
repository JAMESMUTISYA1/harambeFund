// components/TopContributorsHonor.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data with image URLs
const mockTopContributors = [
  { id: 1, name: "Grace Wanjiku", image: "/images/medical.jfif", rank: 1 },
  { id: 2, name: "David Ochieng", image: "/images/contributors/david.jpg", rank: 2 },
  { id: 3, name: "Mercy Atieno", image: "/images/contributors/mercy.jpg", rank: 3 },
  { id: 4, name: "James Kamau", image: "/images/contributors/james.jpg", rank: 4 },
  { id: 5, name: "Sarah Mwende", image: "/images/contributors/sarah.jpg", rank: 5 },
  { id: 6, name: "Peter Maina", image: "/images/contributors/peter.jpg", rank: 6 },
  { id: 7, name: "Elizabeth Akinyi", image: "/images/contributors/elizabeth.jpg", rank: 7 },
  { id: 8, name: "John Kipchoge", image: "/images/contributors/john.jpg", rank: 8 },
  { id: 9, name: "Ruth Njeri", image: "/images/contributors/ruth.jpg", rank: 9 },
  { id: 10, name: "Michael Onyango", image: "/images/contributors/michael.jpg", rank: 10 },
];

const TopContributorsHonor = () => {
  const [contributors] = useState(mockTopContributors);
  const [isLoading] = useState(false);

  const getRankBadge = (rank) => {
    switch(rank) {
      case 1:
        return (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-xs font-bold text-white">1</span>
          </div>
        );
      case 2:
        return (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-xs font-bold text-white">2</span>
          </div>
        );
      case 3:
        return (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-xs font-bold text-white">3</span>
          </div>
        );
      default:
        return (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-xs font-bold text-white">{rank}</span>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const displayedContributors = contributors.slice(0, 5);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header - Minimal */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-2 shadow-sm">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Top Contributors <span className="text-green-600">Honor</span>
            </h2>
          </div>
          <p className="text-gray-600 text-sm max-w-lg mx-auto">
            Recognizing our most generous supporters who are making a difference in communities
          </p>
        </div>

        {/* Contributors Grid - Show only 5 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mb-8">
          {displayedContributors.map(contributor => (
            <div 
              key={contributor.id} 
              className="relative group"
            >
              <div className="relative mx-auto w-20 h-20 md:w-24 md:h-24 mb-3">
                {/* Profile Image or Initial */}
                {contributor.image ? (
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-green-100 group-hover:border-green-300 transition-colors shadow-sm">
                    <Image
                      src={contributor.image}
                      alt={contributor.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 80px, 96px"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center border-2 border-green-100 group-hover:border-green-300 transition-colors shadow-sm">
                    <span className="text-white text-lg font-bold">
                      {contributor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                
                {/* Rank Badge */}
                {getRankBadge(contributor.rank)}
              </div>
              
              {/* Name Only */}
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 text-sm truncate px-1">
                  {contributor.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard Link */}
        <div className="text-center mb-6">
          <Link 
            href="/leaderboard" 
            className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
          >
            View All on Leaderboard
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

       
      </div>
    </section>
  );
};

export default TopContributorsHonor;