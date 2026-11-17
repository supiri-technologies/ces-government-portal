
import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  LayoutGrid, 
  Calculator, 
  CheckCircle2, 
  Calendar, 
  CreditCard, 
  ChevronRight,
  ArrowLeft,
  MapPin,
  Building2,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, Button } from '../components/ui';

const tools = [
  {
    id: 'egov-portal',
    title: 'CES eGovernment Portal',
    description: 'Access the main digital gateway for all Central Equatoria State government services, applications, and tracking.',
    icon: LayoutGrid,
    link: '/portal',
    color: 'bg-emerald-50 text-emerald-600',
    btnColor: 'bg-emerald-600 hover:bg-emerald-700'
  },
  {
    id: 'cesland-citizen',
    title: 'CESLand Citizen Land Registry Portal',
    description: 'Verify land titles, search parcel records, track property registrations, and access citizen land registry services online.',
    icon: MapPin,
    link: 'https://cesland-citizen.supiritechnologies.com/',
    external: true,
    color: 'bg-teal-50 text-teal-600',
    btnColor: 'bg-teal-600 hover:bg-teal-700'
  },
  {
    id: 'cesland-management',
    title: 'CESLand Land Management System',
    description: 'Official Central Equatoria State platform for state land administration, parcel mapping, surveying, and registry management.',
    icon: Building2,
    link: 'https://cesland-cesgov.supiritechnologies.com/',
    external: true,
    color: 'bg-indigo-50 text-indigo-600',
    btnColor: 'bg-indigo-600 hover:bg-indigo-700'
  },
  {
    id: 'tax-calculator',
    title: 'Tax & Revenue Calculator',
    description: 'Estimate your personal or business tax obligations and other state-mandated revenue payments.',
    icon: Calculator,
    link: '/portal/tools/tax-calculator',
    color: 'bg-blue-50 text-blue-600',
    btnColor: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    id: 'doc-verification',
    title: 'Document Verification',
    description: 'Verify the authenticity of state-issued documents, licenses, and certificates using our secure validation system.',
    icon: CheckCircle2,
    link: '/portal/tools/verification',
    color: 'bg-purple-50 text-purple-600',
    btnColor: 'bg-purple-600 hover:bg-purple-700'
  },
  {
    id: 'appointment-scheduler',
    title: 'Appointment Scheduler',
    description: 'Book and manage appointments with various state ministries and government departments online.',
    icon: Calendar,
    link: '/portal/tools/appointments',
    color: 'bg-orange-50 text-orange-600',
    btnColor: 'bg-orange-600 hover:bg-orange-700'
  },
  {
    id: 'payment-portal',
    title: 'State Payment Portal',
    description: 'Securely pay for government services, fines, and fees using multiple payment methods including mobile money.',
    icon: CreditCard,
    link: '/payment',
    color: 'bg-sky-50 text-sky-600',
    btnColor: 'bg-sky-600 hover:bg-sky-700'
  }
];

const SelfServiceTools = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-16">
        <div className="container mx-auto max-w-[95%] px-4 md:px-8">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-[#00a898] mb-8 transition-colors group">
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
            Back to Home
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">
              Self-Service Tools
            </h1>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              Empowering the citizens of Central Equatoria State with direct access to digital government infrastructure. 
              Select a tool below to begin.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto max-w-[95%] px-4 md:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col">
                <CardContent className="p-8 flex flex-col flex-grow">
                  <div className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <tool.icon size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#00a898] transition-colors">
                    {tool.title}
                  </h3>
                  
                  <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                    {tool.description}
                  </p>
                  
                  {'external' in tool && tool.external ? (
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto"
                    >
                      <Button className={`w-full ${tool.btnColor} text-white py-6 rounded-xl transition-all flex items-center justify-center group/btn`}>
                        Open Portal
                        <ExternalLink className="ml-2 group-hover/btn:translate-x-0.5 transition-transform" size={18} />
                      </Button>
                    </a>
                  ) : (
                    <Link to={tool.link} className="mt-auto">
                      <Button className={`w-full ${tool.btnColor} text-white py-6 rounded-xl transition-all flex items-center justify-center group/btn`}>
                        Launch Tool
                        <ChevronRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={20} />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="container mx-auto max-w-[95%] px-4 md:px-8 mt-20">
        <div className="bg-[#00a898] rounded-[2rem] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-32 -mt-32" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need assistance?</h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              If you encounter any issues while using our digital tools or need guidance on which service 
              is right for you, our support team is ready to help.
            </p>
            <Link to="/contact">
              <Button className="bg-white text-[#00a898] hover:bg-gray-100 px-8 py-6 rounded-xl font-bold">
                Contact Support Center
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfServiceTools;
