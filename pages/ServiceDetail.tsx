import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Briefcase, CheckCircle2, Clock, DollarSign, FileText, 
  HelpCircle, ChevronRight, Phone, Heart, GraduationCap, 
  Home, Scale, ExternalLink 
} from 'lucide-react';
import { Card, CardContent, Button } from '../components/ui';

// Mock data for all service categories
const SERVICE_DATA: any = {
  business: {
    title: "Business Registration",
    icon: Briefcase,
    description: "Register your business legally in Central Equatoria State.",
    steps: [
      { title: "Name Search", fee: "1,000 SSP", time: "1 Day" },
      { title: "Document Submission", fee: "Free", time: "1 Day" },
      { title: "Payment Verification", fee: "Varies", time: "Instant" },
      { title: "Certificate Issuance", fee: "Free", time: "2 Days" },
    ],
    types: [
      { name: "Sole Proprietorship", reqs: ["ID Copy", "Passport Photo", "Tax ID"] },
      { name: "Partnership", reqs: ["Partnership Deed", "IDs of Partners", "Tax ID"] },
      { name: "Limited Company", reqs: ["Memorandum", "Articles of Association", "Director IDs"] },
    ],
    support: ["Legal Aid", "Tax Consultancy", "Business Hub"]
  },
  civil: {
    title: "Civil Documentation",
    icon: FileText,
    description: "Apply for essential civil documents including birth certificates and ID cards.",
    steps: [
      { title: "Form Completion", fee: "Free", time: "30 Mins" },
      { title: "Biometric Capture", fee: "Free", time: "1 Day" },
      { title: "Verification", fee: "500 SSP", time: "2 Days" },
      { title: "Collection", fee: "Free", time: "1 Week" },
    ],
    types: [
      { name: "Birth Certificate", reqs: ["Hospital Notification", "Parents' IDs", "Witnesses"] },
      { name: "National ID", reqs: ["Birth Certificate", "Proof of Residence", "Passport Photos"] },
      { name: "Marriage Certificate", reqs: ["IDs of Spouses", "Witnesses", "Religious Cert"] },
    ],
    support: ["Legal Counsel", "Translation Services", "Urgent Processing"]
  },
  health: {
    title: "Healthcare Services",
    icon: Heart,
    description: "Access public health facilities, medical records, and health programs.",
    steps: [
      { title: "Registration", fee: "200 SSP", time: "Instant" },
      { title: "Consultation", fee: "Varies", time: "1-3 Hours" },
      { title: "Laboratory", fee: "Varies", time: "Same Day" },
      { title: "Pharmacy", fee: "Varies", time: "Instant" },
    ],
    types: [
      { name: "General Checkup", reqs: ["Health Card", "ID Card", "Previous Records"] },
      { name: "Immunization", reqs: ["Child Health Card", "Birth Record", "Parent ID"] },
      { name: "Specialist Referral", reqs: ["Referral Letter", "Medical History", "Insurance"] },
    ],
    support: ["Emergency Response", "Health Insurance", "Maternal Care"]
  },
  education: {
    title: "Education Services",
    icon: GraduationCap,
    description: "School enrollment, scholarship applications, and examination services.",
    steps: [
      { title: "Application", fee: "Free", time: "1 Day" },
      { title: "Assessment", fee: "1,500 SSP", time: "3 Days" },
      { title: "Placement", fee: "Free", time: "1 Week" },
      { title: "Enrollment", fee: "Varies", time: "1 Day" },
    ],
    types: [
      { name: "Primary Enrollment", reqs: ["Birth Certificate", "Immunization Card", "Parent ID"] },
      { name: "Secondary Admission", reqs: ["Primary Results", "Leaving Certificate", "ID"] },
      { name: "Scholarships", reqs: ["Academic Records", "Financial Proof", "Recommendation"] },
    ],
    support: ["Career Guidance", "Special Education", "Student Loans"]
  },
  land: {
    title: "Land & Housing",
    icon: Home,
    description: "Manage land titles, property transfers, and housing permits.",
    steps: [
      { title: "Search", fee: "2,000 SSP", time: "2 Days" },
      { title: "Survey", fee: "5,000 SSP", time: "3 Days" },
      { title: "Valuation", fee: "Varies", time: "1 Week" },
      { title: "Title Transfer", fee: "Varies", time: "2 Weeks" },
    ],
    types: [
      { name: "Title Deed", reqs: ["Sale Agreement", "Survey Map", "ID Copies"] },
      { name: "Building Permit", reqs: ["Architectural Plans", "Land Title", "EIA Report"] },
      { name: "Property Lease", reqs: ["Lease Agreement", "Ground Rent Receipt", "ID"] },
    ],
    support: ["Land Dispute Resolution", "Urban Planning", "Housing Finance"]
  },
  legal: {
    title: "Legal Services",
    icon: Scale,
    description: "Access legal aid, court information, and justice system resources.",
    steps: [
      { title: "Consultation", fee: "Varies", time: "1 Day" },
      { title: "Filing", fee: "Varies", time: "1 Day" },
      { title: "Hearing", fee: "Free", time: "Scheduled" },
      { title: "Judgment", fee: "Free", time: "Varies" },
    ],
    types: [
      { name: "Legal Aid", reqs: ["Proof of Income", "Case Details", "ID Card"] },
      { name: "Notary Services", reqs: ["Original Documents", "ID Card", "Witnesses"] },
      { name: "Court Filing", reqs: ["Plaint/Petition", "Supporting Docs", "Filing Fee"] },
    ],
    support: ["Human Rights Office", "Mediation Center", "Victim Support"]
  }
};

const ServiceDetail = () => {
  const { category } = useParams<{category: string}>();
  const data = SERVICE_DATA[category || 'business'];
  
  if (!data) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Service Not Found</h1>
        <p className="text-gray-600 mt-2">The requested service category does not exist.</p>
        <Link to="/services" className="text-[#00a898] mt-4 inline-block hover:underline">
          Return to Services
        </Link>
      </div>
    );
  }

  const Icon = data.icon;

  return (
    <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-12 space-y-10">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-4 bg-[#f0f9f1] rounded-xl text-[#00a898]">
          <Icon size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
          <p className="text-gray-600">{data.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {data.steps.map((step: any, idx: number) => (
          <Card key={idx} className="bg-gray-50">
            <CardContent className="p-6">
              <div className="text-xs font-bold text-[#00a898] uppercase tracking-wider mb-2">Step {idx + 1}</div>
              <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
              <div className="flex justify-between text-xs text-gray-500">
                <span className="flex items-center"><DollarSign size={12} className="mr-1"/> {step.fee}</span>
                <span className="flex items-center"><Clock size={12} className="mr-1"/> {step.time}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <section>
             <h2 className="text-xl font-bold text-gray-900 mb-4">Registration Types</h2>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.types.map((type: any, idx: number) => (
                  <Card key={idx}>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-gray-900 mb-3">{type.name}</h3>
                      <ul className="space-y-2">
                        {type.reqs.map((r: string, i: number) => (
                          <li key={i} className="flex items-start text-sm text-gray-600">
                            <CheckCircle2 size={14} className="text-[#00a898] mr-2 mt-0.5 shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
             </div>
           </section>

           <Card className="bg-[#f0f9f1] border border-green-100" noShadow>
             <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to apply?</h3>
                  <p className="text-gray-700">Start your application online via the Self-Service Portal.</p>
                </div>
                <Link to="/portal">
                  <Button size="lg">Start Registration</Button>
                </Link>
             </CardContent>
           </Card>

           {category === 'land' && (
             <section className="space-y-4">
               <h2 className="text-xl font-bold text-gray-900">CESLand Digital Portals</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <a
                   href="https://cesland-citizen.supiritechnologies.com/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block"
                 >
                   <Card className="h-full hover:border-[#00a898]/40 transition-all">
                     <CardContent className="p-6 space-y-2">
                       <div className="flex items-center justify-between">
                         <h3 className="font-bold text-gray-900">CESLand Citizen Land Registry Portal</h3>
                         <ExternalLink size={16} className="text-[#00a898] shrink-0" />
                       </div>
                       <p className="text-sm text-gray-600">Search parcel records, verify land titles, and access citizen land registry services.</p>
                     </CardContent>
                   </Card>
                 </a>
                 <a
                   href="https://cesland-cesgov.supiritechnologies.com/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block"
                 >
                   <Card className="h-full hover:border-[#00a898]/40 transition-all">
                     <CardContent className="p-6 space-y-2">
                       <div className="flex items-center justify-between">
                         <h3 className="font-bold text-gray-900">CESLand Land Management System</h3>
                         <ExternalLink size={16} className="text-[#00a898] shrink-0" />
                       </div>
                       <p className="text-sm text-gray-600">Official Central Equatoria State platform for land administration and parcel management.</p>
                     </CardContent>
                   </Card>
                 </a>
               </div>
             </section>
           )}
        </div>

        <div className="space-y-6">
           <Card>
             <CardContent className="p-6">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                 <HelpCircle size={18} className="mr-2 text-blue-500" /> Need Assistance?
               </h3>
               <p className="text-sm text-gray-600 mb-4">
                 Our support team can guide you through the process.
               </p>
               <Button variant="outline" className="w-full justify-center">
                 <Phone size={16} className="mr-2" /> Contact Support
               </Button>
             </CardContent>
           </Card>
           
           <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Related Support</h4>
              {data.support.map((s: string, i: number) => (
                <div key={i} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-[#00a898] mr-3"></div>
                  <span className="text-sm text-gray-700">{s}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;