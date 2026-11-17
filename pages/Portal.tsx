
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, FileText, Briefcase, Heart, GraduationCap, Home, Scale, ChevronRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent, Button } from '../components/ui';
import { GovernmentToolsSection } from '../components/GovernmentToolsSection';

const Portal = () => {
  const eFilingCategories = [
    { title: "Civil Documentation", icon: FileText, color: "text-blue-600", bg: "bg-blue-50", items: [
      { name: "Birth Certificate", price: "500 SSP" }, { name: "Marriage Certificate", price: "1,000 SSP" }, { name: "National ID", price: "300 SSP" }, { name: "Death Certificate", price: "500 SSP" }
    ]},
    { title: "Business Services", icon: Briefcase, color: "text-green-600", bg: "bg-green-50", items: [
      { name: "Business Registration", price: "5,000 SSP" }, { name: "Trade License", price: "3,000 SSP" }, { name: "Tax Registration", price: "1,000 SSP" }
    ]},
    { title: "Healthcare Services", icon: Heart, color: "text-red-600", bg: "bg-red-50", items: [
      { name: "Health Insurance", price: "Free" }, { name: "Medical Records", price: "200 SSP" }, { name: "Clinic Registration", price: "10,000 SSP" }
    ]},
    { title: "Education Services", icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50", items: [
      { name: "School Enrollment", price: "Free" }, { name: "Scholarship Application", price: "Free" }, { name: "Exam Results", price: "100 SSP" }
    ]},
    { title: "Land & Housing", icon: Home, color: "text-orange-600", bg: "bg-orange-50", items: [
      { name: "Land Registration", price: "15,000 SSP" }, { name: "Building Permit", price: "7,500 SSP" }, { name: "Property Transfer", price: "10,000 SSP" }
    ]},
    { title: "Legal Services", icon: Scale, color: "text-indigo-600", bg: "bg-indigo-50", items: [
      { name: "Court Filing", price: "2,000 SSP" }, { name: "Legal Aid", price: "Free" }, { name: "Notary Services", price: "500 SSP" }
    ]},
  ];


  // Helper to slugify service names
  const getSlug = (name: string) => name.toLowerCase().replace(/ /g, '-');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-8 space-y-10">
        
        {/* Navigation Back */}
        <div>
            <Link to="/" className="inline-flex items-center text-[#00a898] hover:text-[#008f81] font-medium transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                To CES Government Website
            </Link>
        </div>

        {/* Description Box - Full Width */}
        <div className="w-full text-gray-600 text-sm space-y-4 bg-white p-6 rounded-lg border border-gray-100 shadow-sm leading-relaxed">
           <h2 className="font-semibold text-gray-900 text-lg mb-2">Welcome to the CES eGovernment Platform</h2>
           <p>The Self-Service Portal is Central Equatoria State's comprehensive digital platform designed to bring government services directly to citizens. This innovative system enables residents to access essential government services online, eliminating the need for long queues and multiple office visits. Whether you need to apply for civil documentation, register a business, request healthcare services, or access educational resources, our portal provides a secure, efficient, and user-friendly gateway to all state government services.</p>
           <p>Through this portal, citizens can submit applications electronically (eFiling), track the status of their requests in real-time, make secure online payments, and access a comprehensive library of government resources and tools. The platform represents the Central Equatoria State Government's commitment to modernizing public service delivery, improving transparency, and making government more accessible to all residents of South Sudan's Central Equatoria State.</p>
        </div>

        {/* Auth Notice */}
        <Card className="border-l-4 border-l-[#00a898]" noShadow>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-full text-[#00a898] mt-1 shrink-0">
                  <LayoutGrid size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Sign In Required for eFiling & Case Management</h3>
                  <p className="text-sm text-gray-600 mt-1">To access eFiling services, manage your cases, and track applications, please sign in to your account. Don't have an account? Create one to get started with online government services.</p>
                </div>
              </div>
              <div className="flex gap-3 pl-0 sm:pl-[56px]">
                <Link to="/auth/signin"><Button size="sm">Sign In</Button></Link>
                <Link to="/auth/signup"><Button variant="outline" size="sm">Create Account</Button></Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* eFiling Services */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Available eFiling Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {eFilingCategories.map((cat, idx) => (
               <Card key={idx} className="h-full border-none shadow-sm">
                 <CardContent className="p-6">
                   {/* Header */}
                   <div className="flex items-center space-x-4 mb-6">
                     <div className={`p-3 rounded-xl ${cat.bg} ${cat.color}`}>
                       <cat.icon size={24} />
                     </div>
                     <h3 className="font-bold text-lg text-gray-900">{cat.title}</h3>
                   </div>
                   
                   {/* Items List */}
                   <div className="space-y-3">
                     {cat.items.map((item, i) => (
                       <div key={i} className="group flex items-center justify-between py-3 px-4 bg-white border border-gray-100 rounded-xl hover:border-[#00a898] hover:shadow-sm hover:bg-[#dff1f0] transition-all duration-200">
                         <Link to={`/portal/service-info/${getSlug(item.name)}`} className="flex items-center space-x-1 text-[#00a898] font-semibold text-sm hover:underline decoration-[#00a898] underline-offset-2 flex-grow">
                           <span>{item.name}</span>
                           <ChevronRight size={14} className="text-gray-300 group-hover:text-[#00a898] transition-colors" />
                         </Link>
                         <span className="px-3 py-1 bg-gray-100 text-gray-900 text-xs font-bold rounded-lg shrink-0 ml-2 group-hover:bg-white/50 transition-colors">
                           {item.price}
                         </span>
                       </div>
                     ))}
                   </div>
                 </CardContent>
               </Card>
             ))}
          </div>
        </div>

        {/* Tools */}
        <GovernmentToolsSection />

      </div>
    </div>
  );
};

export default Portal;
