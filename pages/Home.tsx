
import React, { useState, useEffect } from 'react';
import { Bell, FileText, CreditCard, ChevronRight, Users, Building2, Trees, GraduationCap, MapPin, Lightbulb, Tent, Anchor, Fish, ArrowLeftRight, Trees as TreeIcon, Landmark, Beef, Briefcase, Sprout, Wheat, ScrollText, LayoutGrid, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, Button } from '../components/ui';
import { CountyMap } from '../components/CountyMap';
import { COUNTIES } from '../data';
import { County } from '../types';

// Icon mapping helper
const getIcon = (name: string) => {
  const icons: any = { Building2, Users, GraduationCap, Trees, Sprout, ArrowLeftRight, Wheat, Lightbulb, Landmark, MapPin, Beef, Briefcase, Tent, Fish, Anchor };
  const Icon = icons[name] || MapPin;
  return <Icon size={20} className="text-[#00a898]" />;
};

const Home = () => {
  const [activeCounty, setActiveCounty] = useState<County>(COUNTIES[0]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Central Equatoria State",
      subtitle: "Republic of South Sudan",
      description: "Providing transparent, accessible, and efficient services to all citizens of Central Equatoria State.",
      image: "/ces-flag-over-Juba.png",
      cta: "Self-Service Portal",
      link: "/portal"
    },
    {
      title: "State Secretariat",
      subtitle: "Heart of Administration",
      description: "The administrative hub of Central Equatoria State, coordinating governance and public service delivery.",
      image: "/ces-secretariate.png",
      cta: "Government Structure",
      link: "/government"
    },
    {
      title: "Executive Cabinet",
      subtitle: "Leadership & Vision",
      description: "Our leadership team is dedicated to the progress, stability, and prosperity of Central Equatoria.",
      image: "/ces-cabinet.jpeg",
      cta: "Meet the Cabinet",
      link: "/government"
    },
    {
      title: "Governor's Office",
      subtitle: "H.E. Gen. Augustino Jadalla Kamilo Wani",
      description: "Leading with a vision for peace, stability, and progress in Central Equatoria State.",
      image: "/jadalla.jpeg",
      cta: "Executive Updates",
      link: "/government"
    },
    {
      title: "Unity & Progress",
      subtitle: "South Sudan Flag Map",
      description: "Building a stronger future together within the Republic of South Sudan.",
      image: "/south-sudan-flag-map.png",
      cta: "Our Heritage",
      link: "/government"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Highlight background colors cycle
  const highlightColors = ["bg-blue-50", "bg-purple-50", "bg-pink-50", "bg-orange-50", "bg-emerald-50", "bg-sky-50"];

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-20">
      
      {/* Hero Section - Simplified Panoramic */}
      <section className="relative h-[600px] md:h-[800px] overflow-hidden bg-gray-900">
        
        {/* Background Carousel - Images only change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt=""
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlay - Bottom Heavy */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto max-w-[95%] h-full px-4 md:px-16 relative z-10 flex flex-col justify-end pb-20 md:pb-32">
          <div className="max-w-4xl space-y-6">
            {/* Static Content */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#00a898]" />
                <span className="text-[#00a898] font-bold text-xs uppercase tracking-[0.4em]">
                  Official Government Portal
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase">
                Central Equatoria State Government
              </h1>
              
              <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed font-light">
                Empowering citizens through transparent, accessible, and efficient digital services. 
                Access our comprehensive suite of self-service tools to manage your government 
                interactions seamlessly from anywhere.
              </p>
            </div>

            <div className="pt-4">
              <Link to="/self-service-tools">
                <Button size="lg" className="bg-[#00a898] hover:bg-[#008f81] text-white px-10 py-5 text-lg rounded-xl transition-all group">
                  Access Self-Service Tools
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* Quick Actions - Modified to 3 columns */}
      <section className="container mx-auto max-w-[95%] px-4 md:px-8 mt-0 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Documents & Forms */}
          <Card className="hover:translate-y-[-4px] transition-all h-full">
             <CardContent className="flex items-start space-x-4 p-6 h-full">
              <div className="p-3 bg-green-50 rounded-full text-[#00a898] shrink-0">
                <FileText size={24} />
              </div>
              <div className="flex flex-col h-full">
                <h3 className="font-bold text-lg text-gray-900 mb-1">Documents & Forms</h3>
                <p className="text-gray-500 text-sm mb-3 flex-grow">Access public documents and downloadable forms</p>
                <Link to="/documents" className="text-[#00a898] text-sm font-medium flex items-center hover:underline mt-auto">
                  Browse Library <ChevronRight size={14} />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Online Payment */}
          <Card className="hover:translate-y-[-4px] transition-all h-full">
             <CardContent className="flex items-start space-x-4 p-6 h-full">
              <div className="p-3 bg-purple-50 rounded-full text-purple-600 shrink-0">
                <CreditCard size={24} />
              </div>
              <div className="flex flex-col h-full">
                <h3 className="font-bold text-lg text-gray-900 mb-1">Online Payment</h3>
                <p className="text-gray-500 text-sm mb-3 flex-grow">Pay for government services securely via CASHIT</p>
                <Link to="/payment" className="text-[#00a898] text-sm font-medium flex items-center hover:underline mt-auto">
                  Pay Now <ChevronRight size={14} />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Manage Your Case */}
          <Card className="hover:translate-y-[-4px] transition-all h-full sm:col-span-2 md:col-span-1">
             <CardContent className="flex items-start space-x-4 p-6 h-full">
              <div className="p-3 bg-orange-50 rounded-full text-orange-600 shrink-0">
                <LayoutGrid size={24} />
              </div>
              <div className="flex flex-col h-full">
                <h3 className="font-bold text-lg text-gray-900 mb-1">Manage Your eFiling Case</h3>
                <p className="text-gray-500 text-sm mb-3 flex-grow">Track application status and view history</p>
                <Link to="/auth/signin?redirect=/portal/dashboard" className="text-[#00a898] text-sm font-medium flex items-center hover:underline mt-auto">
                  Sign In to Dashboard <ChevronRight size={14} />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Executive Office Shortcuts - Updated Grid */}
      <section className="container mx-auto max-w-[95%] px-4 md:px-8 mt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Executive Office & Updates</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Executive Orders */}
          <Link to="/government/executive-orders" className="group">
            <Card className="h-full min-h-[160px] md:min-h-[200px] hover:border-[#00a898] transition-colors">
              <CardContent className="p-6 flex items-center space-x-4 h-full">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-[#00a898] group-hover:text-white transition-colors shrink-0">
                  <ScrollText size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900 group-hover:text-[#00a898] transition-colors">Executive Orders</h3>
                  <p className="text-sm text-gray-500">Decrees & directives</p>
                </div>
                <ChevronRight size={20} className="ml-auto text-gray-300 group-hover:text-[#00a898] shrink-0" />
              </CardContent>
            </Card>
          </Link>

          {/* Appointments */}
          <Link to="/government/appointments" className="group">
            <Card className="h-full min-h-[160px] md:min-h-[200px] hover:border-[#00a898] transition-colors">
              <CardContent className="p-6 flex items-center space-x-4 h-full">
                <div className="p-3 bg-rose-50 text-rose-600 rounded-lg group-hover:bg-[#00a898] group-hover:text-white transition-colors shrink-0">
                  <Briefcase size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900 group-hover:text-[#00a898] transition-colors">Appointments</h3>
                  <p className="text-sm text-gray-500">Staffing changes</p>
                </div>
                <ChevronRight size={20} className="ml-auto text-gray-300 group-hover:text-[#00a898] shrink-0" />
              </CardContent>
            </Card>
          </Link>

          {/* Cabinet Affairs */}
          <Link to="/government/cabinet-affairs" className="group">
            <Card className="h-full min-h-[160px] md:min-h-[200px] hover:border-[#00a898] transition-colors">
              <CardContent className="p-6 flex items-center space-x-4 h-full">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-[#00a898] group-hover:text-white transition-colors shrink-0">
                  <Users size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900 group-hover:text-[#00a898] transition-colors">Cabinet Affairs</h3>
                  <p className="text-sm text-gray-500">Resolutions & meetings</p>
                </div>
                <ChevronRight size={20} className="ml-auto text-gray-300 group-hover:text-[#00a898] shrink-0" />
              </CardContent>
            </Card>
          </Link>

          {/* Latest Updates - Adjusted to match other cards */}
          <Link to="/latest-updates" className="group">
            <Card className="h-full min-h-[160px] md:min-h-[200px] hover:border-[#00a898] transition-colors">
              <CardContent className="p-6 flex items-center space-x-4 h-full">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-[#00a898] group-hover:text-white transition-colors shrink-0">
                  <Bell size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900 group-hover:text-[#00a898] transition-colors">Latest Directives & Updates</h3>
                  <p className="text-sm text-gray-500">News & Announcements</p>
                </div>
                <ChevronRight size={20} className="ml-auto text-gray-300 group-hover:text-[#00a898] shrink-0" />
              </CardContent>
            </Card>
          </Link>
          
        </div>
      </section>

      {/* Counties Map & Info */}
      <section className="container mx-auto max-w-[95%] px-4 md:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Counties: Pride of Central Equatoria</h2>
          <p className="text-gray-600">
            Six counties, each with unique heritage, natural resources, and communities that make Central Equatoria State truly special.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Map Column */}
           <div className="lg:col-span-7 h-[300px] md:h-[400px] lg:h-[600px]">
              <CountyMap />
           </div>

           {/* Info Column */}
           <div className="lg:col-span-5 flex flex-col">
              {/* Horizontal Scrollable Tabs */}
              <div className="flex overflow-x-auto pb-4 space-x-2 scrollbar-hide mb-4 -mx-4 px-4 md:mx-0 md:px-0">
                {COUNTIES.map((county) => (
                  <button
                    key={county.id}
                    onClick={() => setActiveCounty(county)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCounty.id === county.id
                        ? 'bg-[#00a898] text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {county.name}
                  </button>
                ))}
              </div>

              {/* County Detail Card */}
              <Card className="flex-grow overflow-hidden flex flex-col shadow-lg border-t-0">
                <div className={`p-6 ${activeCounty.bgColor}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{activeCounty.name}</h3>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Capital: {activeCounty.capital}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800 shadow-sm">
                      Pop: {activeCounty.population}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {activeCounty.description}
                  </p>
                </div>
                
                <CardContent className="flex-grow bg-white">
                  <h4 className="font-semibold text-gray-900 mb-4">Key Highlights</h4>
                  <div className="space-y-3">
                    {activeCounty.highlights.map((highlight, index) => (
                      <div key={index} className={`p-4 rounded-lg ${highlightColors[index % highlightColors.length]} flex items-start space-x-3`}>
                         <div className="mt-1 bg-white p-1.5 rounded-md shadow-sm">
                           {getIcon(highlight.iconName)}
                         </div>
                         <div>
                           <h5 className="font-semibold text-gray-900 text-sm">{highlight.title}</h5>
                           <p className="text-gray-600 text-xs md:text-sm">{highlight.description}</p>
                         </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
           </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
