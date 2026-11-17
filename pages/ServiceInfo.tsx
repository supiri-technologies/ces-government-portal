
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FileText, CheckCircle2, DollarSign, HelpCircle, 
  Printer, ArrowRight, ChevronLeft, Download, ShieldCheck, 
  Clock, Info, LayoutGrid
} from 'lucide-react';
import { Card, CardContent, Button } from '../components/ui';

// Mock Data for the Bridge Page Content
const SERVICE_DETAILS: Record<string, any> = {
  'birth-certificate': {
    title: "Birth Certificate",
    category: "Civil Documentation",
    description: "An official government document that records the birth of a child. It is the primary identification document required for obtaining a National ID, Passport, and school enrollment.",
    eligibility: [
      "Children born within Central Equatoria State.",
      "Children born to parents who are South Sudanese nationals.",
      "Applications must be made by a parent or legal guardian for minors."
    ],
    fees: [
      { type: "Application Fee", amount: "500 SSP" },
      { type: "Processing Fee", amount: "Included" },
      { type: "Late Registration Penalty", amount: "1,000 SSP (if > 1 year)" }
    ],
    documents: [
      "Notification of Birth (from Hospital/Midwife)",
      "National ID or Passport of Father",
      "National ID or Passport of Mother",
      "Marriage Certificate of Parents (Optional)",
      "Two (2) recent passport-size photos of the child"
    ],
    guidance: [
      "Ensure all names are spelled correctly as they appear on supporting documents.",
      "If the birth occurred at home, a letter from the Payam Administrator is required.",
      "Payment must be made via the CASHIT platform for online applications.",
      "Processing takes approximately 2-3 working days."
    ]
  },
  'business-registration': {
    title: "Business Registration",
    category: "Business Services",
    description: "Formal registration of a business entity within the state. This legalizes your operations and allows you to open bank accounts, bid for tenders, and obtain trade licenses.",
    eligibility: [
      "South Sudanese nationals aged 18 and above.",
      "Foreign nationals with valid residency and work permits.",
      "Registered companies wishing to open branches in CES."
    ],
    fees: [
      { type: "Name Search", amount: "1,000 SSP" },
      { type: "Registration Fee", amount: "5,000 SSP" },
      { type: "Stamp Duty", amount: "Varies by Capital" }
    ],
    documents: [
      "Memorandum and Articles of Association",
      "Copies of IDs/Passports of all Directors/Shareholders",
      "Tax Identification Number (TIN)",
      "Proof of Business Address (Tenancy Agreement/Title Deed)",
      "Recent passport photos of Directors"
    ],
    guidance: [
      "Conduct a name search first to ensure your desired business name is available.",
      "All foreign directors must provide valid copies of their passports and visas.",
      "The Memorandum must be signed by all shareholders.",
      "Certificates are issued digitally upon approval."
    ]
  },
  'default': {
    title: "Service Information",
    category: "Government Service",
    description: "Information regarding this specific government service. Please review the requirements below before proceeding.",
    eligibility: [
      "Residents of Central Equatoria State.",
      "Valid identification required."
    ],
    fees: [
      { type: "Standard Fee", amount: "Check Ministry Guidelines" }
    ],
    documents: [
      "National ID / Passport",
      "Relevant Supporting Letters",
      "Passport-sized Photos"
    ],
    guidance: [
      "Complete all sections of the form accurately.",
      "Attach clear copies of required documents.",
      "Pay applicable fees using supported payment methods."
    ]
  }
};

const ServiceInfo = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'fees' | 'documents' | 'guidance'>('overview');

  // Get data or fallback
  const data = SERVICE_DETAILS[slug || 'default'] || SERVICE_DETAILS['default'];

  // Helper to handle "File Online" click
  const handleFileOnline = () => {
    // Navigate to login, passing the intended destination
    navigate(`/auth/signin?redirect=/portal/efiling/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Header */}
      <div className="bg-[#00a898] text-white pt-12 pb-24 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-[95%] relative z-10">
          <Link to="/portal" className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-colors">
            <ChevronLeft size={20} className="mr-1" /> Back to Portal
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10">
                  {data.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h1>
              <p className="text-green-50 max-w-2xl text-lg leading-relaxed opacity-90">
                {data.description}
              </p>
            </div>
            {/* Icon decoration */}
            <div className="hidden md:block opacity-20 transform scale-150 p-4 bg-white rounded-full text-[#00a898]">
               <FileText size={64} />
            </div>
          </div>
        </div>
        
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-16 -mb-16 pointer-events-none"></div>
      </div>

      <div className="container mx-auto max-w-[95%] px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Info Tabs */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-t-4 border-t-[#00a898]">
              {/* Tab Navigation */}
              <div className="flex overflow-x-auto border-b border-gray-100 scrollbar-hide">
                {[
                  { id: 'overview', label: 'Overview', icon: Info },
                  { id: 'eligibility', label: 'Eligibility', icon: CheckCircle2 },
                  { id: 'fees', label: 'Fees', icon: DollarSign },
                  { id: 'documents', label: 'Required Docs', icon: FileText },
                  { id: 'guidance', label: 'Guidance', icon: HelpCircle },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                      activeTab === tab.id
                        ? 'border-[#00a898] text-[#00a898] bg-green-50/30'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <CardContent className="p-6 md:p-8 min-h-[300px]">
                {activeTab === 'overview' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <h3 className="text-xl font-bold text-gray-900">About this Service</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {data.description}
                    </p>
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3 mt-4">
                      <Clock className="text-blue-600 shrink-0 mt-0.5" size={20} />
                      <div>
                        <h4 className="font-bold text-blue-900 text-sm">Processing Time</h4>
                        <p className="text-blue-800 text-sm">Typically processed within 2-5 working days after submission of all required documents.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'eligibility' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <h3 className="text-xl font-bold text-gray-900">Who can apply?</h3>
                    <ul className="space-y-3">
                      {data.eligibility.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 size={18} className="text-[#00a898] mr-3 mt-0.5 shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'fees' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <h3 className="text-xl font-bold text-gray-900">Filing Fees</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3">Fee Description</th>
                            <th className="px-4 py-3 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {data.fees.map((fee: any, idx: number) => (
                            <tr key={idx} className="hover:bg-gray-50/50">
                              <td className="px-4 py-3 text-gray-700">{fee.type}</td>
                              <td className="px-4 py-3 text-right font-medium text-gray-900">{fee.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      * Fees are subject to change. Online payments accept Mobile Money and Credit Cards via CASHIT.
                    </p>
                  </div>
                )}

                {activeTab === 'documents' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <h3 className="text-xl font-bold text-gray-900">Required Documents</h3>
                    <p className="text-sm text-gray-600 mb-4">You will need to scan and upload the following documents (for online filing) or bring physical copies (for in-person filing).</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {data.documents.map((doc: string, idx: number) => (
                        <li key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-700">
                          <FileText size={16} className="text-gray-400 mr-2" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'guidance' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <h3 className="text-xl font-bold text-gray-900">Filing Guidance</h3>
                    <div className="space-y-4">
                      {data.guidance.map((step: string, idx: number) => (
                        <div key={idx} className="flex">
                          <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-[#00a898] text-white font-bold text-sm mr-4">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="text-gray-700 mt-1">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Action Cards */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Option 1: File Online */}
            <Card className="border-2 border-[#00a898] relative overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="absolute top-0 right-0 bg-[#00a898] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                RECOMMENDED
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-[#00a898]">
                  <LayoutGrid size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">File Online</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Submit your application digitally, pay securely, and track progress from your dashboard.
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center"><CheckCircle2 size={14} className="text-green-500 mr-2" /> Faster processing</li>
                  <li className="flex items-center"><CheckCircle2 size={14} className="text-green-500 mr-2" /> 24/7 Access</li>
                  <li className="flex items-center"><CheckCircle2 size={14} className="text-green-500 mr-2" /> Real-time tracking</li>
                </ul>
                <Button onClick={handleFileOnline} className="w-full text-base py-6 shadow-md">
                  Log In to File Online <ArrowRight size={18} className="ml-2" />
                </Button>
                <p className="text-xs text-center text-gray-400">Requires a registered account</p>
              </CardContent>
            </Card>

            {/* Option 2: In Person */}
            <Card className="border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                  <Printer size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Print & File in Person</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Download the blank form, fill it manually, and submit it at the relevant ministry office.
                  </p>
                </div>
                <Link to="/documents">
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-white">
                    <Download size={18} className="mr-2" /> Go to Forms Library
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Security Note */}
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
               <ShieldCheck className="text-green-600 shrink-0" size={20} />
               <p className="text-xs text-gray-500 leading-relaxed">
                 <span className="font-bold text-gray-700 block mb-1">Secure & Official</span>
                 All services on this portal are official government processes. Your data is protected.
               </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
