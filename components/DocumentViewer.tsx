
import React, { useEffect, useState } from 'react';
import { X, Printer, Download, FileCheck } from 'lucide-react';
import { Button } from './ui';
import { Document } from '../types';
import { jsPDF } from 'jspdf';

interface DocumentViewerProps {
  document: Document;
  onClose: () => void;
}

// --- Theme Configuration ---

interface DocTheme {
  primary: string; // Hex code for primary color (borders, text)
  secondary: string; // Hex code for secondary/background tints
  text: string; // Tailwind class for text color
  border: string; // Tailwind class for border color
  bg: string; // Tailwind class for background
  rgb: [number, number, number]; // RGB array for jsPDF
}

const getTheme = (category: string): DocTheme => {
  // Executive Order - Gold / Authority Theme
  if (category === 'Executive Order') {
    return {
      primary: '#B8860B', // Dark Goldenrod
      secondary: '#F9F5D7', // Light Gold/Beige
      text: 'text-[#B8860B]',
      border: 'border-[#B8860B]',
      bg: 'bg-[#FFFAF0]',
      rgb: [184, 134, 11]
    };
  }
  // Cabinet Resolutions - Royal Blue / Formal Theme
  if (category === 'Cabinet Resolutions') {
    return {
      primary: '#1E40AF', // Blue 800
      secondary: '#DBEAFE', // Blue 100
      text: 'text-[#1E40AF]',
      border: 'border-[#1E40AF]',
      bg: 'bg-[#EFF6FF]',
      rgb: [30, 64, 175]
    };
  }
  // Directive - Crimson Red / Urgent Theme
  if (category === 'Directive') {
    return {
      primary: '#DC2626', // Red 600
      secondary: '#FEE2E2', // Red 100
      text: 'text-[#DC2626]',
      border: 'border-[#DC2626]',
      bg: 'bg-[#FEF2F2]',
      rgb: [220, 38, 38]
    };
  }
  // Default - CES Teal
  return {
    primary: '#00a898',
    secondary: '#d2f2d4',
    text: 'text-[#00a898]',
    border: 'border-[#00a898]',
    bg: 'bg-[#f0f9f1]',
    rgb: [0, 168, 152]
  };
};

// --- Types for Structured Content ---

type FieldType = 'section' | 'input' | 'textarea' | 'checkbox' | 'row';

interface FormField {
  type: FieldType;
  number?: string;
  label?: string;
  title?: string; // For sections
  options?: string[]; // For checkboxes
  fields?: FormField[]; // For rows
  required?: boolean;
  rows?: number;
  placeholder?: string;
}

interface ReportItem {
  type: 'paragraph' | 'list' | 'table' | 'header';
  text?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

interface DocData {
  type: 'form' | 'report';
  ministry: string;
  title: string;
  refNo: string;
  date: string;
  fee?: string;
  time?: string;
  // Form Data
  formFields?: FormField[];
  // Report Data
  reportContent?: ReportItem[];
  reportSignature?: { title: string; name: string };
}

// --- Helper Components for UI Rendering ---

const Logo = ({ theme }: { theme: DocTheme }) => (
  <div 
    className="w-24 h-24 rounded-full border-4 flex items-center justify-center bg-white mb-2 mx-auto"
    style={{ borderColor: theme.primary }}
  >
    <div className="text-center leading-none">
      <div className="text-xl font-black text-gray-900">CES</div>
      <div 
        className="text-[0.5rem] font-bold uppercase tracking-wider mt-1"
        style={{ color: theme.primary }}
      >
        South Sudan
      </div>
    </div>
  </div>
);

const FormHeader = ({ ministry, theme }: { ministry: string, theme: DocTheme }) => (
  <div className="text-center mb-6">
    <Logo theme={theme} />
    <h1 className="text-xl md:text-3xl font-black text-gray-900 uppercase tracking-wide mb-1">Republic of South Sudan</h1>
    <h2 
      className="text-lg md:text-2xl font-bold uppercase tracking-widest mb-2"
      style={{ color: theme.primary }}
    >
      Central Equatoria State
    </h2>
    <h3 className="text-base md:text-xl font-bold text-gray-800">{ministry}</h3>
    <div className="text-xs md:text-sm text-gray-600 mt-2">
      P.O. Box 12345, Juba, South Sudan<br/>
      Tel: +211 920 000 000 | Email: info@ces.gov.ss
    </div>
    <div className="w-full h-1.5 mt-6" style={{ backgroundColor: theme.primary }}></div>
  </div>
);

const FormTitleBox = ({ title, refNo, date, theme }: { title: string, refNo: string, date: string, theme: DocTheme }) => (
  <div className={`border p-4 md:p-6 mb-6 rounded-sm`} style={{ backgroundColor: theme.secondary + '20', borderColor: theme.secondary }}>
    <h2 className="text-lg md:text-2xl font-black text-gray-900 uppercase mb-2">{title}</h2>
    <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
      <div className="font-medium text-gray-700">
        Form Reference Number: <span className="font-bold" style={{ color: theme.primary }}>{refNo}</span>
      </div>
      <div className="font-medium text-gray-700 mt-2 sm:mt-0">
        Date Issued: {date}
      </div>
    </div>
  </div>
);

const InstructionsBox = () => (
  <div className="bg-[#fefce8] border-l-4 border-yellow-400 p-4 mb-8 text-sm text-gray-800">
    <span className="font-bold">INSTRUCTIONS:</span> Please complete all sections in CAPITAL LETTERS using black ink. 
    Attach required documents as listed in the requirements section. Incomplete forms may be rejected.
  </div>
);

// --- UI Renderers for Fields ---

const RenderField: React.FC<{ field: FormField, theme: DocTheme }> = ({ field, theme }) => {
  if (field.type === 'section') {
    return (
      <div className="mb-6 mt-8">
        <h3 
          className="text-base md:text-lg font-bold text-gray-900 uppercase border-b-2 pb-1 inline-block pr-8"
          style={{ borderColor: theme.primary }}
        >
          {field.title}
        </h3>
        <div className="border-b border-gray-200 mt-[-2px]"></div>
      </div>
    );
  }

  if (field.type === 'row') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
        {field.fields?.map((f, i) => <RenderField key={i} field={f} theme={theme} />)}
      </div>
    );
  }

  if (field.type === 'input') {
    return (
      <div className="mb-6">
        <div className="flex items-baseline mb-1">
          <span className="font-bold text-sm mr-2">{field.number}.</span>
          <span className="font-bold text-sm text-gray-900 uppercase">{field.label}</span>
          {field.required && <span className="text-red-500 ml-1 font-bold">*</span>}
        </div>
        <div className="w-full border-b border-gray-800 h-8 flex items-end">
            {field.placeholder && <span className="text-gray-500 text-sm font-medium">{field.placeholder}</span>}
        </div>
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div className="mb-6">
        <div className="flex items-baseline mb-2">
          <span className="font-bold text-sm mr-2">{field.number}.</span>
          <span className="font-bold text-sm text-gray-900 uppercase">{field.label}</span>
          {field.required && <span className="text-red-500 ml-1 font-bold">*</span>}
        </div>
        <div className={`w-full border border-gray-300 rounded-sm bg-gray-50`} style={{ height: `${(field.rows || 3) * 2}rem` }}></div>
      </div>
    );
  }

  if (field.type === 'checkbox') {
    return (
      <div className="mb-6">
        <div className="flex items-baseline mb-2">
          <span className="font-bold text-sm mr-2">{field.number}.</span>
          <span className="font-bold text-sm text-gray-900 uppercase">{field.label}</span>
          {field.required && <span className="text-red-500 ml-1 font-bold">*</span>}
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4 mt-2">
          {field.options?.map((opt, i) => (
            <div key={i} className="flex items-center">
              <div className="w-6 h-6 border-2 border-gray-500 mr-3 rounded-sm bg-white"></div>
              <span className="text-sm text-gray-700 font-medium uppercase">{opt}</span>
            </div>
          ))}
        </div>
        <div className="w-full border-b border-gray-300 mt-4"></div>
      </div>
    );
  }

  return null;
};

// --- Footer Components ---

const DeclarationBox = ({ theme }: { theme: DocTheme }) => (
  <div 
    className="border-2 p-6 mb-8 rounded-sm"
    style={{ borderColor: theme.primary, backgroundColor: theme.secondary + '15' }} // 15 is hex opacity approx 8%
  >
    <h4 className="font-bold text-gray-900 uppercase mb-4">Declaration</h4>
    <p className="text-sm text-gray-700 leading-relaxed mb-8 text-justify">
      I hereby declare that the information provided in this form is true, accurate, and complete to the best of my knowledge. 
      I understand that providing false information is an offense under the laws of South Sudan and may result in rejection 
      of this application and/or legal action. I agree to comply with all regulations governing this service in Central Equatoria State.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <div className="font-bold text-sm mb-8 uppercase text-gray-800">Applicant Signature:</div>
        <div className="border-b-2 border-gray-800"></div>
      </div>
      <div>
        <div className="font-bold text-sm mb-8 uppercase text-gray-800">Date:</div>
        <div className="border-b-2 border-gray-800"></div>
      </div>
    </div>
  </div>
);

const OfficialUseBox = () => (
  <div className="border-4 border-red-500 p-6 mb-8 relative">
    <h4 className="font-bold text-red-500 uppercase mb-6">For Official Use Only</h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
      <div>
        <div className="text-sm font-bold text-gray-700 mb-6 uppercase">Received By:</div>
        <div className="border-b border-gray-400"></div>
      </div>
      <div>
        <div className="text-sm font-bold text-gray-700 mb-6 uppercase">Date Received:</div>
        <div className="border-b border-gray-400"></div>
      </div>
      <div>
        <div className="text-sm font-bold text-gray-700 mb-6 uppercase">Registration Number:</div>
        <div className="border-b border-gray-400"></div>
      </div>
      <div>
        <div className="text-sm font-bold text-gray-700 mb-6 uppercase">Status/Remarks:</div>
        <div className="border-b border-gray-400"></div>
      </div>
      <div className="sm:col-span-2">
        <div className="text-sm font-bold text-gray-700 mb-6 uppercase">Approved By:</div>
        <div className="border-b border-gray-400"></div>
      </div>
    </div>
    
    <div className="absolute top-6 right-6 w-24 h-24 md:w-32 md:h-32 border-2 border-gray-300 flex items-center justify-center opacity-50 md:opacity-100">
      <span className="text-[10px] text-gray-400 font-bold uppercase text-center">Official<br/>Stamp</span>
    </div>
  </div>
);

// --- Main Component ---

export const DocumentViewer = ({ document, onClose }: DocumentViewerProps) => {

  const [data, setData] = useState<DocData | null>(null);
  const theme = getTheme(document.category);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // --- Data Builder ---
  useEffect(() => {
    const isReport = document.category === "Public Documents" || document.category === "Service Fees" || document.category === "Executive Order" || document.category === "Cabinet Resolutions" || document.category === "Directive";
    
    const getAuthority = () => {
        if (document.category === 'Service Fees') return 'Ministry of Finance & Planning';
        if (document.category === 'Executive Order') return 'Office of the Governor';
        if (document.category === 'Cabinet Resolutions') return 'Secretariat of the State Cabinet';
        if (document.category === 'Directive') return 'State Secretariat General';
        return 'Office of the Secretary General';
    };

    if (isReport) {
      let reportContent: ReportItem[] = [];

      if (document.category === 'Executive Order') {
         reportContent = [
             { type: 'paragraph', text: `EXECUTIVE ORDER NO. ${document.id.split('-')[1] || '05/2025'}` },
             { type: 'paragraph', text: "WHEREAS, the Constitution of Central Equatoria State grants the Governor authority to issue executive orders for the effective administration of the state;" },
             { type: 'paragraph', text: "AND WHEREAS, it has become necessary to address the matters described in the title of this order;" },
             { type: 'paragraph', text: "NOW THEREFORE, I, GEN. AUGUSTINO JADALLA KAMILO WANI, Caretaker Governor of Central Equatoria State, do hereby order and direct as follows:" },
             { type: 'list', items: [
                 "That the directives contained herein shall take effect immediately upon signature.",
                 "That all relevant state ministries, departments, and agencies are hereby directed to implement these orders without delay.",
                 "That any previous orders or regulations inconsistent with this Executive Order are hereby revoked to the extent of such inconsistency.",
                 "That this order shall remain in force until revoked or amended by a subsequent Executive Order."
             ]}
         ];
      } else if (document.category === 'Cabinet Resolutions') {
          reportContent = [
              { type: 'header', text: "Resolutions Passed:" },
              { type: 'list', items: [
                  "The Council of Ministers approved the proposed budget allocations for the upcoming quarter.",
                  "Directed the Ministry of Roads and Bridges to expedite infrastructure projects within Juba City.",
                  "Resolved to enhance security measures in border counties.",
                  "Endorsed new public health initiatives presented by the Ministry of Health."
              ]}
          ];
      } else if (document.category === 'Directive') {
          reportContent = [
              { type: 'paragraph', text: `DIRECTIVE NO. CES/SG/DIR/${document.id.split('-')[2] || '001'}/2025` },
              { type: 'header', text: "TO: All State Ministries and County Commissioners" },
              { type: 'header', text: `SUBJECT: ${document.title.toUpperCase()}` },
              { type: 'paragraph', text: "1. The State Secretariat hereby issues this directive to ensure compliance with state regulations regarding the subject matter." },
              { type: 'paragraph', text: "2. All concerned institutions are required to implement the following measures effective immediately:" },
              { type: 'list', items: [
                  "Strict adherence to the established operational guidelines.",
                  "Submission of weekly progress reports to the Secretariat.",
                  "Coordination with local law enforcement where applicable.",
                  "Ensuring public awareness and cooperation."
              ]},
              { type: 'paragraph', text: "3. Failure to comply with this directive will result in administrative action." }
          ];
      } else if (document.category === 'Service Fees') {
          reportContent = [
             { type: 'paragraph', text: "The following fees apply for government services for the fiscal year 2025:" },
             { type: 'table', headers: ["Service Description", "Fee (SSP)"], rows: [
                 ["Standard Application Processing", "500"],
                 ["Expedited Processing (24 Hours)", "2,500"],
                 ["Certificate Issuance", "1,000"],
                 ["Late Renewal Penalty", "5,000"],
                 ["Replacement of Lost Document", "3,000"]
             ]}
          ];
      } else {
          reportContent = [
              { type: 'paragraph', text: `This document serves as an official publication regarding ${document.title}.` },
              { type: 'paragraph', text: "The contents herein are authorized for public dissemination. For further details regarding this document, please contact the relevant department at the State Secretariat." }
          ];
      }

      setData({
          type: 'report',
          ministry: getAuthority(),
          title: document.title,
          refNo: `CES/PUB/${new Date().getFullYear()}/00${Math.floor(Math.random()*100)}`,
          date: document.date,
          reportContent,
          reportSignature: document.category === 'Executive Order'
            ? { name: "H.E. Gen. Augustino Jadalla Kamilo Wani", title: "Caretaker Governor, Central Equatoria State" }
            : { name: "Authorized Signature", title: "Central Equatoria State Gov" }
      });

    } else {
        // --- Form Data Building ---
        let formFields: FormField[] = [];
        let ministry = "Government of Central Equatoria State";
        let fee = "Varies";
        let time = "Varies";

        const offsetFieldNumbers = (fields: FormField[], offset: number): FormField[] => {
            return fields.map(f => {
                const newField = { ...f };
                if (newField.number) {
                    newField.number = String(Number(newField.number) + offset);
                }
                if (newField.fields) {
                    newField.fields = offsetFieldNumbers(newField.fields, offset);
                }
                return newField;
            });
        };

        const commonPersonalFields: FormField[] = [
            { type: 'section', title: "Section A: Applicant Personal Details" },
            { type: 'row', fields: [
                { type: 'input', number: "1", label: "Full Name", required: true, placeholder: "As appears on ID" },
                { type: 'input', number: "2", label: "Date of Birth", required: true, placeholder: "DD/MM/YYYY" }
            ]},
            { type: 'row', fields: [
                { type: 'checkbox', number: "3", label: "Gender", options: ["Male", "Female"], required: true },
                { type: 'input', number: "4", label: "Phone Number", required: true, placeholder: "+211..." }
            ]},
            { type: 'input', number: "5", label: "Residential Address", required: true }
        ];

        // Specific Form Logic based on Document ID or Title
        if (document.id === 'doc-birth' || document.title.includes('Birth Certificate')) {
            ministry = "Ministry of Health";
            fee = "500 SSP";
            formFields = [
                { type: 'section', title: "Section A: Child Information" },
                { type: 'input', number: "1", label: "Full Name of Child", required: true },
                { type: 'row', fields: [
                    { type: 'input', number: "2", label: "Date of Birth", required: true, placeholder: "DD/MM/YYYY" },
                    { type: 'checkbox', number: "3", label: "Gender", options: ["Male", "Female"], required: true }
                ]},
                { type: 'row', fields: [
                    { type: 'input', number: "4", label: "Place of Birth", required: true, placeholder: "Hospital/Home" },
                    { type: 'input', number: "5", label: "County of Birth", required: true }
                ]},
                { type: 'section', title: "Section B: Parents Information" },
                { type: 'row', fields: [
                    { type: 'input', number: "6", label: "Father's Full Name", required: true },
                    { type: 'input', number: "7", label: "Father's Nationality", required: true }
                ]},
                { type: 'row', fields: [
                    { type: 'input', number: "8", label: "Mother's Full Name", required: true },
                    { type: 'input', number: "9", label: "Mother's Nationality", required: true }
                ]}
            ];
        } else if (document.id === 'doc-marriage' || document.title.includes('Marriage Certificate')) {
            ministry = "Ministry of Local Government & Law Enforcement";
            fee = "1,000 SSP";
            formFields = [
                { type: 'section', title: "Section A: Groom Details" },
                ...commonPersonalFields.slice(1), // Skip the section header
                { type: 'section', title: "Section B: Bride Details" },
                { type: 'input', number: "6", label: "Bride's Full Name", required: true },
                { type: 'row', fields: [
                    { type: 'input', number: "7", label: "Bride's Date of Birth", required: true },
                    { type: 'input', number: "8", label: "Bride's Nationality", required: true }
                ]},
                { type: 'section', title: "Section C: Marriage Details" },
                { type: 'row', fields: [
                    { type: 'input', number: "9", label: "Date of Marriage", required: true },
                    { type: 'checkbox', number: "10", label: "Type of Marriage", options: ["Civil", "Religious", "Customary"], required: true }
                ]},
                { type: 'input', number: "11", label: "Place of Marriage", required: true }
            ];
        } else if (document.id === 'doc-nid' || document.title.includes('National ID')) {
            ministry = "Ministry of Local Government & Law Enforcement";
            fee = "300 SSP";
            formFields = [
                ...commonPersonalFields,
                { type: 'section', title: "Section B: Citizenship & Origin" },
                { type: 'row', fields: [
                    { type: 'input', number: "6", label: "Clan/Tribe", required: true },
                    { type: 'input', number: "7", label: "Village/Boma", required: true }
                ]},
                { type: 'row', fields: [
                    { type: 'checkbox', number: "8", label: "Blood Group", options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
                    { type: 'input', number: "9", label: "Occupation" }
                ]}
            ];
        } else if (document.id === 'doc-death' || document.title.includes('Death Certificate')) {
            ministry = "Ministry of Health";
            fee = "500 SSP";
            formFields = [
                { type: 'section', title: "Section A: Deceased Information" },
                { type: 'input', number: "1", label: "Full Name of Deceased", required: true },
                { type: 'row', fields: [
                    { type: 'input', number: "2", label: "Date of Birth", required: true },
                    { type: 'input', number: "3", label: "Date of Death", required: true }
                ]},
                { type: 'input', number: "4", label: "Place of Death", required: true },
                { type: 'section', title: "Section B: Applicant/Next of Kin Details" },
                ...offsetFieldNumbers(commonPersonalFields.slice(1), 4)
            ];
        } else if (document.id === 'doc-biz-reg' || document.title.includes('Business Registration')) {
            ministry = "Ministry of Trade & Industry";
            fee = "5,000 SSP";
            formFields = [
                { type: 'section', title: "Section A: Business Details" },
                { type: 'input', number: "1", label: "Proposed Business Name", required: true },
                { type: 'row', fields: [
                    { type: 'checkbox', number: "2", label: "Business Type", options: ["Sole Proprietorship", "Partnership", "Limited Company", "NGO"], required: true },
                    { type: 'checkbox', number: "3", label: "Business Sector", options: ["Retail", "Agriculture", "Technology", "Construction", "Services"], required: true }
                ]},
                { type: 'input', number: "4", label: "Start-up Capital (SSP)", required: true },
                { type: 'section', title: "Section B: Owner/Director Information" },
                ...offsetFieldNumbers(commonPersonalFields.slice(1), 4)
            ];
        } else if (document.id === 'doc-land' || document.title.includes('Land Registration')) {
            ministry = "Ministry of Housing, Lands & Public Utilities";
            fee = "15,000 SSP";
            formFields = [
                ...commonPersonalFields,
                { type: 'section', title: "Section B: Property Details" },
                { type: 'row', fields: [
                    { type: 'input', number: "6", label: "Plot Number", required: true },
                    { type: 'input', number: "7", label: "Block Number", required: true }
                ]},
                { type: 'row', fields: [
                    { type: 'input', number: "8", label: "Area (Sq. Meters)", required: true },
                    { type: 'checkbox', number: "9", label: "Land Class", options: ["First Class", "Second Class", "Third Class"], required: true }
                ]},
                { type: 'input', number: "10", label: "Area/Boma Location", required: true }
            ];
        } else if (document.id === 'doc-trade' || document.title.includes('Trade License')) {
            ministry = "Ministry of Trade & Industry";
            fee = "3,000 SSP";
            formFields = [
                { type: 'section', title: "Section A: Business Info" },
                { type: 'row', fields: [
                    { type: 'input', number: "1", label: "Business Registration No.", required: true },
                    { type: 'input', number: "2", label: "Business Name", required: true }
                ]},
                { type: 'input', number: "3", label: "Tax Identification Number (TIN)", required: true },
                { type: 'section', title: "Section B: Premises Details" },
                { type: 'row', fields: [
                    { type: 'input', number: "4", label: "Plot Number", required: true },
                    { type: 'input', number: "5", label: "Location/Market", required: true }
                ]},
                { type: 'checkbox', number: "6", label: "Type of Premises", options: ["Shop", "Office", "Warehouse", "Stall"], required: true }
            ];
        } else if (document.id === 'doc-tax' || document.title.includes('Tax Registration')) {
            ministry = "Ministry of Finance & Planning";
            fee = "1,000 SSP";
            formFields = [
                { type: 'section', title: "Section A: Entity Details" },
                { type: 'input', number: "1", label: "Company/Individual Name", required: true },
                { type: 'row', fields: [
                    { type: 'input', number: "2", label: "Registration Date", required: true },
                    { type: 'input', number: "3", label: "Official Email", required: true }
                ]},
                { type: 'section', title: "Section B: Location & Contact" },
                ...offsetFieldNumbers(commonPersonalFields.slice(1), 3)
            ];
        } else if (document.id === 'doc-health-ins' || document.title.includes('Health Insurance')) {
            ministry = "Ministry of Health";
            fee = "Free";
            formFields = [
                ...commonPersonalFields,
                { type: 'section', title: "Section B: Medical Information" },
                { type: 'row', fields: [
                    { type: 'checkbox', number: "6", label: "Blood Group", options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], required: true },
                    { type: 'input', number: "7", label: "Pre-existing Conditions" }
                ]},
                { type: 'textarea', number: "8", label: "Allergies & Medications", rows: 4 }
            ];
        } else if (document.id === 'doc-school' || document.title.includes('School Enrollment')) {
            ministry = "Ministry of General Education & Instruction";
            fee = "Free";
            formFields = [
                { type: 'section', title: "Section A: Student Information" },
                { type: 'input', number: "1", label: "Full Name of Student", required: true },
                { type: 'row', fields: [
                    { type: 'input', number: "2", label: "Date of Birth", required: true },
                    { type: 'checkbox', number: "3", label: "Gender", options: ["Male", "Female"], required: true }
                ]},
                { type: 'section', title: "Section B: Enrollment Details" },
                { type: 'row', fields: [
                    { type: 'input', number: "4", label: "Grade/Class Applying For", required: true },
                    { type: 'input', number: "5", label: "Previous School Attended" }
                ]},
                { type: 'section', title: "Section C: Parent/Guardian Details" },
                ...offsetFieldNumbers(commonPersonalFields.slice(1), 5)
            ];
        } else if (document.id === 'doc-scholar' || document.title.includes('Scholarship')) {
            ministry = "Ministry of General Education & Instruction";
            fee = "Free";
            formFields = [
                { type: 'section', title: "Section A: Academic Information" },
                { type: 'input', number: "1", label: "Current Institution", required: true },
                { type: 'row', fields: [
                    { type: 'input', number: "2", label: "Current Grade/Year", required: true },
                    { type: 'input', number: "3", label: "GPA / Academic Standing", required: true }
                ]},
                { type: 'input', number: "4", label: "Field of Study / Course", required: true },
                { type: 'section', title: "Section B: Personal Statement" },
                { type: 'textarea', number: "5", label: "Why do you deserve this scholarship?", required: true, rows: 8 },
                { type: 'section', title: "Section C: Applicant Details" },
                ...offsetFieldNumbers(commonPersonalFields.slice(1), 5)
            ];
        } else if (document.id === 'doc-court' || document.title.includes('Court Filing')) {
            ministry = "Ministry of Parliamentary & Legal Affairs";
            fee = "1,500 SSP";
            formFields = [
                { type: 'section', title: "Section A: Case Information" },
                { type: 'row', fields: [
                    { type: 'input', number: "1", label: "Case Type", required: true, placeholder: "Civil/Criminal/Family" },
                    { type: 'input', number: "2", label: "Court Level", required: true, placeholder: "High Court/County Court" }
                ]},
                { type: 'input', number: "3", label: "Case Title / Parties Involved", required: true },
                { type: 'section', title: "Section B: Filing Details" },
                { type: 'textarea', number: "4", label: "Nature of Claim / Petition", required: true, rows: 6 },
                { type: 'section', title: "Section C: Petitioner Details" },
                ...offsetFieldNumbers(commonPersonalFields.slice(1), 4)
            ];
        } else if (document.id === 'doc-legal-aid' || document.title.includes('Legal Aid')) {
            ministry = "Ministry of Parliamentary & Legal Affairs";
            fee = "Free";
            formFields = [
                { type: 'section', title: "Section A: Financial Eligibility" },
                { type: 'row', fields: [
                    { type: 'input', number: "1", label: "Monthly Income (SSP)", required: true },
                    { type: 'input', number: "2", label: "Number of Dependents", required: true }
                ]},
                { type: 'section', title: "Section B: Legal Problem" },
                { type: 'textarea', number: "3", label: "Describe your legal issue", required: true, rows: 6 },
                { type: 'section', title: "Section C: Applicant Details" },
                ...offsetFieldNumbers(commonPersonalFields.slice(1), 3)
            ];
        } else if (document.id === 'doc-notary' || document.title.includes('Notary')) {
            ministry = "Ministry of Parliamentary & Legal Affairs";
            fee = "500 SSP";
            formFields = [
                { type: 'section', title: "Section A: Document to be Notarized" },
                { type: 'input', number: "1", label: "Document Type", required: true, placeholder: "Affidavit/Contract/Power of Attorney" },
                { type: 'input', number: "2", label: "Number of Copies", required: true },
                { type: 'section', title: "Section B: Signatory Details" },
                ...offsetFieldNumbers(commonPersonalFields.slice(1), 2)
            ];
        } else if (document.id === 'doc-med-rec' || document.title.includes('Medical Records')) {
            ministry = "Ministry of Health";
            fee = "300 SSP";
            formFields = [
                ...commonPersonalFields,
                { type: 'section', title: "Section B: Record Details" },
                { type: 'input', number: "6", label: "Patient Name (if different)", placeholder: "Leave blank if same as applicant" },
                { type: 'row', fields: [
                    { type: 'input', number: "7", label: "Hospital/Clinic Name", required: true },
                    { type: 'input', number: "8", label: "Date of Treatment/Admission" }
                ]},
                { type: 'textarea', number: "9", label: "Specific Records Requested", required: true, rows: 4 }
            ];
        } else if (document.id === 'doc-clinic' || document.title.includes('Clinic Registration')) {
            ministry = "Ministry of Health";
            fee = "3,500 SSP";
            formFields = [
                { type: 'section', title: "Section A: Clinic Details" },
                { type: 'input', number: "1", label: "Proposed Clinic Name", required: true },
                { type: 'row', fields: [
                    { type: 'input', number: "2", label: "Location/Payam", required: true },
                    { type: 'input', number: "3", label: "Plot Number", required: true }
                ]},
                { type: 'checkbox', number: "4", label: "Clinic Type", options: ["General Practice", "Specialized", "Maternity", "Dental"], required: true },
                { type: 'section', title: "Section B: Proprietor Information" },
                ...offsetFieldNumbers(commonPersonalFields.slice(1), 4)
            ];
        } else if (document.id === 'doc-prop' || document.title.includes('Property Transfer')) {
            ministry = "Ministry of Housing, Lands & Public Utilities";
            fee = "2,200 SSP";
            formFields = [
                { type: 'section', title: "Section A: Property Information" },
                { type: 'row', fields: [
                    { type: 'input', number: "1", label: "Title Deed Number", required: true },
                    { type: 'input', number: "2", label: "Plot & Block Number", required: true }
                ]},
                { type: 'section', title: "Section B: Transfer Details" },
                { type: 'row', fields: [
                    { type: 'input', number: "3", label: "Current Owner Name", required: true },
                    { type: 'input', number: "4", label: "New Owner Name", required: true }
                ]},
                { type: 'input', number: "5", label: "Reason for Transfer", placeholder: "Sale/Gift/Inheritance" },
                { type: 'section', title: "Section C: Applicant Details" },
                ...offsetFieldNumbers(commonPersonalFields.slice(1), 5)
            ];
        } else if (document.id === 'doc-build' || document.title.includes('Building Permit')) {
            ministry = "Ministry of Housing, Lands & Public Utilities";
            fee = "7,500 SSP";
            formFields = [
                { type: 'section', title: "Section A: Site Information" },
                { type: 'input', number: "1", label: "Title Deed Number", required: true },
                { type: 'row', fields: [
                    { type: 'input', number: "2", label: "Plot Number", required: true },
                    { type: 'input', number: "3", label: "Location", required: true }
                ]},
                { type: 'section', title: "Section B: Construction Details" },
                { type: 'row', fields: [
                    { type: 'checkbox', number: "4", label: "Building Type", options: ["Residential", "Commercial", "Industrial", "Institutional"], required: true },
                    { type: 'input', number: "5", label: "Number of Floors", required: true }
                ]},
                { type: 'input', number: "6", label: "Supervising Engineer Name", required: true }
            ];
        } else {
            // Fallback for other forms
            formFields = [
                ...commonPersonalFields,
                { type: 'section', title: "Section B: Request Details" },
                { type: 'input', number: "6", label: "Subject of Request", required: true },
                { type: 'textarea', number: "7", label: "Detailed Description", required: true, rows: 6 },
                { type: 'input', number: "8", label: "Date of Request", required: true }
            ];
        }

        setData({
            type: 'form',
            ministry,
            title: document.title,
            refNo: `CES/FORM/2025/${Math.floor(Math.random() * 1000)}`,
            date: document.date,
            fee,
            time,
            formFields
        });
    }

  }, [document]);

  // --- PDF Generator ---
  const downloadPDF = () => {
    if (!data) return;

    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let y = 0;

    const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
    };

    // Draw Header
    const drawHeader = () => {
        // Double Border with Theme Color
        doc.setDrawColor(theme.rgb[0], theme.rgb[1], theme.rgb[2]); 
        doc.setLineWidth(1);
        doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
        doc.setLineWidth(0.5);
        doc.rect(7, 7, pageWidth - 14, pageHeight - 14);

        // Logo
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(theme.rgb[0], theme.rgb[1], theme.rgb[2]);
        doc.circle(pageWidth / 2, 25, 12, 'FD'); 
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("CES", pageWidth / 2, 25, { align: "center", baseline: "middle" });
        doc.setFontSize(6);
        doc.setTextColor(theme.rgb[0], theme.rgb[1], theme.rgb[2]);
        doc.text("SOUTH SUDAN", pageWidth / 2, 30, { align: "center", baseline: "middle" });

        // Titles
        y = 48;
        doc.setFont("times", "bold");
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.text("REPUBLIC OF SOUTH SUDAN", pageWidth / 2, y, { align: "center" });
        y += 8;
        doc.setFontSize(16);
        doc.setTextColor(theme.rgb[0], theme.rgb[1], theme.rgb[2]);
        doc.text("CENTRAL EQUATORIA STATE", pageWidth / 2, y, { align: "center" });
        y += 8;
        
        // Ministry Name - Wrap
        doc.setFontSize(14);
        doc.setTextColor(100, 100, 100);
        const ministryLines = doc.splitTextToSize(data.ministry.toUpperCase(), contentWidth);
        doc.text(ministryLines, pageWidth / 2, y, { align: "center" });
        y += (ministryLines.length * 6);

        // Contact Info
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.setFont("helvetica", "normal");
        const contactInfo = "P.O. Box 12345, Juba, South Sudan | Tel: +211 920 000 000 | Email: info@ces.gov.ss";
        const contactLines = doc.splitTextToSize(contactInfo, contentWidth);
        doc.text(contactLines, pageWidth / 2, y, { align: "center" });
        y += (contactLines.length * 4) + 4;

        // Divider
        doc.setDrawColor(theme.rgb[0], theme.rgb[1], theme.rgb[2]);
        doc.setLineWidth(1);
        doc.line(margin + 20, y, pageWidth - margin - 20, y);
        y += 10;
    };

    drawHeader();

    // Ref Info
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    
    const refMaxWidth = contentWidth - 50; 
    const refLines = doc.splitTextToSize(`Ref: ${data.refNo}`, refMaxWidth);
    doc.text(refLines, margin, y);
    
    doc.text(`Date: ${data.date}`, pageWidth - margin, y, { align: "right" });
    
    y += (refLines.length * 5) + 5;

    // Document Title
    doc.setFontSize(16);
    doc.setFont("times", "bold");
    const titleLines = doc.splitTextToSize(data.title.toUpperCase(), contentWidth);
    doc.text(titleLines, pageWidth / 2, y, { align: "center" });
    
    const titleBlockHeight = titleLines.length * 6;
    doc.setLineWidth(0.5);
    doc.line(margin + 10, y + titleBlockHeight - 3, pageWidth - margin - 10, y + titleBlockHeight - 3);
    
    y += titleBlockHeight + 10;

    // --- Content Rendering ---

    if (data.type === 'report') {
        const content = data.reportContent || [];
        doc.setFont("times", "normal");
        doc.setFontSize(12);

        content.forEach(item => {
            if (item.type === 'paragraph' && item.text) {
                const lines = doc.splitTextToSize(item.text, contentWidth);
                checkPageBreak(lines.length * 6 + 4);
                doc.text(lines, margin, y);
                y += lines.length * 6 + 4;
            } else if (item.type === 'list' && item.items) {
                item.items.forEach((li, idx) => {
                    const prefix = `${idx + 1}. `;
                    const lines = doc.splitTextToSize(li, contentWidth - 10);
                    checkPageBreak(lines.length * 6 + 2);
                    doc.text(prefix, margin, y);
                    doc.text(lines, margin + 10, y);
                    y += lines.length * 6 + 2;
                });
                y += 4;
            } else if (item.type === 'header' && item.text) {
                checkPageBreak(10);
                doc.setFont("times", "bold");
                doc.text(item.text, margin, y);
                doc.setFont("times", "normal");
                y += 6;
            } else if (item.type === 'table' && item.headers && item.rows) {
                 const colWidth = contentWidth / item.headers.length;
                 checkPageBreak(10);
                 
                 doc.setFont("times", "bold");
                 doc.setFillColor(240, 240, 240);
                 doc.rect(margin, y, contentWidth, 8, 'F');
                 item.headers.forEach((h, i) => {
                     doc.text(h, margin + (i * colWidth) + 2, y + 5);
                 });
                 y += 8;
                 
                 doc.setFont("times", "normal");
                 item.rows.forEach(row => {
                     checkPageBreak(8);
                     doc.rect(margin, y, contentWidth, 8); 
                     row.forEach((cell, i) => {
                         doc.text(cell, margin + (i * colWidth) + 2, y + 5);
                     });
                     y += 8;
                 });
                 y += 10;
            }
        });

        // Signature
        checkPageBreak(40);
        y += 20;
        const sigX = pageWidth - margin - 45;
        doc.setFont("times", "italic");
        doc.setFontSize(24);
        doc.setTextColor(0, 0, 150);
        doc.text("Signed", sigX, y, { align: "center", angle: -10 });
        y += 10;
        doc.setDrawColor(0,0,0);
        doc.setLineWidth(0.5);
        doc.line(sigX - 35, y, sigX + 35, y);
        y += 5;
        doc.setFont("times", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0,0,0);
        doc.text(data.reportSignature?.name || "Authorized Signature", sigX, y, { align: "center" });
        if (data.reportSignature?.title) {
            y += 5;
            doc.setFont("times", "normal");
            doc.setFontSize(9);
            doc.setTextColor(100,100,100);
            doc.text(data.reportSignature.title, sigX, y, { align: "center" });
        }
    } 
    
    else if (data.type === 'form') {
        doc.setFillColor(254, 252, 232);
        doc.setDrawColor(250, 204, 21);
        doc.rect(margin, y, contentWidth, 12, 'FD');
        doc.setFontSize(9);
        doc.setTextColor(0,0,0);
        doc.text("INSTRUCTIONS: Complete in CAPITAL LETTERS. Attach required docs.", margin + 2, y + 7);
        y += 20;

        const drawField = (f: FormField, x: number, w: number) => {
             if (f.type === 'section') {
                 checkPageBreak(15);
                 doc.setFont("times", "bold");
                 doc.setFontSize(12);
                 doc.text(f.title || '', x, y);
                 doc.setDrawColor(theme.rgb[0], theme.rgb[1], theme.rgb[2]);
                 doc.line(x, y + 1, x + w, y + 1);
                 y += 10;
             } else if (f.type === 'input' || f.type === 'textarea') {
                 checkPageBreak(20);
                 doc.setFont("helvetica", "bold");
                 doc.setFontSize(10);
                 
                 const labelText = `${f.number}. ${f.label}`;
                 const labelLines = doc.splitTextToSize(labelText, w);
                 doc.text(labelLines, x, y);
                 
                 const labelHeight = labelLines.length * 4; 
                 y += labelHeight;
                 
                 const boxH = f.type === 'textarea' ? (f.rows || 3) * 6 : 8;
                 y += 2;
                 doc.setDrawColor(200, 200, 200);
                 doc.rect(x, y, w, boxH);
                 y += boxH + 6;
             } else if (f.type === 'checkbox') {
                 checkPageBreak(20);
                 doc.setFont("helvetica", "bold");
                 doc.setFontSize(10);
                 doc.text(`${f.number}. ${f.label}`, x, y);
                 y += 5;
                 let optX = x;
                 f.options?.forEach(opt => {
                     doc.rect(optX, y - 4, 4, 4);
                     doc.setFont("helvetica", "normal");
                     doc.text(opt, optX + 6, y);
                     optX += doc.getTextWidth(opt) + 15;
                     if (optX > x + w) { 
                         optX = x; 
                         y += 6;
                     }
                 });
                 y += 8;
             }
        };

        if (data.formFields) {
            data.formFields.forEach(field => {
                if (field.type === 'row' && field.fields) {
                    const colW = (contentWidth - 10) / field.fields.length;
                    let curX = margin;
                    let startY = y;
                    let maxY = y;
                    
                    field.fields.forEach((subF, i) => {
                        y = startY;
                        drawField(subF, curX, colW);
                        if (y > maxY) maxY = y;
                        curX += colW + 10;
                    });
                    y = maxY;
                } else {
                    drawField(field, margin, contentWidth);
                }
            });
        }

        const declText = "I hereby declare that the information provided in this form is true, accurate, and complete to the best of my knowledge. I understand that providing false information is an offense under the laws of South Sudan and may result in rejection of this application and/or legal action. I agree to comply with all regulations governing this service in Central Equatoria State.";
        const declLines = doc.splitTextToSize(declText, contentWidth - 10);
        const declHeight = (declLines.length * 4) + 35;
        
        checkPageBreak(declHeight);
        
        doc.setDrawColor(theme.rgb[0], theme.rgb[1], theme.rgb[2]);
        doc.setFillColor(250, 250, 250);
        doc.rect(margin, y, contentWidth, declHeight, 'FD');
        
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text("DECLARATION", margin + 5, y + 6);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text(declLines, margin + 5, y + 12);
        
        const sigY = y + (declLines.length * 4) + 20;
        
        doc.line(margin + 5, sigY, margin + 60, sigY);
        doc.setFontSize(8);
        doc.text("Applicant Signature", margin + 5, sigY + 4);
        
        doc.line(pageWidth - margin - 60, sigY, pageWidth - margin - 5, sigY);
        doc.text("Date", pageWidth - margin - 60, sigY + 4);
        
        y += declHeight + 10;

        checkPageBreak(60); 
        doc.setDrawColor(255, 0, 0); 
        doc.setLineWidth(0.5);
        doc.rect(margin, y, contentWidth, 55); 
        
        doc.setTextColor(255, 0, 0);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("FOR OFFICIAL USE ONLY", margin + 5, y + 6);
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        
        const colWidth = (contentWidth / 2) - 10;
        let internalY = y + 15;
        
        const drawLineField = (label: string, xPos: number) => {
            doc.text(label, xPos, internalY);
            doc.setDrawColor(150, 150, 150); 
            doc.line(xPos, internalY + 2, xPos + colWidth, internalY + 2);
        };

        drawLineField("RECEIVED BY:", margin + 5);
        drawLineField("DATE RECEIVED:", margin + contentWidth/2 + 5);
        
        internalY += 15;
        
        drawLineField("REGISTRATION NUMBER:", margin + 5);
        drawLineField("STATUS/REMARKS:", margin + contentWidth/2 + 5);
        
        internalY += 15;
        
        doc.text("APPROVED BY:", margin + 5, internalY);
        doc.line(margin + 5, internalY + 2, margin + contentWidth - 35, internalY + 2); 

        doc.setDrawColor(200, 200, 200);
        const stampSize = 25;
        doc.rect(margin + contentWidth - stampSize - 5, y + 5, stampSize, stampSize);
        doc.setFontSize(6);
        doc.setTextColor(150, 150, 150);
        doc.text("STAMP", margin + contentWidth - stampSize/2 - 5, y + stampSize/2 + 5, { align: 'center' });

        y += 60; 
    }

    const footerY = pageHeight - 15;
    doc.setDrawColor(theme.rgb[0], theme.rgb[1], theme.rgb[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
    doc.setFont("times", "bold");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("OFFICIAL GOVERNMENT PUBLICATION • CENTRAL EQUATORIA STATE", pageWidth / 2, footerY, { align: "center" });

    doc.save(`${data.title.replace(/\s+/g, '_')}.pdf`);
  };

  if (!data) return null;

  return (
    <div 
      className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toolbar */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center shrink-0 rounded-t-lg">
          <div className="flex flex-col overflow-hidden">
             <h3 className="font-semibold flex items-center text-base md:text-lg truncate">
               <FileCheck className="mr-2 shrink-0" size={20} /> <span className="truncate">{document.title}</span>
             </h3>
             <span className="text-xs text-gray-400 ml-7 truncate">{document.id} • {document.category}</span>
          </div>
          <div className="flex items-center space-x-2 shrink-0 ml-2">
            <Button size="sm" variant="secondary" onClick={downloadPDF} className="hidden sm:flex">
              <Printer size={16} className="mr-2" /> Print/Save
            </Button>
            <Button size="sm" className="bg-[#00a898] hover:bg-[#008f81]" onClick={downloadPDF}>
              <Download size={16} className="mr-2" /> <span className="hidden sm:inline">Download</span> PDF
            </Button>
            <button onClick={onClose} className="text-gray-400 hover:text-white ml-2">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content View - Responsive Scroll Wrapper */}
        <div className="overflow-auto bg-gray-100 flex-grow p-4 md:p-8">
          {/* The "Paper" Container */}
          <div 
            className={`bg-white border-[6px] md:border-[10px] border-double p-6 md:p-12 shadow-lg min-h-[800px] md:min-h-[1123px] relative mx-auto max-w-3xl text-left w-full md:w-auto overflow-x-hidden`}
            style={{ borderColor: theme.primary + '40' }} // 25% opacity for border look
          >
             
             <div className="relative flex-grow h-full flex flex-col">
                
                {/* Common Header */}
                <FormHeader ministry={data.ministry} theme={theme} />

                {/* Report Specific View */}
                {data.type === 'report' && (
                    <div className="max-w-3xl mx-auto w-full flex-grow">
                        <div className="flex justify-between items-end mb-8 md:mb-12 font-bold text-xs md:text-sm">
                            <div>Ref: {data.refNo}</div>
                            <div>Date: {data.date}</div>
                        </div>

                        <h1 className="text-xl md:text-2xl font-bold text-center underline uppercase mb-8 md:mb-12 decoration-2 underline-offset-4 leading-relaxed">
                            {data.title}
                        </h1>

                        <div className="space-y-6 text-justify leading-relaxed text-sm md:text-base">
                             {data.reportContent?.map((item, idx) => {
                                 if (item.type === 'paragraph') return <p key={idx}>{item.text}</p>;
                                 if (item.type === 'list') return (
                                     <ol key={idx} className="list-decimal pl-6 space-y-4 my-4">
                                         {item.items?.map((li, i) => <li key={i}>{li}</li>)}
                                     </ol>
                                 );
                                 if (item.type === 'header') return <h4 key={idx} className="font-bold uppercase mt-4" style={{color: theme.primary}}>{item.text}</h4>;
                                 if (item.type === 'table' && item.headers && item.rows) return (
                                     <div key={idx} className="my-8 border border-gray-300 rounded-lg overflow-hidden">
                                         <table className="w-full text-sm">
                                             <thead className="bg-gray-100 text-gray-900 font-bold">
                                                 <tr>
                                                     {item.headers.map((h, i) => <th key={i} className="px-4 py-3 text-left border-r">{h}</th>)}
                                                 </tr>
                                             </thead>
                                             <tbody className="divide-y divide-gray-200">
                                                 {item.rows.map((row, rI) => (
                                                     <tr key={rI}>
                                                         {row.map((cell, cI) => <td key={cI} className="px-4 py-3 border-r">{cell}</td>)}
                                                     </tr>
                                                 ))}
                                             </tbody>
                                         </table>
                                     </div>
                                 );
                                 return null;
                             })}
                        </div>

                        <div className="mt-24 flex flex-col items-end">
                            <div className="text-center w-64">
                                <div className="h-20 mb-2 flex items-center justify-center">
                                    <div className="font-script text-4xl text-blue-900 -rotate-12 opacity-80 font-cursive" style={{fontFamily: 'cursive'}}>Signed</div>
                                </div>
                                <div className="border-t border-gray-900 pt-2 font-bold uppercase text-sm">{data.reportSignature?.name}</div>
                                <div className="text-xs text-gray-500">{data.reportSignature?.title}</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form Specific View */}
                {data.type === 'form' && (
                    <div className="flex-grow">
                        <FormTitleBox title={data.title} refNo={data.refNo} date={data.date} theme={theme} />
                        <InstructionsBox />
                        
                        <div className="min-h-[300px]">
                            {data.formFields?.map((field, idx) => (
                                <RenderField key={idx} field={field} theme={theme} />
                            ))}
                        </div>

                        <DeclarationBox theme={theme} />
                        <OfficialUseBox />
                    </div>
                )}

                {/* Footer */}
                <div className="mt-auto pt-12">
                   <div 
                     className="border-t-2 pt-4 text-center text-[10px] md:text-xs text-gray-500 font-bold uppercase"
                     style={{ borderColor: theme.primary }}
                   >
                     Official Government Publication • Central Equatoria State
                   </div>
                   {data.type === 'form' && (
                       <div className="text-center text-xs text-gray-500 mt-2">
                           {data.fee && <span>Fee: {data.fee} | </span>}
                           {data.time && <span>Processing Time: {data.time}</span>}
                       </div>
                   )}
                </div>

             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
