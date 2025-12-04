// app/about/page.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  const causes = [
    {
      title: "Medical & Hospital Bills",
      description: "Help families cover medical expenses, surgeries, and hospital stays for those in need.",
      image: "/images/medical-care.jpg"
    },
    {
      title: "Education & School Fees",
      description: "Support students by contributing towards tuition fees, books, and educational resources.",
      image: "/images/education.jpg"
    },
    {
      title: "Emergency Relief",
      description: "Provide immediate assistance during crises like natural disasters, accidents, or sudden loss.",
      image: "/images/emergency.jpg"
    },
    {
      title: "Ruracio & Dowry",
      description: "Celebrate and support traditional Kenyan wedding ceremonies and cultural practices.",
      image: "/images/wedding.jpg"
    },
    {
      title: "Business Ventures",
      description: "Empower entrepreneurs by funding small business startups and expansion projects.",
      image: "/images/business.jpg"
    },
    {
      title: "Community Projects",
      description: "Contribute to initiatives that benefit entire communities like water wells or infrastructure.",
      image: "/images/community.jpg"
    }
  ];

  const stats = [
    { value: "1M+", label: "Users Supported" },
    { value: "50K+", label: "Successful Campaigns" },
    { value: "KES 500M+", label: "Total Donations" },
    { value: "98%", label: "Satisfaction Rate" }
  ];

 const coreValues = [ 
  {
    title: "Unity",
    description: "We stand together in the true spirit of Harambee—lifting each other up and proving we are stronger as one.",
    icon: "🤝"
  },
  {
    title: "Trust",
    description: "Every contribution is secure and transparent, ensuring confidence and integrity in all we do.",
    icon: "🔒"
  },
  {
    title: "Compassion",
    description: "We lead with empathy, kindness, and care—because every act of giving carries hope.",
    icon: "💖"
  },
  {
    title: "Empowerment",
    description: "We use innovation and inclusion to give every Kenyan the power to create change and impact lives.",
    icon: "⚡"
  }
];

const impactGoals = [
  {
    title: "Financial Inclusion",
    target: "5 Million Kenyans",
    description: "Open the doors of digital fundraising so that no one is left behind by 2025."
  },
  {
    title: "Education Support",
    target: "50,000 Students",
    description: "Give every child the chance to learn, dream, and achieve through community-driven support."
  },
  {
    title: "Healthcare Access",
    target: "25,000 Families",
    description: "Provide lifesaving medical care and restore hope to families in need."
  },
  {
    title: "Economic Empowerment",
    target: "10,000 Entrepreneurs",
    description: "Fuel small businesses with opportunities to grow, create jobs, and transform communities."
  }
];


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-800 text-white">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/about-hero.jpg"
              alt="Kenyan community coming together"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About <span className="text-rose-400">Harambee</span></h1>
           <p className="text-xl max-w-3xl mx-auto">
  Harambee brings <span className="text-emerald-400 font-medium">hope and unity</span> to Kenyans, 
  empowering us to lift each other up through collective giving. 
  Together, we preserve the <span className="text-amber-300 font-medium">spirit of community</span> 
  and compassion that defines our nation, creating a lasting impact for generations to come.
</p>
          </div>
        </section>

      {/* About Us Section */}
<section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
      
      {/* Left Image */}
      <div className="md:w-1/2 w-full flex justify-center">
        <img 
          src="/images/harambee-community.jpg" 
          alt="Kenyans united in Harambee" 
          className="rounded-2xl shadow-lg w-full h-auto object-cover max-h-[400px]"
        />
      </div>

      {/* Right Content */}
      <div className="md:w-1/2 w-full text-center md:text-left">
        {/* Tagline */}
        <p className="text-emerald-600 font-semibold uppercase tracking-wide mb-3">
          Together, We Rise
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Who <span className="text-emerald-600">We Are</span>
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Harambee is more than just a platform—it is a <span className="text-rose-500 font-medium">movement of hope</span>. 
          We reimagine the traditional Kenyan spirit of togetherness, empowering people to 
          <span className="text-emerald-600 font-medium"> lift each other up</span> through compassion and generosity.
        </p>
        <p className="text-lg text-gray-600">
          Our mission is to bridge the gap between those who <span className="text-rose-500 font-medium">need a helping hand</span> 
          and those who <span className="text-emerald-600 font-medium">want to make a difference</span>. 
          With every contribution, we build a stronger, united, and more hopeful nation— 
          proving that together, we can create lasting impact.
        </p>
      </div>
    </div>
  </div>
</section>


        {/* Vision & Mission Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Vision Statement */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-rose-400">
                <div className='flex items-center gap-10' >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-emerald-600">👁️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our <span className="text-rose-500">Vision</span></h2>

                </div>
                  <p className="text-gray-600">
          To create a Kenya where no one faces financial challenges alone, and every community 
          member has access to the <span className="text-emerald-600 font-medium">care and support</span> they need to thrive. 
          We envision a future where the spirit of <span className="text-rose-500 font-medium">Harambee</span> transcends 
          boundaries, connecting Kenyans worldwide in acts of compassion, unity, and lasting kindness.
        </p>
              </div>

              {/* Mission Statement */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-emerald-500">
                <div className='flex items-center gap-10' >
               <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-emerald-600">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our <span className="text-emerald-600">Mission</span></h2>
    
                </div>
                 <p className="text-gray-600">
          To democratize access to financial support by providing a 
          <span className="text-rose-500 font-medium"> secure, transparent</span>, and user-friendly platform that 
          empowers Kenyans to create, share, and contribute to fundraising campaigns. 
          We honor our cultural traditions while embracing technology to make 
          <span className="text-emerald-600 font-medium"> community support stronger, faster, and more impactful</span> than ever before.
        </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our <span className="text-emerald-600">Core Values</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-b from-emerald-50 to-white rounded-xl border border-emerald-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Goals Section */}
        <section className="py-16 bg-emerald-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our <span className="text-rose-500">Impact Goals</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {impactGoals.map((goal, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-emerald-100">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-rose-600 font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{goal.title}</h3>
                      <p className="text-emerald-600 font-medium">{goal.target}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{goal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-100 to-green-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Impact <span className="text-rose-500">So Far</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
                  <div className="text-4xl font-bold text-emerald-700 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Causes Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Causes You Can <span className="text-emerald-600">Support</span></h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Harambee enables Kenyans to raise funds for various needs that matter to our communities
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {causes.map((cause, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200">
                  <div className="relative h-48">
                    <Image
                      src={cause.image}
                      alt={cause.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-semibold text-lg">{cause.title}</div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600">{cause.description}</p>
                    <button className="mt-4 text-rose-500 font-medium hover:text-rose-600 flex items-center">
                      Learn more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How <span className="text-emerald-600">Harambee</span> Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-emerald-100">
                <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">1</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Your Campaign</h3>
                <p className="text-gray-600">Share your story, set a goal, and add photos to create a compelling campaign.</p>
              </div>
              
              <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-emerald-100">
                <div className="bg-rose-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl">2</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Share With Community</h3>
                <p className="text-gray-600">Spread the word through social media, WhatsApp, and email to reach supporters.</p>
              </div>
              
              <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-emerald-100">
                <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">3</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Receive Support</h3>
                <p className="text-gray-600">Withdraw funds directly to your M-Pesa or bank account to fulfill your need.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-700 to-green-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join the <span className="text-rose-300">Harambee</span> Movement</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Whether you need support or want to help others, become part of Kenya's most trusted donation platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="bg-rose-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-rose-600 transition transform hover:scale-105 shadow-md">
                Start a Campaign
              </Link>
              <Link href="/campaigns" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-emerald-700 transition">
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