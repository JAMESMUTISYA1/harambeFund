// components/CampaignTerms.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
export default function CampaignTerms({ onAgree }) {
  const [agreed, setAgreed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAgreementChange = (e) => {
    setAgreed(e.target.checked);
    if (onAgree) {
      onAgree(e.target.checked);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Campaign Creation Terms</h3>
      
      <div className="mb-6 space-y-4">
        <div className="border-b border-gray-200 pb-4">
          <button 
            onClick={() => toggleSection('eligibility')}
            className="flex justify-between items-center w-full text-left font-medium text-green-700"
          >
            <span>Eligible Causes</span>
            <svg 
              className={`w-5 h-5 transform ${expandedSections.eligibility ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.eligibility && (
            <div className="mt-2 text-gray-600 text-sm">
              <p className="mb-2">You may create campaigns for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Medical expenses and healthcare costs</li>
                <li>Education fees and school-related expenses</li>
                <li>Emergency relief and disaster response</li>
                <li>Community development projects</li>
                <li>Ruracio/dowry and traditional ceremonies</li>
                <li>Business startups and entrepreneurship</li>
                <li>Environmental conservation efforts</li>
                <li>Other socially beneficial causes</li>
              </ul>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200 pb-4">
          <button 
            onClick={() => toggleSection('prohibited')}
            className="flex justify-between items-center w-full text-left font-medium text-green-700"
          >
            <span>Prohibited Campaigns</span>
            <svg 
              className={`w-5 h-5 transform ${expandedSections.prohibited ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.prohibited && (
            <div className="mt-2 text-gray-600 text-sm">
              <p className="mb-2">You may NOT create campaigns for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Illegal activities or items</li>
                <li>Personal luxury items without genuine need</li>
                <li>Hate speech, discrimination, or harassment</li>
                <li>Political campaigns or lobbying</li>
                <li>Activities that violate Kenyan law</li>
                <li>Any form of financial fraud or scams</li>
              </ul>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200 pb-4">
          <button 
            onClick={() => toggleSection('obligations')}
            className="flex justify-between items-center w-full text-left font-medium text-green-700"
          >
            <span>Creator Obligations</span>
            <svg 
              className={`w-5 h-5 transform ${expandedSections.obligations ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.obligations && (
            <div className="mt-2 text-gray-600 text-sm">
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide accurate and truthful information about your campaign</li>
                <li>Use funds solely for the stated purpose of the campaign</li>
                <li>Provide updates to donors on campaign progress</li>
                <li>Provide documentation upon request regarding use of funds</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Respect the privacy of beneficiaries</li>
              </ul>
            </div>
          )}
        </div>

        <div>
          <button 
            onClick={() => toggleSection('fees')}
            className="flex justify-between items-center w-full text-left font-medium text-green-700"
          >
            <span>Fees and Payments</span>
            <svg 
              className={`w-5 h-5 transform ${expandedSections.fees ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.fees && (
            <div className="mt-2 text-gray-600 text-sm">
              <ul className="list-disc pl-5 space-y-1">
                <li>Harambee charges a 5% platform fee on all donations</li>
                <li>Payment processors may charge additional fees</li>
                <li>Funds are typically transferred within 3-5 business days</li>
                <li>You are responsible for any tax implications of funds received</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="agree-terms"
          checked={agreed}
          onChange={handleAgreementChange}
          className="mt-1 mr-3"
          required
        />
        <label htmlFor="agree-terms" className="text-sm text-gray-700">
          I have read and agree to the Campaign Creation Terms and the Harambee{' '}
          <Link href="/terms" className="text-green-600 hover:underline">
            Terms and Conditions
          </Link>. 
          I understand that I am responsible for the accuracy of my campaign information 
          and the proper use of all funds raised.
        </label>
      </div>
    </div>
  );
}