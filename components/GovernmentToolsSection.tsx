import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Building2,
  Calculator,
  FileCheck,
  Calendar,
  CreditCard,
  FileText,
  Search,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent } from './ui';

interface ToolItem {
  name: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  link: string;
  description: string;
  external?: boolean;
}

export const GOVERNMENT_TOOLS: ToolItem[] = [
  {
    name: "CESLand Citizen Land Registry Portal",
    icon: MapPin,
    link: "https://cesland-citizen.supiritechnologies.com/",
    description: "Verify land titles, search parcel records, and access citizen registry services",
    external: true
  },
  {
    name: "CESLand Land Management System",
    icon: Building2,
    link: "https://cesland-cesgov.supiritechnologies.com/",
    description: "Government platform for state land administration and parcel management",
    external: true
  },
  {
    name: "Tax Calculator",
    icon: Calculator,
    link: "/portal/tools/tax-calculator",
    description: "Calculate your tax obligations"
  },
  {
    name: "Document Verification",
    icon: FileCheck,
    link: "/portal/tools/verification",
    description: "Verify government documents"
  },
  {
    name: "Appointment Scheduler",
    icon: Calendar,
    link: "/portal/tools/appointments",
    description: "Schedule government appointments"
  },
  {
    name: "Payment Portal",
    icon: CreditCard,
    link: "/payment",
    description: "Make online payments"
  },
  {
    name: "Forms Library",
    icon: FileText,
    link: "/documents",
    description: "Download government forms"
  },
  {
    name: "Service Directory",
    icon: Search,
    link: "/services",
    description: "Find government services"
  }
];

export const GovernmentToolsSection = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">CES Government Tools & Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GOVERNMENT_TOOLS.map((tool, idx) => {
          const cardContent = (
            <Card className="h-full border border-gray-100 shadow-sm hover:border-[#00a898]/50 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#f0f9f1] flex items-center justify-center text-[#00a898] shrink-0">
                  <tool.icon size={24} strokeWidth={2} />
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-gray-900 text-base flex items-center gap-1.5">
                    <span>{tool.name}</span>
                    {tool.external && <ExternalLink size={14} className="text-[#00a898] shrink-0" />}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                </div>
              </CardContent>
            </Card>
          );

          return tool.external ? (
            <a
              key={idx}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full block"
            >
              {cardContent}
            </a>
          ) : (
            <Link key={idx} to={tool.link} className="h-full">
              {cardContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
