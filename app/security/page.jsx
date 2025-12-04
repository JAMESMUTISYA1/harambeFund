// app/security/page.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Security() {
  const securityFeatures = [
    {
      icon: "🔒",
      title: "End-to-End Encryption",
      description: "All sensitive data is encrypted both in transit and at rest using industry-standard AES-256 encryption."
    },
    {
      icon: "📝",
      title: "PCI DSS Compliance",
      description: "We're fully compliant with Payment Card Industry Data Security Standards for all payment processing."
    },
    {
      icon: "🔄",
      title: "Two-Factor Authentication",
      description: "Optional 2FA adds an extra layer of security to your account beyond just your password."
    },
    {
      icon: "👁️",
      title: "Regular Security Audits",
      description: "We conduct regular third-party security audits and penetration testing to identify vulnerabilities."
    },
    {
      icon: "🛡️",
      title: "Fraud Detection",
      description: "Advanced AI-powered systems monitor for suspicious activity and potential fraud 24/7."
    },
    {
      icon: "🔍",
      title: "Campaign Verification",
      description: "Every campaign undergoes manual review and verification to ensure legitimacy."
    }
  ];

  const dataProtection = [
    {
      title: "Data Encryption",
      description: "All personal and financial data is encrypted using military-grade encryption protocols."
    },
    {
      title: "Secure Payments",
      description: "Payment processing is handled by certified partners with proven security track records."
    },
    {
      title: "Privacy Controls",
      description: "You control what information is visible to others through comprehensive privacy settings."
    },
    {
      title: "Regular Backups",
      description: "All data is regularly backed up to secure, geographically distributed locations."
    }
  ];

  const userGuidelines = [
    {
      title: "Strong Passwords",
      description: "Use unique, complex passwords and consider enabling two-factor authentication."
    },
    {
      title: "Verify Campaigns",
      description: "Always check campaign verification status before donating."
    },
    {
      title: "Secure Devices",
      description: "Keep your devices and browsers updated with the latest security patches."
    },
    {
      title: "Phishing Awareness",
      description: "Be cautious of suspicious emails or messages asking for your login details."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Security at Harambee</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Your safety and privacy are our top priority. Learn about the measures we take to protect your data and transactions.
            </p>
          </div>
        </section>

        {/* Security Features Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Security Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Protection */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Data Protection & Privacy</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {dataProtection.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment to Privacy</h3>
                <p className="text-gray-600 mb-4">
                  At Harambee, we adhere to the highest standards of data protection and privacy. We comply with 
                  the Kenyan Data Protection Act and implement industry best practices to safeguard your information.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>We never sell your personal data to third parties</li>
                  <li>We minimize data collection to only what's necessary</li>
                  <li>You have full control over your data and privacy settings</li>
                  <li>Regular transparency reports about data requests</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Security */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Secure Payment Processing</h2>
              <p className="text-xl text-gray-600 mb-8">
                Your financial information is protected by industry-leading security measures
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="text-3xl mb-4">💳</div>
                  <h3 className="font-semibold text-gray-800 mb-2">PCI DSS Compliant</h3>
                  <p className="text-gray-600 text-sm">Meeting the highest standards for payment security</p>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="text-3xl mb-4">🔐</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Tokenization</h3>
                  <p className="text-gray-600 text-sm">Card details are replaced with secure tokens</p>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="text-3xl mb-4">👁️</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Fraud Monitoring</h3>
                  <p className="text-gray-600 text-sm">24/7 monitoring for suspicious activities</p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Supported Payment Methods</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium">M-Pesa</span>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium">Airtel Money</span>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium">Visa</span>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium">MasterCard</span>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium">PayPal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Security Guidelines */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Your Role in Security</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {userGuidelines.map((guideline, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{guideline.title}</h3>
                    <p className="text-gray-600">{guideline.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">⚠️ Security Alert: Phishing Awareness</h3>
                <p className="text-gray-600 mb-4">
                  Harambee will never ask for your password via email, phone, or SMS. Be cautious of:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Emails asking you to confirm your password or payment details</li>
                  <li>Messages claiming your account will be suspended without immediate action</li>
                  <li>Requests for remote access to your device</li>
                  <li>Unsolicited requests for personal or financial information</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  If you receive a suspicious message, forward it to <span className="font-medium">security@harambee.co.ke</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Incident Response */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Incident Response & Reporting</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-red-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Report Security Issues</h3>
                  <p className="text-gray-600 mb-4">
                    If you discover a security vulnerability or suspect unauthorized access to your account:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Immediately change your password</li>
                    <li>Enable two-factor authentication if not already active</li>
                    <li>Contact our security team at security@harambee.co.ke</li>
                    <li>Monitor your account for suspicious activity</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Bug Bounty Program</h3>
                  <p className="text-gray-600 mb-4">
                    We reward security researchers who help us identify vulnerabilities:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Responsible disclosure process</li>
                    <li>Monetary rewards for valid vulnerabilities</li>
                    <li>Recognition in our security hall of fame</li>
                    <li>No legal action for good faith research</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Link 
                  href="/contact" 
                  className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition font-semibold inline-block mr-4"
                >
                  Contact Security Team
                </Link>
                <Link 
                  href="/privacy" 
                  className="border border-green-600 text-green-600 px-8 py-4 rounded-xl hover:bg-green-50 transition font-semibold inline-block"
                >
                  View Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Have Security Questions?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our security team is available to address any concerns or questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition">
                Contact Security Team
              </Link>
             
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}