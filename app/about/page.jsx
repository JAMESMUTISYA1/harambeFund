// app/about/page.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  const causes = [
    {
      title: "Medical & Hospital Bills",
      description: "Help families cover medical expenses, surgeries, and hospital stays.",
      image: "/images/medical.jfif"
    },
    {
      title: "Education & School Fees",
      description: "Support students with tuition fees, books, and educational resources.",
      image: "/images/schools.jfif"
    },
    {
      title: "Emergency Relief",
      description: "Provide immediate assistance during crises and emergencies.",
      image: "/images/medical.jfif" // Note: Same as medical, consider using different image
    },
    {
      title: "Ruracio & Dowry",
      description: "Support traditional Kenyan wedding ceremonies and cultural practices.",
      image: "/images/ruracio.jfif"
    },
    {
      title: "Innovation & Startups",
      description: "Fund innovative solutions and technology startups driving change.",
      image: "/images/innovation.jfif"
    },
    {
      title: "Youth Empowerment & Community Projects",
      description: "Support programs that develop skills and opportunities for young people.",
      image: "/images/empowerment.jfif"
    }
  ];

  const goals = [
    {
      title: "Financial Inclusion",
      value: "5M Kenyans",
      description: "Digital fundraising access by 2025",
      icon: "💳",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Education Support",
      value: "50K Students",
      description: "Community-driven learning opportunities",
      icon: "🎓",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Healthcare Access",
      value: "25K Families",
      description: "Lifesaving medical care support",
      icon: "🏥",
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Youth Empowerment",
      value: "100K Youth",
      description: "Skills development and opportunity creation",
      icon: "🚀",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Compact Hero Section */}
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
                <span className="text-xs">Our Story</span>
              </div>
              
              {/* Hero Title */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                Building <span className="text-yellow-300">Stronger Communities</span> Together
              </h1>
              
              {/* Hero Subtitle */}
              <p className="text-sm md:text-base mb-4 opacity-90 max-w-lg mx-auto">
                Harambee connects generosity with need through collective giving.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <Link 
                  href="/campaigns" 
                  className="bg-white text-green-700 px-4 py-2 text-xs font-semibold rounded hover:bg-green-50 transition shadow-sm hover:shadow"
                >
                  Support Campaigns
                </Link>
                <Link 
                  href="/campaigns/create" 
                  className="border border-white text-white px-4 py-2 text-xs font-semibold rounded hover:bg-white hover:text-green-700 transition hover:shadow"
                >
                  Start Campaign
                </Link>
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

        {/* Our Story Section with Next.js Image */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Image */}
              <div className="md:w-2/5">
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/schools.jfif"
                    alt="Kenyans united in community support"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="md:w-3/5">
                <div className="inline-flex items-center text-green-600 font-semibold text-sm uppercase tracking-wide mb-2">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Who We Are
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  The <span className="text-green-600">Harambee Spirit</span> Reimagined
                </h2>
                <p className="text-gray-600 mb-4">
                  Harambee brings the traditional Kenyan spirit of togetherness into the digital age. 
                  We connect people who need help with those who want to give, creating a community 
                  where everyone can lift each other up.
                </p>
                <p className="text-gray-600">
                  Our platform makes giving simple, secure, and transparent, empowering Kenyans to 
                  support each other through life's challenges and celebrations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission - Compact */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vision */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                    <span className="text-lg">👁️</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  A Kenya where no one faces financial challenges alone, and community support 
                  is always within reach through technology and compassion.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                    <span className="text-lg">🎯</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Our Mission</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  To provide a secure, transparent platform that empowers Kenyans to create, 
                  share, and support fundraising campaigns for any need.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Goals Section Only */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Our <span className="text-green-600">Goals</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Building towards a more inclusive and empowered Kenya
              </p>
            </div>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {goals.map((goal, index) => (
                <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start mb-4">
                    <div className={`w-12 h-12 ${goal.color.split(' ')[0]} rounded-lg flex items-center justify-center mr-3 flex-shrink-0`}>
                      <span className="text-xl">{goal.icon}</span>
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${goal.color.split(' ')[1]} mb-1`}>{goal.value}</div>
                      <h4 className="text-base font-bold text-gray-800">{goal.title}</h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Causes Section with Next.js Image */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Causes We <span className="text-green-600">Support</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Harambee enables Kenyans to raise funds for various community needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {causes.map((cause, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
                  <div className="relative h-48">
                    <Image
                      src={cause.image}
                      alt={cause.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 mb-2 text-lg">{cause.title}</h3>
                    <p className="text-gray-600 text-sm">{cause.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Simplified */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              How <span className="text-green-600">Harambee</span> Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                </div>
                <h3 className="font-semibold mb-2">Create Campaign</h3>
                <p className="text-sm text-gray-600">Share your story and set a goal</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                </div>
                <h3 className="font-semibold mb-2">Share Widely</h3>
                <p className="text-sm text-gray-600">Reach supporters through networks</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                </div>
                <h3 className="font-semibold mb-2">Receive Support</h3>
                <p className="text-sm text-gray-600">Withdraw funds directly to M-Pesa</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Join the Movement</h2>
            <p className="mb-6 max-w-lg mx-auto opacity-90">
              Be part of Kenya's trusted platform for community support
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link 
                href="/campaigns/create" 
                className="bg-white text-green-700 px-5 py-2.5 text-sm font-semibold rounded hover:bg-green-50 transition shadow"
              >
                Start Campaign
              </Link>
              <Link 
                href="/campaigns" 
                className="border border-white text-white px-5 py-2.5 text-sm font-semibold rounded hover:bg-white hover:text-green-700 transition"
              >
                Support Others
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}