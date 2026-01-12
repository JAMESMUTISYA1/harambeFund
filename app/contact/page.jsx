// app/contact/page.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Contact() {
  const faqs = [
    {
      question: "How do I create a campaign?",
      answer: "Click 'Start a Campaign' from the homepage. Fill in your cause details, set a funding goal, and share your story. We'll review within 24 hours."
    },
    {
      question: "What payment methods are accepted?",
      answer: "M-Pesa, Airtel Money, Visa, MasterCard, and PayPal. All payments are secure and encrypted."
    },
    {
      question: "How long to receive funds?",
      answer: "Funds are disbursed within 2-3 business days after campaign ends or withdrawal request."
    },
    {
      question: "What percentage does Harambee take?",
      answer: "5% platform fee. Payment processors may charge 2-3%. Over 90% goes directly to beneficiaries."
    },
    {
      question: "How to verify a campaign?",
      answer: "Look for 'Verified' badge, check updates, review beneficiary info, or contact our support team."
    }
  ];

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      details: "support@harambee.co.ke",
      description: "Response within 24 hours",
      link: "mailto:support@harambee.co.ke"
    },
    {
      icon: "📞",
      title: "Phone",
      details: "+254 700 123 456",
      description: "Mon-Fri, 8am-6pm EAT",
      link: "tel:+254700123456"
    },
    {
      icon: "💬",
      title: "WhatsApp",
      details: "+254 711 123 456",
      description: "Chat with us anytime",
      link: "https://wa.me/254711123456"
    },
    {
      icon: "📍",
      title: "Visit",
      details: "Nairobi, Kenya",
      description: "Harambee Plaza",
      link: "https://maps.google.com/?q=Harambee+Avenue,Nairobi"
    }
  ];

  const departments = [
    {
      name: "Campaign Support",
      email: "campaigns@harambee.co.ke",
      description: "Help with campaigns"
    },
    {
      name: "Technical Support",
      email: "tech@harambee.co.ke",
      description: "Website issues"
    },
    {
      name: "Donor Support",
      email: "donors@harambee.co.ke",
      description: "Donation assistance"
    },
    {
      name: "Partnerships",
      email: "partnerships@harambee.co.ke",
      description: "Collaborations"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Minimalistic Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-white rounded-full blur-xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-green-300 rounded-full blur-xl"></div>
          </div>
          
          <div className="container mx-auto px-4 py-8 md:py-10 text-center relative z-10">
            <div className="max-w-2xl mx-auto">
              {/* Hero Badge */}
              <div className="inline-flex items-center bg-white/5 backdrop-blur-sm rounded-full px-2.5 py-1 mb-3">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">Contact Us</span>
              </div>
              
              {/* Hero Title */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                Get in <span className="text-yellow-300">Touch</span>
              </h1>
              
              {/* Hero Subtitle */}
              <p className="text-sm md:text-base mb-4 opacity-90 max-w-lg mx-auto">
                We're here to help with any questions about Harambee.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <a 
                  href="#contact-form" 
                  className="bg-white text-green-700 px-4 py-2 text-xs font-semibold rounded hover:bg-green-50 transition shadow-sm hover:shadow"
                >
                  Send Message
                </a>
                <a 
                  href="#faq" 
                  className="border border-white text-white px-4 py-2 text-xs font-semibold rounded hover:bg-white hover:text-green-700 transition hover:shadow"
                >
                  View FAQ
                </a>
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

        {/* Contact Methods - Minimalistic Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Contact <span className="text-green-600">Options</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target={method.link.includes('http') ? '_blank' : '_self'}
                  rel={method.link.includes('http') ? 'noopener noreferrer' : ''}
                  className="bg-gray-50 rounded-lg p-4 text-center hover:bg-green-50 transition border border-gray-100 hover:border-green-200 hover:shadow-sm"
                >
                  <div className="text-2xl mb-3">{method.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-1">{method.title}</h3>
                  <p className="text-green-600 text-sm font-medium mb-1">{method.details}</p>
                  <p className="text-gray-600 text-xs">{method.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info - Simplified */}
        <section className="py-12 bg-gray-50" id="contact-form">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form - Minimal */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Send Message</h2>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <select
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                      required
                    >
                      <option value="">Select subject</option>
                      <option value="campaign-support">Campaign Support</option>
                      <option value="technical-issue">Technical Issue</option>
                      <option value="donation-help">Donation Help</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      placeholder="Your message..."
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition text-sm font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Office Info - Minimal */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Office Info</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-green-600 text-sm">📍</span>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">Headquarters</p>
                        <p className="text-gray-600 text-sm">Harambee Plaza, Nairobi</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-green-600 text-sm">🕒</span>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">Working Hours</p>
                        <p className="text-gray-600 text-sm">Mon-Fri: 8am-6pm</p>
                        <p className="text-gray-600 text-sm">Sat: 9am-2pm</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-green-600 text-sm">🌐</span>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">Social Media</p>
                        <div className="flex space-x-3 mt-1">
                          {['📘', '🐦', '📸', '💼'].map((icon, idx) => (
                            <a key={idx} href="#" className="text-gray-500 hover:text-green-600">
                              {icon}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Department Contacts - Minimal */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Departments</h2>
                  
                  <div className="space-y-3">
                    {departments.map((dept, index) => (
                      <div key={index} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <p className="font-medium text-gray-800 text-sm">{dept.name}</p>
                        <a href={`mailto:${dept.email}`} className="text-green-600 hover:text-green-700 text-sm">
                          {dept.email}
                        </a>
                        <p className="text-gray-500 text-xs mt-1">{dept.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Minimal */}
        <section className="py-12 bg-white" id="faq">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Frequently Asked <span className="text-green-600">Questions</span>
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="border border-gray-200 rounded-lg overflow-hidden group">
                  <summary className="px-4 py-3 bg-gray-50 cursor-pointer flex justify-between items-center list-none">
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <svg className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 py-3 bg-white">
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 text-sm mb-3">Need more help?</p>
              <Link 
                href="/help-center" 
                className="inline-block border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition text-sm font-medium"
              >
                Visit Help Center
              </Link>
            </div>
          </div>
        </section>

     
      </main>
      
      <Footer />
    </div>
  );
}