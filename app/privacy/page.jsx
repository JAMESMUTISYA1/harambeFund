// app/privacy/page.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <div className="prose max-w-none">
              <section className="mb-8">
                <p className="text-gray-600 mb-4">
                  At Harambee, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>
                <p className="text-gray-600">
                  By using Harambee, you consent to the data practices described in this Privacy Policy. If you do not agree with the 
                  data practices described, you should not use our Platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">1.1 Personal Information</h3>
                <p className="text-gray-600 mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
                  <li>Create an account</li>
                  <li>Create or donate to a campaign</li>
                  <li>Contact us or submit inquiries</li>
                  <li>Subscribe to our newsletters</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  This information may include:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
                  <li>Name, email address, phone number</li>
                  <li>Date of birth, gender</li>
                  <li>Payment information (processed by secure third-party providers)</li>
                  <li>Government-issued identification for verification purposes</li>
                  <li>Photographs and stories for campaigns</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-3">1.2 Automatically Collected Information</h3>
                <p className="text-gray-600 mb-4">
                  When you use our Platform, we may automatically collect certain information, including:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
                  <li>IP address and device information</li>
                  <li>Browser type and operating system</li>
                  <li>Usage data and browsing patterns</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We may use the information we collect for various purposes, including to:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
                  <li>Create and manage your account</li>
                  <li>Process donations and transactions</li>
                  <li>Verify your identity and prevent fraud</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send administrative information and updates</li>
                  <li>Personalize your experience on our Platform</li>
                  <li>Analyze and improve our services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Legal Basis for Processing</h2>
                <p className="text-gray-600 mb-4">
                  We process your personal information based on the following legal grounds:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
                  <li><strong>Performance of a contract:</strong> To provide our services to you</li>
                  <li><strong>Consent:</strong> Where you have given us consent to process your data</li>
                  <li><strong>Legitimate interests:</strong> To operate our business and provide services</li>
                  <li><strong>Legal obligations:</strong> To comply with applicable laws and regulations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. How We Share Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
                  <li><strong>With service providers:</strong> We engage third-party companies to facilitate our services, process payments, or provide analytics</li>
                  <li><strong>For legal reasons:</strong> When required by law, regulation, or legal process</li>
                  <li><strong>To protect rights:</strong> When we believe disclosure is necessary to protect our rights or the rights of others</li>
                  <li><strong>With your consent:</strong> When you have given us explicit consent to share your information</li>
                  <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                </ul>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Information Visible to Others</h3>
                <p className="text-gray-600 mb-4">
                  Depending on your privacy settings, certain information may be visible to other users:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
                  <li>Campaign creators: Your name and campaign information may be visible to donors</li>
                  <li>Donors: Your name and donation amount may be visible to campaign creators unless you choose to donate anonymously</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Retention</h2>
                <p className="text-gray-600 mb-4">
                  We will retain your personal information only for as long as necessary to fulfill the purposes for which we collected it, 
                  including to satisfy any legal, accounting, or reporting requirements.
                </p>
                <p className="text-gray-600">
                  To determine the appropriate retention period, we consider the amount, nature, and sensitivity of the personal data, 
                  the potential risk of harm from unauthorized use or disclosure, the purposes for which we process it, and whether we 
                  can achieve those purposes through other means.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Data Protection Rights</h2>
                <p className="text-gray-600 mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
                  <li><strong>Access:</strong> The right to request copies of your personal data</li>
                  <li><strong>Rectification:</strong> The right to request correction of inaccurate information</li>
                  <li><strong>Erasure:</strong> The right to request deletion of your personal data</li>
                  <li><strong>Restriction:</strong> The right to request the restriction of processing of your personal data</li>
                  <li><strong>Data portability:</strong> The right to request the transfer of your data to another organization</li>
                  <li><strong>Objection:</strong> The right to object to processing of your personal data</li>
                  <li><strong>Withdraw consent:</strong> The right to withdraw consent where we rely on consent to process your personal data</li>
                </ul>
                <p className="text-gray-600">
                  To exercise any of these rights, please contact us using the details provided in the "Contact Us" section.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Cookies and Tracking Technologies</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar tracking technologies to track activity on our Platform and store certain information. 
                  Cookies are files with a small amount of data that may include an anonymous unique identifier.
                </p>
                <p className="text-gray-600 mb-4">
                  Types of cookies we use:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
                  <li><strong>Essential cookies:</strong> Necessary for the operation of our Platform</li>
                  <li><strong>Functionality cookies:</strong> Allow us to remember choices you make</li>
                  <li><strong>Analytical/performance cookies:</strong> Allow us to recognize and count the number of visitors</li>
                  <li><strong>Targeting cookies:</strong> Record your visit to our Platform and the pages you visit</li>
                </ul>
                <p className="text-gray-600">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not 
                  accept cookies, you may not be able to use some portions of our Platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized 
                  or unlawful processing, accidental loss, destruction, or damage.
                </p>
                <p className="text-gray-600">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use 
                  commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Children's Privacy</h2>
                <p className="text-gray-600 mb-4">
                  Our Platform is not intended for children under 18 years of age. We do not knowingly collect personal information 
                  from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, 
                  please contact us, and we will delete such information from our systems.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. International Data Transfers</h2>
                <p className="text-gray-600 mb-4">
                  Your information may be transferred to and processed in countries other than Kenya. These countries may have data 
                  protection laws that are different from the laws of your country.
                </p>
                <p className="text-gray-600">
                  Whenever we transfer your personal information outside of Kenya, we ensure a similar degree of protection is afforded 
                  to it by implementing appropriate safeguards.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Changes to This Privacy Policy</h2>
                <p className="text-gray-600 mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
                  on this page and updating the "Last Updated" date.
                </p>
                <p className="text-gray-600">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective 
                  when they are posted on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>By email: privacy@harambee.co.ke</li>
                  <li>By visiting this page on our website: <Link href="/contact" className="text-green-600 hover:underline">Contact Us</Link></li>
                  <li>By mail: Harambee House, Nairobi, Kenya</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}