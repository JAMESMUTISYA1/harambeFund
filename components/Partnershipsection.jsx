'use client';

import Image from 'next/image';

const PartnershipsSection = () => {
  const partners = [
    {
      id: 1,
      name: "Kenya Red Cross",
      logo: "/images/redcross.png",
      link: "https://www.redcross.or.ke"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-green-800 to-emerald-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Our Trusted Partners</h2>
        
        <div className="flex justify-center items-center gap-10 mb-12">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="relative w-20 h-20 mb-3 bg-white bg-opacity-10 rounded-full p-3 group-hover:bg-opacity-20 transition-all">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <span className="text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                {partner.name}
              </span>
            </a>
          ))}
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Want to Partner With Us?</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/partnerships" 
              className="bg-white text-green-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition shadow-md"
            >
              Partnership Opportunities
            </a>
            <a 
              href="/contact" 
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipsSection;