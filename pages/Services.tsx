import React from 'react';
import { FileText, Heart, GraduationCap, Briefcase, Home, Scale, ArrowRight, LifeBuoy, MapPin, Building2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Button } from '../components/ui';

const Services = () => {
  const categories = [
    { name: "Land & Housing", icon: Home, desc: "Land registration, property records, housing development", slug: "land" },
    { name: "Business Registration", icon: Briefcase, desc: "Register business, apply for licenses, entrepreneur support", slug: "business" },
    { name: "Civil Documentation", icon: FileText, desc: "Birth certificates, ID cards, marriage certificates", slug: "civil" },
    { name: "Healthcare Services", icon: Heart, desc: "Public hospitals, health centers, medical facilities", slug: "health" },
    { name: "Education Services", icon: GraduationCap, desc: "School registration, exam results, programs", slug: "education" },
    { name: "Legal Services", icon: Scale, desc: "Legal aid, court services, justice system information", slug: "legal" },
  ];

  const landPortals = [
    {
      name: "CESLand Citizen Land Registry Portal",
      icon: MapPin,
      desc: "Verify land titles, search parcel records, track property registrations, and access citizen land services online.",
      url: "https://cesland-citizen.supiritechnologies.com/",
      cta: "Open Citizen Portal"
    },
    {
      name: "CESLand Land Management System",
      icon: Building2,
      desc: "Official Central Equatoria State platform for land administration, parcel mapping, surveying, and registry management.",
      url: "https://cesland-cesgov.supiritechnologies.com/",
      cta: "Open Management System"
    }
  ];

  return (
    <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Government Services</h1>
        <p className="text-gray-600">
          Access a wide range of government services online or find information on how to apply in person.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <Card key={idx} className="group hover:border-[#00a898]/20 transition-all">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 bg-[#f0f9f1] rounded-full flex items-center justify-center text-[#00a898] group-hover:bg-[#00a898] group-hover:text-white transition-colors">
                <cat.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{cat.name}</h3>
              <p className="text-gray-600 h-12">{cat.desc}</p>
              <Link 
                to={`/services/${cat.slug}`} 
                className="inline-flex items-center text-[#00a898] font-semibold border-b-2 border-transparent hover:border-[#00a898] pb-0.5 transition-all group-hover:translate-x-1"
              >
                Access Services <ArrowRight size={16} className="ml-2" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CESLand Digital Land Platforms */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">CESLand Digital Land Portals</h2>
          <p className="text-gray-600 text-sm">
            Direct access to Central Equatoria State's dedicated land registry and land management platforms.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {landPortals.map((portal, idx) => (
            <Card key={idx} className="group hover:border-[#00a898]/30 transition-all">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 bg-[#f0f9f1] rounded-full flex items-center justify-center text-[#00a898] group-hover:bg-[#00a898] group-hover:text-white transition-colors">
                  <portal.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{portal.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{portal.desc}</p>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#00a898] font-semibold border-b-2 border-transparent hover:border-[#00a898] pb-0.5 transition-all group-hover:translate-x-1"
                >
                  {portal.cta} <ExternalLink size={16} className="ml-2" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-[#d2f2d4] rounded-2xl p-8 md:p-12 text-center space-y-6">
         <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#00a898] mx-auto shadow-sm">
           <LifeBuoy size={32} />
         </div>
         <h2 className="text-2xl font-bold text-gray-900">Need help finding a service?</h2>
         <p className="text-gray-700 max-w-xl mx-auto">
           Our support team is available to assist you with any questions regarding government services and applications.
         </p>
         <Link to="/contact">
           <Button>Contact Support</Button>
         </Link>
      </div>
    </div>
  );
};

export default Services;