// app/terms/page.js
"use client"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function Terms() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gradient-to-b from-emerald-50 to-green-50">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-emerald-800 mb-4">Terms and Conditions</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using Harambee. By accessing our platform, you agree to be bound by these terms.
            </p>
            <div className="mt-4 flex items-center justify-center text-sm text-emerald-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Last Updated: {new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of Contents */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-emerald-800 mb-4">Contents</h2>
                <ul className="space-y-2">
                  {[
                    'Acceptance of Terms',
                    'Definitions',
                    'User Responsibilities',
                    'Campaign Creation',
                    'Donations',
                    'Intellectual Property',
                    'Liability',
                    'Termination',
                    'Governing Law',
                    'Changes to Terms',
                    'Contact Information'
                  ].map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => {
                          document.getElementById(`section-${index + 1}`).scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-sm text-emerald-600 hover:text-emerald-800 transition-colors flex items-start"
                      >
                        <span className="text-emerald-500 font-medium mr-2">{index + 1}.</span>
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Need quick help?</p>
                  <Link href="/contact" className="text-sm text-emerald-600 hover:text-emerald-800 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 极 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>

            {/* Terms Content */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8">
                  <section id="section-1" className="mb-10 pb-8 border-b border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="bg-emerald-100 text-emerald-800 rounded-lg w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">1</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Acceptance of Terms</h2>
                        <p className="text-gray-600">
                          By accessing or using the Harambee platform ("Platform"), you agree to be bound by these Terms and Conditions 
                          and our Privacy Policy. If you do not agree to these terms, please do not use our Platform.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="section-2" className="mb-10 pb-8 border-b border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="bg-emerald-100 text-emerald-800 rounded-lg w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">2</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Definitions</h2>
                        <ul className="space-y-3">
                          {[
                            { term: '"Platform"', definition: 'refers to the Harambee website, mobile application, and related services.' },
                            { term: '"Campaign Creator"', definition: 'refers to any person who creates a fundraising campaign on the Platform.' },
                            { term: '"Donor"', definition: 'refers to any person who contributes funds to a campaign.' },
                            { term: '"Campaign"', definition: 'refers to a fundraising initiative created on the Platform.' },
                            { term: '"Content"', definition: 'refers to text, images, videos, and other materials posted on the Platform.' },
                          ].map((item, index) => (
                            <li key={index} className="flex">
                              <span className="text-emerald-600 font-medium min-w-[120px]">{item.term}</span>
                              <span className="text-gray-600 ml-2">{item.definition}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section id="section-3" className="mb-10 pb-8 border-b border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="bg-emerald-100 text-emerald-800 rounded-lg w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">3</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">User Responsibilities</h2>
                        
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-amber-700">
                                <strong>Important:</strong> You must be at least 18 years old to create a campaign or make donations
                              </p>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-xl font-medium text-emerald-700 mb-3">3.1 General User Responsibilities</h3>
                        <ul className="space-y-2 mb-6">
                          {[
                            "You are responsible for maintaining the confidentiality of your account credentials",
                            "You agree to provide accurate and complete information when using the Platform",
                            "You will not use the Platform for any illegal or unauthorized purpose",
                            "You will not engage in any activity that disrupts or interferes with the Platform"
                          ].map((item, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>

                        <h3 className="text-xl font-medium text-emerald-700 mb-3">3.2 Campaign Creator Responsibilities</h3>
                        <p className="text-gray-600 mb-4">
                          By creating a campaign on Harambee, you agree to the following conditions:
                        </p>
                        <ul className="space-y-2 mb-4">
                          {[
                            "You affirm that all information provided about your campaign is true, accurate, and complete",
                            "You will use donated funds solely for the purpose stated in your campaign",
                            "You agree to provide updates on the campaign progress to donors",
                            "You acknowledge that Harambee does not guarantee that your campaign will receive any donations",
                            "You will not create campaigns for illegal activities, hate speech, or personal luxury expenses unrelated to genuine need",
                            "You consent to Harambee verifying your identity and campaign details",
                            "You agree to provide documentation upon request regarding the use of funds",
                            "You understand that Harambee may remove your campaign if it violates these terms"
                          ].map((item, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section id="section-4" className="mb-10 pb-8 border-b border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="bg-emerald-100 text-emerald-800 rounded-lg w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">4</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Campaign Creation Conditions</h2>
                        <p className="text-gray-600 mb-4">
                          When creating a campaign, you must adhere to the following specific conditions:
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                            <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Eligible Causes
                            </h4>
                            <ul className="text-sm text-green-700 space-y-1">
                              {["Medical expenses", "Education fees", "Emergency relief", "Community projects", "Ruracio/dowry", "Business startups", "Environmental conservation", "Other socially beneficial causes"].map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="mr-2">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-red-50 p-5 rounded-lg border border-red-200">
                            <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Prohibited Campaigns
                            </h4>
                            <ul className="text-sm text-red-700 space-y-1">
                              {["Illegal activities", "Personal luxury items without genuine need", "Hate speech or discriminatory purposes", "Political campaigns", "Any activity that violates Kenyan law"].map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="mr-2">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <ul className="space-y-3">
                          {[
                            { title: "Accuracy of Information", content: "All campaign descriptions must be truthful and not misleading. You must disclose your relationship to the beneficiary." },
                            { title: "Documentation", content: "For medical campaigns, you may be required to provide medical documentation. For education campaigns, provide school fee structures." },
                            { title: "Funds Usage", content: "You agree to use all funds raised solely for the stated purpose of the campaign." },
                            { title: "Transparency", content: "You agree to provide updates to donors and, if requested, evidence of how funds were used." },
                            { title: "Tax Obligations", content: "You are responsible for any tax implications of funds received." }
                          ].map((item, index) => (
                            <li key={index}>
                              <h4 className="font-medium text-emerald-700 mb-1">{item.title}</h4>
                              <p className="text-gray-600 text-sm">{item.content}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section id="section-5" className="mb-10 pb-8 border-b border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="bg-emerald-100 text-emerald-800 rounded-lg w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">5</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Donations</h2>
                        <ul className="space-y-3">
                          {[
                            "All donations are voluntary and non-refundable",
                            "Harambee charges a platform fee of 5% on all donations to maintain our services",
                            "Payment processing fees may apply depending on the payment method",
                            "Donors acknowledge that Harambee does not guarantee that campaigns will fulfill their stated purposes",
                            "Donations are made directly to campaign creators, and Harambee is not responsible for misuse of funds"
                          ].map((item, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Additional sections would follow the same pattern */}
                  <section id="section-6" className="mb-10 pb-8 border-b border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="bg-emerald-100 text-emerald-800 rounded-lg w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">6</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Intellectual Property</h2>
                        <p className="text-gray-600">
                          By posting content on our Platform, you grant Harambee a non-exclusive, royalty-free license to use, display, 
                          and distribute that content for the purpose of operating and promoting the Platform.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="section-7" className="mb-10 pb-8 border-b border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="bg-emerald-100 text-emerald-800 rounded-lg w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">7</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Limitation of Liability</h2>
                        <p className="text-gray-600 mb-4">
                          Harambee is not liable for any damages resulting from:
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Misuse of funds by campaign creators",
                            "Inaccurate information provided by campaign creators",
                            "Technical issues beyond our reasonable control",
                            "Unauthorized access to your account"
                          ].map((item, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="h-5 w-5 text-rose-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section id="section-8" className="mb-10 pb-8 border-b border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="bg-emerald-100 text-emerald-800 rounded-lg w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">8</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Termination</h2>
                        <p className="text-gray-600">
                          We may suspend or terminate your account if you violate these Terms and Conditions. 
                          Campaign creators who misuse funds may be subject to legal action.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="section-9" className="mb-10 pb-8 border-b border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="bg-emerald-100 text-emerald-800 rounded-lg w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">9</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Governing Law</h2>
                        <p className="text-gray-600">
                          These Terms and Conditions are governed by the laws of Kenya. Any disputes shall be 
                          resolved in the courts of Kenya.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="section-10" className="mb-10 pb-8 border-b border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="bg-emerald-100 text-emerald-800 rounded-lg w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">10</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Changes to Terms</h2>
                        <p className="text-gray-600">
                          We may update these Terms and Conditions from time to time. Continued use of the Platform 
                          after changes constitutes acceptance of the modified terms.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="section-11">
                    <div className="flex items-start mb-4">
                      <div className="bg-emerald-100 text-emerald-800 rounded-lg w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-bold">11</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Contact Information</h2>
                        <p className="text-gray-600 mb-4">
                          For questions about these Terms and Conditions, please contact us at:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className="text-gray-700">legal@harambee.co.ke</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">Harambee House, Nairobi, Kenya</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                
                {/* Acceptance Footer */}
                <div className="bg-emerald-50 px-8 py-6 border-t border-emerald-100">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-emerald-800 font-medium">
                      By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}