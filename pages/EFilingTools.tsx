import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LayoutGrid } from 'lucide-react';
import { Button } from '../components/ui';
import { GovernmentToolsSection } from '../components/GovernmentToolsSection';

const EFilingTools = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-6">
          <div className="space-y-2">
            <Link
              to="/portal"
              className="inline-flex items-center text-sm text-[#00a898] hover:text-[#008f81] font-medium transition-colors"
            >
              <ArrowLeft size={16} className="mr-1.5" />
              Back to CES eGovernment Portal
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">eFiling Tools</h1>
            <p className="text-gray-600 max-w-2xl">
              Direct access to Central Equatoria State digital utilities, land registry systems, verification tools, and eFiling resources.
            </p>
          </div>
          <Link to="/portal">
            <Button className="inline-flex items-center gap-2">
              <LayoutGrid size={18} />
              Open eFiling Services
            </Button>
          </Link>
        </div>

        <GovernmentToolsSection />
      </div>
    </div>
  );
};

export default EFilingTools;
