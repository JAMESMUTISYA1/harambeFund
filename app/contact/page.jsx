// app/contact/page.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Contact() {
  const faqs = [
    {
      question: "How do I create a campaign?",
      answer: "Click on 'Start a Campaign' from the homepage or your dashboard. Fill in the required information about your cause, set a funding goal, and share your story. Our team will review and approve your campaign within 24 hours."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept M-Pesa, Airtel Money, Visa, MasterCard, and PayPal. All payments are processed securely through encrypted channels."
    },
    {
      question: "How long does it take to receive funds?",
      answer: "For verified campaigns, funds are typically disbursed within 2-3 business days after the campaign ends or when you request a withdrawal."
    },
    {
      question: "What percentage does Harambee take?",
      answer: "We charge a 5% platform fee to maintain our services. Payment processors may charge additional fees (2-3%). Over 90% of donations go directly to beneficiaries."
    },
    {
      question: "How can I verify a campaign's legitimacy?",
      answer: "All campaigns undergo verification. Look for the 'Verified' badge, check campaign updates, and review beneficiary information. You can also contact our support team for additional verification."
    }
  ];

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      details: "support@harambee.co.ke",
      description: "Send us an email and we'll respond within 24 hours",
      link: "mailto:support@harambee.co.ke"
    },
    {
      icon: "📞",
      title: "Call Us",
      details: "+254 700 123 456",
      description: "Mon-Fri from 8am to 6pm EAT",
      link: "tel:+254700123456"
    },
    {
      icon: "💬",
      title: "WhatsApp",
      details: "+254 711 123 456",
      description: "Chat with us on WhatsApp",
      link: "https://wa.me/254711123456"
    },
    {
      icon: "📍",
      title: "Visit Us",
      details: "Harambee Avenue, Nairobi",
      description: "Ground Floor, Harambee Plaza",
      link: "https://maps.google.com/?q=Harambee+Avenue,Nairobi"
    }
  ];

  const departments = [
    {
      name: "Campaign Support",
      email: "campaigns@harambee.co.ke",
      description: "Help with creating and managing campaigns"
    },
    {
      name: "Technical Support",
      email: "tech@harambee.co.ke",
      description: "Website issues and technical problems"
    },
    {
      name: "Donor Support",
      email: "donors@harambee.co.ke",
      description: "Assistance with donations and payments"
    },
    {
      name: "Partnerships",
      email: "partnerships@harambee.co.ke",
      description: "Business and organizational collaborations"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-green-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl max-w-2xl mx-auto">
              We're here to help you with any questions about Harambee. Reach out to us through any of the channels below.
            </p>
          </div>
        </section>

        {/* Contact Methods Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Contact Methods</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target={method.link.includes('http') ? '_blank' : '_self'}
                  rel={method.link.includes('http') ? 'noopener noreferrer' : ''}
                  className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer"
                >
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{method.title}</h3>
                  <p className="text-green-600 font-medium mb-2">{method.details}</p>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="campaign-support">Campaign Support</option>
                      <option value="technical-issue">Technical Issue</option>
                      <option value="donation-help">Donation Help</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-4 px-6 rounded-xl hover:bg-green-700 transition text-lg font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Office Info & Departments */}
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Office Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-green-600">📍</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Headquarters</h3>
                        <p className="text-gray-600">Harambee Plaza, 3rd Floor</p>
                        <p className="text-gray-600">Harambee Avenue, Nairobi, Kenya</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-green-600">🕒</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Working Hours</h3>
                        <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                        <p className="text-gray-600">Sunday: Closed</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-green-600">🌐</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Social Media</h3>
                        <div className="flex space-x-4 mt-2">
                          <a href="#" className="text-green-600 hover:text-green-700">
                            <span className="sr-only">Facebook</span>
                            <span className="text-xl">📘</span>
                          </a>
                          <a href="#" className="text-green-600 hover:text-green-700">
                            <span className="sr-only">Twitter</span>
                            <span className="text-xl">🐦</span>
                          </a>
                          <a href="#" className="text-green-600 hover:text-green-700">
                            <span className="sr-only">Instagram</span>
                            <span className="text-xl">📸</span>
                          </a>
                          <a href="#" className="text-green-600 hover:text-green-700">
                            <span className="sr-only">LinkedIn</span>
                            <span className="text-xl">💼</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Department Contacts */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Department Contacts</h2>
                  
                  <div className="space-y-4">
                    {departments.map((dept, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <h3 className="font-semibold text-gray-800">{dept.name}</h3>
                        <a href={`mailto:${dept.email}`} className="text-green-600 hover:text-green-700">
                          {dept.email}
                        </a>
                        <p className="text-gray-600 text-sm">{dept.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-start">
                    <span className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-11">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Didn't find what you were looking for?</p>
              <Link 
                href="/help-center" 
                className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition font-semibold"
              >
                Visit Help Center
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of Kenyans who are supporting their communities through Harambee.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/campaigns/create" className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition">
                Start a Campaign
              </Link>
              <Link href="/campaigns" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition">
                Donate Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}