
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Check, UploadCloud, AlertCircle, 
  Loader2, Send, CheckCircle2, Trash2, File as FileIcon, Save,
  CreditCard, Smartphone
} from 'lucide-react';
import { Card, CardContent, Button, Input, Label, Select, Checkbox } from '../components/ui';

// ... (Types & Config function remain unchanged) ...
// --- Types & Configuration ---

type FieldType = 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea' | 'number';

interface FieldDef {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[]; // For select inputs
  required?: boolean;
}

interface ServiceDef {
  title: string;
  category: string;
  fee: string;
  description: string;
  step1Title: string;
  step1Fields: FieldDef[];
  step2Title: string;
  step2Fields: FieldDef[];
  requiredDocs: string[];
}

// Helper to generate fields based on service type
const getServiceConfig = (slug: string): ServiceDef => {
  const commonPersonalFields: FieldDef[] = [
    { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'As appears on ID', required: true },
    { id: 'dob', label: 'Date of Birth', type: 'date', required: true },
    { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'], required: true },
    { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+211...', required: true },
    { id: 'address', label: 'Residential Address', type: 'text', required: true },
  ];

  // Configuration Map
  const configs: Record<string, Partial<ServiceDef>> = {
    // --- Civil Documentation ---
    'birth-certificate': {
      title: 'Birth Certificate Application',
      category: 'Civil Documentation',
      fee: '500 SSP',
      description: 'Official registration of birth for children born in Central Equatoria State.',
      step1Title: 'Child Information',
      step1Fields: [
        { id: 'childName', label: 'Full Name of Child', type: 'text', required: true },
        { id: 'dob', label: 'Date of Birth', type: 'date', required: true },
        { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'], required: true },
        { id: 'placeOfBirth', label: 'Place of Birth (Hospital/Home)', type: 'text', required: true },
        { id: 'county', label: 'County of Birth', type: 'select', options: ['Juba', 'Yei River', 'Morobo', 'Lainya', 'Kajo-Keji', 'Terekeka'], required: true },
      ],
      step2Title: 'Parents Information',
      step2Fields: [
        { id: 'fatherName', label: "Father's Full Name", type: 'text', required: true },
        { id: 'fatherNation', label: "Father's Nationality", type: 'text', required: true },
        { id: 'motherName', label: "Mother's Full Name", type: 'text', required: true },
        { id: 'motherNation', label: "Mother's Nationality", type: 'text', required: true },
      ],
      requiredDocs: ['Hospital Notification of Birth', 'Parents National IDs', 'Passport Photos']
    },
    'marriage-certificate': {
      title: 'Marriage Certificate',
      category: 'Civil Documentation',
      fee: '1,000 SSP',
      step1Title: 'Groom Details',
      step1Fields: commonPersonalFields,
      step2Title: 'Bride & Marriage Details',
      step2Fields: [
        { id: 'brideName', label: "Bride's Full Name", type: 'text', required: true },
        { id: 'marriageDate', label: 'Date of Marriage', type: 'date', required: true },
        { id: 'marriageType', label: 'Type of Marriage', type: 'select', options: ['Civil', 'Religious', 'Customary'], required: true },
        { id: 'place', label: 'Place of Marriage', type: 'text', required: true },
      ],
      requiredDocs: ['Joint Affidavit', 'Witness IDs', 'Religious/Customary Proof']
    },
    'national-id': {
      title: 'National ID Application',
      category: 'Civil Documentation',
      fee: '300 SSP',
      step1Title: 'Personal Information',
      step1Fields: commonPersonalFields,
      step2Title: 'Citizenship Details',
      step2Fields: [
        { id: 'clan', label: 'Clan/Tribe', type: 'text', required: true },
        { id: 'village', label: 'Village/Boma', type: 'text', required: true },
        { id: 'bloodGroup', label: 'Blood Group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
        { id: 'occupation', label: 'Occupation', type: 'text' },
      ],
      requiredDocs: ['Birth Certificate', 'Chief Recommendation Letter', 'Blood Group Report']
    },
    'death-certificate': {
      title: 'Death Certificate',
      category: 'Civil Documentation',
      fee: '500 SSP',
      step1Title: 'Deceased Information',
      step1Fields: [
        { id: 'deceasedName', label: 'Full Name of Deceased', type: 'text', required: true },
        { id: 'dob', label: 'Date of Birth', type: 'date', required: true },
        { id: 'dod', label: 'Date of Death', type: 'date', required: true },
        { id: 'placeOfDeath', label: 'Place of Death', type: 'text', required: true },
      ],
      step2Title: 'Applicant/Next of Kin',
      step2Fields: commonPersonalFields,
      requiredDocs: ['Medical Death Record', 'Deceased ID (if available)', 'Applicant ID']
    },

    // --- Business Services ---
    'business-registration': {
      title: 'Business Registration',
      category: 'Business Services',
      fee: '5,000 SSP',
      step1Title: 'Business Details',
      step1Fields: [
        { id: 'bizName', label: 'Proposed Business Name', type: 'text', required: true },
        { id: 'bizType', label: 'Business Type', type: 'select', options: ['Sole Proprietorship', 'Partnership', 'Limited Company', 'NGO'], required: true },
        { id: 'sector', label: 'Business Sector', type: 'select', options: ['Retail', 'Agriculture', 'Technology', 'Construction', 'Services'], required: true },
        { id: 'capital', label: 'Start-up Capital (SSP)', type: 'number', required: true },
      ],
      step2Title: 'Owner/Director Information',
      step2Fields: commonPersonalFields,
      requiredDocs: ['Memorandum of Understanding', 'Rent Agreement/Title Deed', 'Tax Identification Number (TIN)', 'Owner IDs']
    },
    'trade-license': {
      title: 'Trade License Application',
      category: 'Business Services',
      fee: '3,000 SSP',
      step1Title: 'Business Info',
      step1Fields: [
        { id: 'bizRegNo', label: 'Business Registration No.', type: 'text', required: true },
        { id: 'bizName', label: 'Business Name', type: 'text', required: true },
        { id: 'tin', label: 'Tax Identification Number', type: 'text', required: true },
      ],
      step2Title: 'Premises Details',
      step2Fields: [
        { id: 'plotNo', label: 'Plot Number', type: 'text', required: true },
        { id: 'location', label: 'Location/Market', type: 'text', required: true },
        { id: 'premiseType', label: 'Type of Premises', type: 'select', options: ['Shop', 'Office', 'Warehouse', 'Stall'], required: true },
      ],
      requiredDocs: ['Business Registration Cert', 'Tax Clearance Cert', 'Health Inspection Report']
    },
    'tax-registration': {
      title: 'Tax Registration (TIN)',
      category: 'Business Services',
      fee: '1,000 SSP',
      step1Title: 'Entity Details',
      step1Fields: [
        { id: 'entityName', label: 'Company/Individual Name', type: 'text', required: true },
        { id: 'regDate', label: 'Registration Date', type: 'date', required: true },
        { id: 'email', label: 'Official Email', type: 'email', required: true },
      ],
      step2Title: 'Location & Contact',
      step2Fields: commonPersonalFields,
      requiredDocs: ['Certificate of Incorporation', 'Passport/ID of Directors', 'Company Form 18']
    },

    // --- Land & Housing ---
    'land-registration': {
      title: 'Land Registration',
      category: 'Land & Housing',
      fee: '15,000 SSP',
      step1Title: 'Applicant Details',
      step1Fields: commonPersonalFields,
      step2Title: 'Property Details',
      step2Fields: [
        { id: 'plotNo', label: 'Plot Number', type: 'text', required: true },
        { id: 'block', label: 'Block Number', type: 'text', required: true },
        { id: 'area', label: 'Area (Sq. Meters)', type: 'number', required: true },
        { id: 'class', label: 'Land Class', type: 'select', options: ['First Class', 'Second Class', 'Third Class'], required: true },
        { id: 'location', label: 'Area/Boma', type: 'text', required: true },
      ],
      requiredDocs: ['Allotment Letter', 'Survey Map', 'Payment Receipt']
    },
    'building-permit': {
      title: 'Building Permit',
      category: 'Land & Housing',
      fee: '7,500 SSP',
      step1Title: 'Site Information',
      step1Fields: [
        { id: 'titleDeed', label: 'Title Deed Number', type: 'text', required: true },
        { id: 'plotNo', label: 'Plot Number', type: 'text', required: true },
        { id: 'location', label: 'Location', type: 'text', required: true },
      ],
      step2Title: 'Construction Details',
      step2Fields: [
        { id: 'buildingType', label: 'Building Type', type: 'select', options: ['Residential', 'Commercial', 'Industrial', 'Institutional'], required: true },
        { id: 'floors', label: 'Number of Floors', type: 'number', required: true },
        { id: 'engineer', label: 'Supervising Engineer', type: 'text', required: true },
      ],
      requiredDocs: ['Architectural Drawings', 'Structural Analysis', 'Title Deed Copy', 'Environmental Impact Assessment']
    },

    // --- Fallback for others ---
    'default': {
      title: 'Service Application',
      category: 'General Service',
      fee: 'Check Description',
      description: 'Standard application form for government services.',
      step1Title: 'Applicant Information',
      step1Fields: commonPersonalFields,
      step2Title: 'Request Details',
      step2Fields: [
        { id: 'subject', label: 'Subject of Request', type: 'text', required: true },
        { id: 'description', label: 'Detailed Description', type: 'textarea', required: true },
        { id: 'date', label: 'Date', type: 'date', required: true },
      ],
      requiredDocs: ['National ID Copy', 'Supporting Letters']
    }
  };

  // Merge default into specific config or use default if not found
  const specificConfig = configs[slug] || configs['default'];
  
  return {
    title: specificConfig.title || 'Application',
    category: specificConfig.category || 'Service',
    fee: specificConfig.fee || 'Varies',
    description: specificConfig.description || 'Please complete the form below.',
    step1Title: specificConfig.step1Title || 'Personal Information',
    step1Fields: specificConfig.step1Fields || commonPersonalFields,
    step2Title: specificConfig.step2Title || 'Additional Details',
    step2Fields: specificConfig.step2Fields || [],
    requiredDocs: specificConfig.requiredDocs || ['ID Copy']
  };
};

// --- Components ---

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Information', 'Details', 'Uploads', 'Review', 'Payment'];
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
        <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-[#00a898] -z-10 transition-all duration-500`} style={{ width: `${((currentStep - 1) / 4) * 100}%` }}></div>
        
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={idx} className="flex flex-col items-center bg-[#f8fafc] px-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300
                  ${isActive ? 'border-[#00a898] bg-[#00a898] text-white' : 
                    isCompleted ? 'border-[#00a898] bg-[#00a898] text-white' : 
                    'border-gray-300 bg-white text-gray-400'}`}
              >
                {isCompleted ? <Check size={16} /> : stepNum}
              </div>
              <span className={`text-[10px] md:text-xs font-medium mt-2 hidden sm:block ${isActive || isCompleted ? 'text-[#00a898]' : 'text-gray-500'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ... (FileUploader and other components remain unchanged) ...
// File Uploader with Interaction
const FileUploader = ({ 
  requiredDocs, 
  files, 
  onFileSelect,
  onFileRemove 
}: { 
  requiredDocs: string[], 
  files: Record<string, File>, 
  onFileSelect: (docName: string, file: File) => void,
  onFileRemove: (docName: string) => void
}) => {
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleClick = (docName: string) => {
    fileInputRefs.current[docName]?.click();
  };

  const handleFileChange = (docName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(docName, e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3">
        <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={18} />
        <div className="text-sm text-blue-800">
          <p className="font-semibold">Document Requirements</p>
          <p>Please upload clear scans or photos. Supported: PDF, JPG, PNG (Max 5MB).</p>
        </div>
      </div>

      <div className="grid gap-4">
        {requiredDocs.map((doc, idx) => {
          const currentFile = files[doc];
          return (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <Label className="font-semibold text-gray-700">{doc} <span className="text-red-500">*</span></Label>
                <span className={`text-xs ${currentFile ? 'text-green-600 font-bold' : 'text-gray-400'}`}>
                  {currentFile ? 'Uploaded' : 'Not uploaded'}
                </span>
              </div>
              
              <input 
                type="file" 
                ref={el => { fileInputRefs.current[doc] = el }}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(doc, e)}
              />

              {!currentFile ? (
                <div 
                  onClick={() => handleClick(doc)}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group active:bg-gray-100"
                >
                  <UploadCloud className="text-gray-400 group-hover:text-[#00a898] mb-2 transition-colors" size={32} />
                  <p className="text-sm text-gray-600 font-medium">Click to upload document</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG or PNG</p>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center overflow-hidden">
                    <div className="bg-green-100 p-2 rounded text-green-700 mr-3 shrink-0">
                      <FileIcon size={20} />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-medium text-gray-900 truncate">{currentFile.name}</p>
                      <p className="text-xs text-gray-500">{(currentFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onFileRemove(doc)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SuccessView = ({ serviceTitle, onReset }: { serviceTitle: string, onReset: () => void }) => (
  <div className="text-center py-12 space-y-6 animate-in zoom-in duration-300">
    <div className="w-24 h-24 bg-green-100 text-[#00a898] rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle2 size={48} />
    </div>
    <h2 className="text-3xl font-bold text-gray-900">Application Submitted!</h2>
    <p className="text-gray-600 max-w-md mx-auto">
      Your application for <span className="font-semibold text-gray-900">{serviceTitle}</span> has been successfully received. 
      Your reference number is <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">CES-{new Date().getFullYear()}-{Math.floor(Math.random() * 10000)}</span>.
    </p>
    <div className="bg-gray-50 p-6 rounded-xl max-w-lg mx-auto border border-gray-200 text-left space-y-3">
      <h4 className="font-bold text-gray-900">Next Steps:</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        <li className="flex items-start"><div className="w-1.5 h-1.5 bg-[#00a898] rounded-full mt-1.5 mr-2"></div> You will receive an SMS/Email confirmation shortly.</li>
        <li className="flex items-start"><div className="w-1.5 h-1.5 bg-[#00a898] rounded-full mt-1.5 mr-2"></div> Track your status in the portal dashboard.</li>
        <li className="flex items-start"><div className="w-1.5 h-1.5 bg-[#00a898] rounded-full mt-1.5 mr-2"></div> Pay the processing fee (if applicable) to proceed.</li>
      </ul>
    </div>
    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
      <Button onClick={onReset} variant="outline" className="w-full sm:w-auto">Return to Portal</Button>
      <Link to="/portal/dashboard" className="w-full sm:w-auto">
        <Button className="w-full">Track Application</Button>
      </Link>
    </div>
  </div>
);

// --- Main Form Component ---

const EFilingForm = () => {
  const { service } = useParams<{ service: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [config, setConfig] = useState<ServiceDef | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File>>({});
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'cashit' | 'card'>('momo');

  useEffect(() => {
    if (service) {
      setConfig(getServiceConfig(service));
      
      // Load draft from local storage
      const draftKey = `draft_${service}`;
      const savedData = localStorage.getItem(draftKey);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setFormData(parsed);
          // Optional: You might want to also save/restore step or just default to step 1
        } catch (e) {
          console.error("Failed to load draft", e);
        }
      }
    }
  }, [service]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileSelect = (docName: string, file: File) => {
    setFiles(prev => ({ ...prev, [docName]: file }));
  };

  const handleFileRemove = (docName: string) => {
    setFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[docName];
      return newFiles;
    });
  };

  const handleSaveDraft = () => {
    if (!service) return;
    setIsSaving(true);
    
    // Simulate network delay for saving
    setTimeout(() => {
      const draftKey = `draft_${service}`;
      localStorage.setItem(draftKey, JSON.stringify(formData));
      setLastSaved(new Date());
      setIsSaving(false);
    }, 800);
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(c => c + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(c => c - 1);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Remove draft after submission
    if(service) localStorage.removeItem(`draft_${service}`);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (!config) return <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  if (isSubmitted) {
    return (
      <div className="container mx-auto max-w-[95%] px-4 py-12">
         <SuccessView serviceTitle={config.title} onReset={() => navigate('/portal')} />
      </div>
    );
  }

  // Render a field input
  const renderField = (field: FieldDef) => {
    return (
      <div key={field.id} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
        <Label htmlFor={field.id}>{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
        {field.type === 'select' ? (
          <Select 
            id={field.id} 
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          >
            <option value="">Select...</option>
            {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </Select>
        ) : field.type === 'textarea' ? (
            <textarea 
              className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00a898]" 
              id={field.id} 
              placeholder={field.placeholder}
              value={formData[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            />
        ) : (
          <Input 
            id={field.id} 
            type={field.type} 
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
      
      {/* Header */}
      <div className="mb-8">
        <button onClick={() => navigate('/portal')} className="flex items-center text-gray-500 hover:text-[#00a898] transition-colors mb-4 text-sm font-medium">
          <ChevronLeft size={16} className="mr-1" /> Back to Portal
        </button>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{config.title}</h1>
            <p className="text-gray-600 mt-1">{config.category}</p>
          </div>
          <div className="text-left sm:text-right flex flex-col sm:items-end">
             <div className="bg-[#d2f2d4] text-[#00a898] px-4 py-2 rounded-lg font-bold shadow-sm whitespace-nowrap self-start sm:self-auto mb-2">
               Fee: {config.fee}
             </div>
             {lastSaved && (
               <span className="text-xs text-gray-400">
                 Draft saved at {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
               </span>
             )}
          </div>
        </div>
      </div>

      <StepIndicator currentStep={currentStep} />

      {/* Auth Notice (Visible on Step 1) */}
      {currentStep === 1 && (
        <Card className="mb-8 border-l-4 border-orange-400 bg-orange-50" noShadow>
          <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-orange-900">
              <span className="font-bold">Sign In Required</span>: To save your draft and track this application later, please sign in.
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Link to="/auth/signin" className="w-full sm:w-auto"><Button size="sm" className="whitespace-nowrap bg-orange-500 hover:bg-orange-600 border-none text-white w-full">Sign In</Button></Link>
              <Link to="/auth/signup" className="w-full sm:w-auto"><Button size="sm" variant="outline" className="whitespace-nowrap border-orange-500 text-orange-600 bg-transparent hover:bg-orange-100 w-full">Create Account</Button></Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form Steps */}
      <Card className="shadow-lg border-t-4 border-t-[#00a898]">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={(e) => e.preventDefault()}>
            
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">{config.step1Title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {config.step1Fields.map(renderField)}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">{config.step2Title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {config.step2Fields.map(renderField)}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Supporting Documents</h3>
                <FileUploader 
                  requiredDocs={config.requiredDocs} 
                  files={files}
                  onFileSelect={handleFileSelect}
                  onFileRemove={handleFileRemove}
                />
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Review Application</h3>
                
                <div className="bg-gray-50 p-6 rounded-lg space-y-6 border border-gray-200 text-sm">
                   <div className="grid grid-cols-2 gap-4">
                      <div><span className="text-gray-500 block">Service</span> <span className="font-semibold text-gray-900">{config.title}</span></div>
                      <div><span className="text-gray-500 block">Fee</span> <span className="font-semibold text-gray-900">{config.fee}</span></div>
                   </div>
                   
                   <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-bold text-[#00a898] mb-2">{config.step1Title}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                        {config.step1Fields.map(f => (
                           <div key={f.id}><span className="text-gray-500 block">{f.label}</span> <span className="font-medium text-gray-900 break-words">{formData[f.id] || '--'}</span></div>
                        ))}
                      </div>
                   </div>

                   <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-bold text-[#00a898] mb-2">{config.step2Title}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                         {config.step2Fields.map(f => (
                           <div key={f.id}><span className="text-gray-500 block">{f.label}</span> <span className="font-medium text-gray-900 break-words">{formData[f.id] || '--'}</span></div>
                        ))}
                      </div>
                   </div>

                   <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-bold text-[#00a898] mb-2">Documents</h4>
                      <ul className="pl-0 space-y-2 text-gray-700">
                        {config.requiredDocs.map(d => (
                          <li key={d} className="flex items-center">
                            {files[d] ? <CheckCircle2 size={16} className="text-green-500 mr-2 shrink-0" /> : <AlertCircle size={16} className="text-red-400 mr-2 shrink-0" />}
                            <span className="truncate">
                              {d} 
                              <span className="ml-2 text-xs text-gray-500">
                                {files[d] ? `(${files[d].name})` : '(Not attached)'}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox id="confirm" className="mt-1" />
                  <label htmlFor="confirm" className="text-sm text-gray-600 leading-relaxed">
                    I declare that the information provided is true and correct. I understand that providing false information is an offense.
                  </label>
                </div>
              </div>
            )}

            {/* Step 5: Payment */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Secure Payment</h3>
                
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Payment Summary</span>
                    <span className="text-lg font-bold text-[#00a898]">{config.fee}</span>
                  </div>
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div 
                          className={`p-4 border-2 rounded-lg flex items-center cursor-pointer transition-all ${paymentMethod === 'momo' ? 'border-[#00a898] bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}
                          onClick={() => setPaymentMethod('momo')}
                        >
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm">
                            <Smartphone className={paymentMethod === 'momo' ? 'text-[#00a898]' : 'text-yellow-600'} size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">MTN MoMo</p>
                            <p className="text-xs text-gray-500">Mobile Money</p>
                          </div>
                          {paymentMethod === 'momo' && (
                            <div className="ml-auto">
                              <CheckCircle2 className="text-[#00a898]" size={20} />
                            </div>
                          )}
                        </div>
                        <div 
                          className={`p-4 border-2 rounded-lg flex items-center cursor-pointer transition-all ${paymentMethod === 'cashit' ? 'border-[#00a898] bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}
                          onClick={() => setPaymentMethod('cashit')}
                        >
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm">
                            <Smartphone className={paymentMethod === 'cashit' ? 'text-[#00a898]' : 'text-[#00a898]'} size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Cashit</p>
                            <p className="text-xs text-gray-500">Mobile Money</p>
                          </div>
                          {paymentMethod === 'cashit' && (
                            <div className="ml-auto">
                              <CheckCircle2 className="text-[#00a898]" size={20} />
                            </div>
                          )}
                        </div>
                        <div 
                          className={`p-4 border-2 rounded-lg flex items-center cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#00a898] bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}
                          onClick={() => setPaymentMethod('card')}
                        >
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm">
                            <CreditCard className={paymentMethod === 'card' ? 'text-[#00a898]' : 'text-blue-600'} size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Bank Card</p>
                            <p className="text-xs text-gray-500">Visa / Mastercard</p>
                          </div>
                          {paymentMethod === 'card' && (
                            <div className="ml-auto">
                              <CheckCircle2 className="text-[#00a898]" size={20} />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {paymentMethod !== 'card' ? (
                          <div>
                            <Label htmlFor="phoneNumber">{paymentMethod === 'momo' ? 'MTN MoMo' : 'Cashit'} Phone Number</Label>
                            <div className="relative mt-1">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+211</span>
                              <Input id="phoneNumber" className="pl-14" placeholder="9XXXXXXXX" />
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1">A payment prompt will be sent to this number.</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input id="expiry" placeholder="MM/YY" />
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                        <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={18} />
                        <p className="text-xs text-blue-800 leading-relaxed">
                          Your payment is processed securely. {paymentMethod !== 'card' ? `After clicking "Pay & Submit", please check your phone for the ${paymentMethod === 'momo' ? 'MTN MoMo' : 'Cashit'} PIN prompt to authorize the transaction.` : 'After clicking "Pay & Submit", you will be redirected to the bank\'s secure verification page.'}
                        </p>
                      </div>
                    </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-between mt-10 pt-6 border-t border-gray-100 gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrev} 
                disabled={currentStep === 1 || isSubmitting}
                className="w-full sm:w-24 md:w-32"
              >
                Previous
              </Button>
              
              {currentStep < 5 ? (
                <div className="flex flex-col-reverse sm:flex-row gap-4 w-full sm:w-auto">
                   <Button 
                     type="button" 
                     variant="ghost" 
                     onClick={handleSaveDraft}
                     disabled={isSaving}
                     className="w-full sm:w-auto text-gray-600 hover:text-[#00a898]"
                   >
                      {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
                      Save Draft
                   </Button>
                   <Button type="button" onClick={handleNext} className="w-full sm:w-auto px-8">
                     {currentStep === 4 ? 'Proceed to Payment' : 'Next'}
                   </Button>
                </div>
              ) : (
                <Button 
                  type="button" 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 bg-[#00a898] hover:bg-[#008f81]"
                >
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing Payment</> : <><CreditCard className="mr-2 h-4 w-4" /> Pay & Submit Application</>}
                </Button>
              )}
            </div>

          </form>
        </CardContent>
      </Card>

    </div>
  );
};

export default EFilingForm;
