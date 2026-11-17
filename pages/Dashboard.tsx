
import React, { useState } from 'react';
import { 
  FileText, Clock, CheckCircle2, AlertCircle, Download, 
  Search, Filter, MoreVertical, Eye, Printer, CreditCard, 
  FileCheck, Calendar, Bell, ChevronRight, X, ArrowRight,
  AlertTriangle, Circle, XCircle, PenLine, Play
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, Button, Badge, Input } from '../components/ui';

// ... (Interfaces and Mock Data remain the same) ...
// --- Interfaces ---

interface Stage {
  title: string;
  date?: string;
  status: 'completed' | 'current' | 'pending';
  description?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  appRef?: string;
}

interface Application {
  id: string;
  ref: string;
  service: string;
  date: string;
  status: 'Approved' | 'Processing' | 'Pending Payment' | 'Rejected' | 'Draft';
  lastUpdate: string;
  fee: string;
  documentUrl?: string; // If approved
  receiptUrl?: string; // If paid
  paymentMethod?: string; // Method used for payment
  stages?: Stage[]; // For processing apps
  rejectionReason?: string; // For rejected apps
  rejectionAction?: string; // Action user needs to take
  notifications?: Notification[];
}

// --- Mock Data ---

const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Payment Verified',
    message: 'Your payment for Birth Certificate (CES-BIR-2025-9932) has been confirmed.',
    date: '2025-02-18 10:05 AM',
    type: 'success',
    read: false,
    appRef: 'CES-BIR-2025-9932'
  },
  {
    id: 'n2',
    title: 'Document Review Started',
    message: 'An officer has started reviewing your Business Registration application.',
    date: '2025-02-12 09:00 AM',
    type: 'info',
    read: true,
    appRef: 'CES-BIZ-2025-8821'
  },
  {
    id: 'n3',
    title: 'Application Rejected',
    message: 'Your Land Registration application requires attention. Please check the details.',
    date: '2024-11-10 02:30 PM',
    type: 'error',
    read: true,
    appRef: 'CES-LND-2024-5541'
  }
];

const APPLICATIONS: Application[] = [
  {
    id: '1',
    ref: 'CES-BIZ-2025-8821',
    service: 'Business Registration',
    date: '2025-02-10',
    status: 'Approved',
    lastUpdate: '2025-02-15',
    fee: '5,000 SSP',
    documentUrl: 'CERT-BIZ-001',
    receiptUrl: 'REC-BIZ-8821',
    paymentMethod: 'Bank Card'
  },
  {
    id: '2',
    ref: 'CES-BIR-2025-9932',
    service: 'Birth Certificate',
    date: '2025-02-18',
    status: 'Processing',
    lastUpdate: '2025-02-19',
    fee: '500 SSP',
    receiptUrl: 'REC-BIR-9932',
    paymentMethod: 'MTN MoMo',
    stages: [
      { title: 'Application Submitted', date: 'Feb 18, 10:00 AM', status: 'completed', description: 'Application received successfully.' },
      { title: 'Payment Verified', date: 'Feb 18, 10:05 AM', status: 'completed', description: 'Payment of 500 SSP confirmed via MTN MoMo.' },
      { title: 'Document Verification', date: 'Feb 19, 09:30 AM', status: 'current', description: 'Civil Registry officer is reviewing attached documents.' },
      { title: 'Approval', status: 'pending', description: 'Final sign-off by registrar.' },
      { title: 'Certificate Issuance', status: 'pending', description: 'Digital certificate generation.' }
    ],
    notifications: [NOTIFICATIONS[0]]
  },
  {
    id: '3',
    ref: 'CES-TRD-2025-1102',
    service: 'Trade License',
    date: '2025-02-20',
    status: 'Pending Payment',
    lastUpdate: '2025-02-20',
    fee: '3,000 SSP'
  },
  {
    id: '4',
    ref: 'CES-LND-2024-5541',
    service: 'Land Registration',
    date: '2024-11-05',
    status: 'Rejected',
    lastUpdate: '2024-11-10',
    fee: '15,000 SSP',
    rejectionReason: 'The provided Title Deed document is illegible and does not match the plot number.',
    rejectionAction: 'Please re-scan the original Title Deed in high resolution (color) and re-submit the application.',
    notifications: [NOTIFICATIONS[2]]
  },
  {
    id: '5',
    ref: 'DRAFT-001',
    service: 'Building Permit',
    date: '2025-02-21',
    status: 'Draft',
    lastUpdate: '2025-02-21',
    fee: '7,500 SSP'
  },
  // --- New Issued Documents (Approved) ---
  {
    id: '6',
    ref: 'CES-HEA-2024-1105',
    service: 'Health Insurance',
    date: '2024-10-15',
    status: 'Approved',
    lastUpdate: '2024-10-20',
    fee: 'Free',
    receiptUrl: 'REC-HEA-1105'
  },
  {
    id: '7',
    ref: 'CES-NID-2023-5592',
    service: 'National ID',
    date: '2023-05-12',
    status: 'Approved',
    lastUpdate: '2023-06-01',
    fee: '300 SSP',
    receiptUrl: 'REC-NID-5592'
  },
  {
    id: '8',
    ref: 'CES-TAX-2024-8821',
    service: 'Tax Registration',
    date: '2024-12-01',
    status: 'Approved',
    lastUpdate: '2024-12-05',
    fee: '1,000 SSP',
    receiptUrl: 'REC-TAX-8821'
  }
];

// --- Helpers ---
const getServiceSlug = (name: string) => name.toLowerCase().replace(/ /g, '-');

// --- Components ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Approved': 'bg-green-100 text-green-700 border-green-200',
    'Processing': 'bg-blue-100 text-blue-700 border-blue-200',
    'Pending Payment': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Rejected': 'bg-red-100 text-red-700 border-red-200',
    'Draft': 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const icons: Record<string, React.ElementType> = {
    'Approved': CheckCircle2,
    'Processing': Clock,
    'Pending Payment': CreditCard,
    'Rejected': XCircle,
    'Draft': PenLine
  };

  const Icon = icons[status] || FileText;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles['Draft']}`}>
      <Icon size={12} className="mr-1.5" />
      {status}
    </span>
  );
};

// Component for an active application card
const ActiveApplicationCard: React.FC<{ 
  app: Application, 
  onTrack: () => void, 
  onContinue: (app: Application) => void 
}> = ({ app, onTrack, onContinue }) => {
  const getAction = () => {
    if (app.status === 'Draft') return { label: 'Continue', onClick: () => onContinue(app) };
    if (app.status === 'Pending Payment') return { label: 'Pay Now', onClick: onTrack };
    if (app.status === 'Rejected') return { label: 'Fix Issues', onClick: onTrack };
    return { label: 'Track', onClick: onTrack };
  };

  const action = getAction();

  return (
    <Card 
      className="border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group overflow-hidden bg-white"
      onClick={onTrack}
    >
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 group-hover:text-[#00a898] transition-colors leading-tight">
                {app.service}
              </h3>
              <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                {app.ref}
              </p>
            </div>
            <StatusBadge status={app.status} />
          </div>

          {app.status === 'Processing' && app.stages && (
            <div className="mb-2">
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-gray-500 font-medium uppercase tracking-tighter">Progress</span>
                <span className="text-[#00a898] font-bold">
                  {app.stages.filter(s => s.status === 'completed').length} / {app.stages.length} Stages
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#00a898] transition-all duration-500" 
                  style={{ width: `${(app.stages.filter(s => s.status === 'completed').length / app.stages.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 flex items-center italic">
                <span className="w-1 h-1 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span>
                Current: {app.stages.find(s => s.status === 'current')?.title || 'In Review'}
              </p>
            </div>
          )}

          {app.status !== 'Processing' && (
             <div className="flex items-center text-[10px] text-gray-500 mb-2">
               <Clock size={12} className="mr-1.5 text-gray-400" />
               <span>Updated {app.lastUpdate}</span>
             </div>
          )}
        </div>

        <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 flex justify-end">
          <div className="text-[11px] font-bold text-[#00a898] flex items-center group-hover:translate-x-1 transition-transform">
            {action.label} <ArrowRight size={12} className="ml-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Modal to show application details
const ApplicationDetailsModal = ({ app, onClose, onViewCert, onViewReceipt }: { app: Application, onClose: () => void, onViewCert: () => void, onViewReceipt: (app: Application) => void }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/portal/efiling/${getServiceSlug(app.service)}`);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
           <div>
             <h3 className="text-xl font-bold text-gray-900">{app.service}</h3>
             <p className="text-sm text-gray-500 font-mono mt-1">Ref: {app.ref}</p>
           </div>
           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
             <X size={24} />
           </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
             <div>
               <p className="text-xs text-gray-500 uppercase font-bold">Current Status</p>
               <div className="mt-1"><StatusBadge status={app.status} /></div>
             </div>
             <div className="sm:text-right">
               <p className="text-xs text-gray-500 uppercase font-bold">Last Updated</p>
               <p className="font-medium text-gray-900">{app.lastUpdate}</p>
             </div>
          </div>

          {/* Payment Receipt Link */}
          {app.receiptUrl && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Payment Confirmed</p>
                  <p className="text-xs text-gray-600">Fee: {app.fee}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => onViewReceipt(app)} className="bg-white text-blue-600 border-blue-200 hover:bg-blue-50">
                <Download size={14} className="mr-2" /> Receipt
              </Button>
            </div>
          )}

          {/* Conditional Content based on Status */}
          
          {/* PROCESSING Timeline */}
          {(app.status === 'Processing' || app.status === 'Approved') && app.stages && (
            <div className="space-y-6">
              <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Tracking History</h4>
              <div className="relative pl-4 border-l-2 border-gray-200 space-y-8">
                {app.stages.map((stage, idx) => (
                  <div key={idx} className="relative">
                    {/* Dot */}
                    <div className={`absolute -left-[21px] top-1 w-4 h-4 rounded-full border-2 
                      ${stage.status === 'completed' ? 'bg-[#00a898] border-[#00a898]' : 
                        stage.status === 'current' ? 'bg-white border-[#00a898] ring-4 ring-green-50' : 
                        'bg-gray-100 border-gray-300'}`}
                    ></div>
                    
                    <div>
                      <h5 className={`font-bold ${stage.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                        {stage.title}
                      </h5>
                      <p className="text-xs text-gray-500 mt-1">{stage.date || (stage.status === 'current' ? 'In Progress' : 'Pending')}</p>
                      {stage.description && <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded-lg">{stage.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REJECTED Info */}
          {app.status === 'Rejected' && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-100 rounded-lg p-5">
                 <div className="flex items-start space-x-3">
                   <AlertCircle className="text-red-600 shrink-0 mt-0.5" />
                   <div>
                     <h4 className="font-bold text-red-800">Application Rejected</h4>
                     <p className="text-red-700 text-sm mt-1">{app.rejectionReason}</p>
                   </div>
                 </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                 <h4 className="font-bold text-gray-900 mb-2">Required Action</h4>
                 <p className="text-gray-600 text-sm mb-4">{app.rejectionAction}</p>
                 <Button onClick={handleEdit} variant="outline" className="text-gray-900 border-gray-300 hover:bg-gray-50 w-full sm:w-auto">
                    Edit & Resubmit Application
                 </Button>
              </div>
            </div>
          )}

          {/* APPROVED Info */}
          {app.status === 'Approved' && (
            <div className="text-center py-8 space-y-4">
               <div className="w-16 h-16 bg-green-100 text-[#00a898] rounded-full flex items-center justify-center mx-auto">
                 <FileCheck size={32} />
               </div>
               <h4 className="text-lg font-bold text-gray-900">Document Ready</h4>
               <p className="text-gray-600 max-w-sm mx-auto">Your application has been approved and the official document has been generated.</p>
               <Button onClick={onViewCert} className="mt-4 w-full sm:w-auto">
                 <Download size={18} className="mr-2" /> View & Download Certificate
               </Button>
            </div>
          )}

          {/* PENDING PAYMENT Info */}
          {app.status === 'Pending Payment' && (
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6 text-center space-y-4">
               <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto">
                 <CreditCard size={24} />
               </div>
               <h4 className="font-bold text-gray-900">Payment Required</h4>
               <p className="text-sm text-gray-600">Please complete the payment of <span className="font-bold">{app.fee}</span> to process your application.</p>
               <Button onClick={() => navigate(`/portal/efiling/${getServiceSlug(app.service)}`)} className="bg-yellow-600 hover:bg-yellow-700 text-white border-none w-full sm:w-auto">Proceed to Payment</Button>
            </div>
          )}

          {/* DRAFT Info */}
          {app.status === 'Draft' && (
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 text-center space-y-4">
               <div className="w-12 h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mx-auto">
                 <PenLine size={24} />
               </div>
               <h4 className="font-bold text-gray-900">Application Saved as Draft</h4>
               <p className="text-sm text-gray-600">You have an incomplete application saved. You can continue from where you left off.</p>
               <Button onClick={handleEdit} className="bg-gray-800 hover:bg-gray-900 text-white border-none w-full sm:w-auto">
                  <Play size={16} className="mr-2" /> Continue Application
               </Button>
            </div>
          )}

          {/* App Notifications */}
          {app.notifications && app.notifications.length > 0 && (
            <div className="mt-8 space-y-4">
              <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Recent Alerts</h4>
              <div className="space-y-3">
                {app.notifications.map(notif => (
                  <div key={notif.id} className={`p-4 rounded-lg border flex gap-3 ${
                    notif.type === 'success' ? 'bg-green-50 border-green-100' :
                    notif.type === 'error' ? 'bg-red-50 border-red-100' :
                    notif.type === 'warning' ? 'bg-yellow-50 border-yellow-100' :
                    'bg-blue-50 border-blue-100'
                  }`}>
                    <Bell size={18} className={
                      notif.type === 'success' ? 'text-green-600' :
                      notif.type === 'error' ? 'text-red-600' :
                      notif.type === 'warning' ? 'text-yellow-600' :
                      'text-blue-600'
                    } />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{notif.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                      <p className="text-[10px] text-gray-400 mt-2">{notif.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
           <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

// Modal for Payment Receipt
const ReceiptModal = ({ app, onClose }: { app: Application, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <h3 className="font-semibold flex items-center">
            <CreditCard className="mr-2" size={18} /> Payment Receipt
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="p-8 space-y-6 text-center">
          <div className="w-16 h-16 bg-green-100 text-[#00a898] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Payment Successful</h2>
            <p className="text-gray-500">Transaction ID: TXN-{Math.floor(Math.random() * 1000000)}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 space-y-4 text-left border border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Service</span>
              <span className="font-bold text-gray-900">{app.service}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Reference</span>
              <span className="font-mono text-gray-900">{app.ref}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="text-gray-900">{app.lastUpdate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Method</span>
              <span className="text-gray-900">{app.paymentMethod || 'MTN MoMo'}</span>
            </div>
            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="font-bold text-gray-900">Amount Paid</span>
              <span className="text-xl font-black text-[#00a898]">{app.fee}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => window.print()}>
              <Printer size={16} className="mr-2" /> Print
            </Button>
            <Button className="flex-1 bg-[#00a898] hover:bg-[#008f81]">
              <Download size={16} className="mr-2" /> Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal for the actual Certificate View
const CertificateModal = ({ app, onClose }: { app: Application, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Print Styles */}
      <style>{`
        @media print {
          body { visibility: hidden; }
          #printable-certificate { visibility: visible; position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; border: none !important; box-shadow: none !important; }
          #printable-certificate * { visibility: visible; }
          .print-hidden { display: none !important; }
          @page { margin: 0; }
        }
      `}</style>
      
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Toolbar */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center shrink-0 print-hidden">
          <h3 className="font-semibold flex items-center">
            <FileCheck className="mr-2" size={18} /> Digital Document Preview
          </h3>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="secondary" onClick={() => window.print()} className="hidden sm:flex">
              <Printer size={16} className="mr-2" /> Print
            </Button>
            <Button size="sm" className="bg-[#00a898] hover:bg-[#008f81]" onClick={() => window.print()}>
              <Download size={16} className="mr-2" /> Download PDF
            </Button>
            <button onClick={onClose} className="text-gray-400 hover:text-white ml-2">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Certificate View */}
        <div className="overflow-y-auto p-4 md:p-8 bg-gray-100 flex-grow print:p-0 print:bg-white print:overflow-visible">
          <div id="printable-certificate" className="bg-white border-[6px] md:border-[10px] border-double border-[#00a898]/30 p-6 md:p-12 shadow-lg min-h-[500px] md:min-h-[600px] relative mx-auto max-w-2xl text-center print:shadow-none print:border-4 print:w-full print:max-w-none">
             {/* Watermark */}
             <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <img src="https://via.placeholder.com/400" className="w-64 h-64 md:w-96 md:h-96" alt="Seal" />
             </div>

             <div className="mb-8">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-[#00a898] rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl border-4 border-white shadow-md print:shadow-none">CES</div>
               <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-widest mb-1">Republic of South Sudan</h1>
               <h2 className="text-lg md:text-xl font-bold text-[#00a898] uppercase tracking-wide">Central Equatoria State</h2>
             </div>

             <div className="my-8 md:my-10">
               <div className="text-2xl md:text-4xl font-serif text-gray-900 mb-6 italic">Certificate of Registration</div>
               <p className="text-gray-600 mb-6">This is to certify that the application for</p>
               <div className="text-xl md:text-2xl font-bold text-gray-900 border-b-2 border-gray-300 inline-block px-8 md:px-12 pb-2 mb-6 uppercase">
                 {app.service}
               </div>
               <p className="text-gray-600 mb-2">Has been duly processed and approved in accordance with the</p>
               <p className="text-gray-600 font-semibold">State Laws and Regulations, 2025</p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 text-left mt-8 md:mt-12 mb-8 md:mb-12 border-t border-b border-gray-200 py-6">
                <div className="text-center sm:text-left">
                  <p className="text-xs text-gray-500 uppercase">Reference No.</p>
                  <p className="font-mono font-bold text-lg">{app.ref}</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs text-gray-500 uppercase">Date of Issue</p>
                  <p className="font-mono font-bold text-lg">{app.lastUpdate}</p>
                </div>
             </div>

             <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mt-12 md:mt-16 gap-8 sm:gap-0">
                <div className="text-center">
                   <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400 mb-2 rounded-full">
                     OFFICIAL<br/>SEAL
                   </div>
                </div>
                <div className="text-center w-48">
                   <div className="font-script text-2xl text-blue-900 mb-2" style={{fontFamily: 'cursive'}}>CES Registry</div>
                   <div className="border-t border-gray-900 pt-1 text-xs font-bold uppercase">Registrar General</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'documents' | 'notifications'>('overview');
  
  // Modals state
  const [viewingApp, setViewingApp] = useState<Application | null>(null); // For details modal
  const [viewingCert, setViewingCert] = useState<Application | null>(null); // For certificate modal
  const [viewingReceipt, setViewingReceipt] = useState<Application | null>(null); // For receipt modal
  
  // Filtering state
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Derived Lists
  const myDocuments = APPLICATIONS.filter(app => app.status === 'Approved');
  const activeApplications = APPLICATIONS.filter(app => app.status !== 'Approved');
  const pendingActions = APPLICATIONS.filter(app => app.status === 'Pending Payment' || app.status === 'Draft' || app.status === 'Rejected');
  const unreadNotifications = NOTIFICATIONS.filter(n => !n.read);
  
  // Filtered Applications for the table (History)
  const filteredApplications = APPLICATIONS.filter(app => {
    // If filtering by a specific status, show that
    if (statusFilter !== 'All') {
      if (statusFilter === 'Action Required') return ['Pending Payment', 'Draft', 'Rejected'].includes(app.status);
      return app.status === statusFilter;
    }
    // Default view for table: Approved applications (History)
    return app.status === 'Approved';
  });

  const handleCardClick = (tab: 'overview' | 'applications' | 'documents' | 'notifications', filter: string = 'All') => {
    setActiveTab(tab);
    setStatusFilter(filter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueDraft = (app: Application) => {
    navigate(`/portal/efiling/${getServiceSlug(app.service)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Details Modal */}
      {viewingApp && (
        <ApplicationDetailsModal 
          app={viewingApp} 
          onClose={() => setViewingApp(null)} 
          onViewCert={() => { setViewingApp(null); setViewingCert(viewingApp); }}
          onViewReceipt={(app) => { setViewingApp(null); setViewingReceipt(app); }}
        />
      )}
      
      {/* Certificate Modal */}
      {viewingCert && (
        <CertificateModal app={viewingCert} onClose={() => setViewingCert(null)} />
      )}

      {/* Receipt Modal */}
      {viewingReceipt && (
        <ReceiptModal app={viewingReceipt} onClose={() => setViewingReceipt(null)} />
      )}

      {/* Dashboard Header */}
      <div className="bg-[#00a898] pt-12 pb-12 lg:pb-24 px-4 md:px-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-16 -mb-16 pointer-events-none"></div>
        
        <div className="container mx-auto max-w-[95%]">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, John</h1>
                <p className="text-green-100 text-sm md:text-base">Manage your applications and access your documents.</p>
             </div>
             <div className="flex space-x-3">
               <Link to="/portal" className="flex items-center text-white font-semibold hover:underline decoration-2 underline-offset-4 transition-all text-sm md:text-base">
                 Start New Application <ArrowRight size={20} className="ml-2" />
               </Link>
             </div>
           </div>

           {/* Stats Row - Responsively adjusted position */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 lg:translate-y-16">
              {[
                { label: 'Total Applications', value: APPLICATIONS.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', filter: 'All', tab: 'applications' },
                { label: 'Approved', value: myDocuments.length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', filter: 'Approved', tab: 'applications' },
                { label: 'In Progress', value: APPLICATIONS.filter(a => a.status === 'Processing').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', filter: 'Processing', tab: 'applications' },
                { label: 'Action Required', value: pendingActions.length, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', filter: 'Action Required', tab: 'applications' },
              ].map((stat, i) => (
                <Card 
                  key={i} 
                  className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border-none cursor-pointer"
                  onClick={() => handleCardClick(stat.tab as any, stat.filter)}
                >
                  <CardContent className="p-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                  </CardContent>
                </Card>
              ))}
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-[95%] px-4 md:px-8 mt-8 lg:mt-24">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 space-y-6">
               <div className="bg-white rounded-lg shadow-sm p-2 space-y-1 overflow-x-auto flex lg:block lg:overflow-visible whitespace-nowrap lg:whitespace-normal">
                  <button 
                    onClick={() => handleCardClick('overview', 'All')}
                    className={`flex-1 lg:w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-[#d2f2d4] text-[#00a898]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <div className="w-5"><FileText size={18} /></div>
                    <span>Overview</span>
                  </button>
                  <button 
                    onClick={() => handleCardClick('applications', 'All')}
                    className={`flex-1 lg:w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'applications' ? 'bg-[#d2f2d4] text-[#00a898]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <div className="w-5"><Clock size={18} /></div>
                    <span>All Applications</span>
                    <Badge className="ml-2 lg:ml-auto bg-gray-100 text-gray-600">{APPLICATIONS.length}</Badge>
                  </button>
                  <button 
                    onClick={() => handleCardClick('documents', 'All')}
                    className={`flex-1 lg:w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'documents' ? 'bg-[#d2f2d4] text-[#00a898]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <div className="w-5"><FileCheck size={18} /></div>
                    <span>My Documents</span>
                    <Badge className="ml-2 lg:ml-auto bg-[#00a898] text-white">{myDocuments.length}</Badge>
                  </button>
                  <button 
                    onClick={() => handleCardClick('notifications', 'All')}
                    className={`flex-1 lg:w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-[#d2f2d4] text-[#00a898]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <div className="w-5"><Bell size={18} /></div>
                    <span>Notifications</span>
                    {unreadNotifications.length > 0 && (
                      <Badge className="ml-2 lg:ml-auto bg-red-500 text-white">{unreadNotifications.length}</Badge>
                    )}
                  </button>
               </div>

               <div className="bg-[#f0f9f1] rounded-lg p-5 border border-green-100 hidden lg:block">
                  <h4 className="font-bold text-[#00a898] mb-2 flex items-center"><CreditCard size={16} className="mr-2" /> Pending Payments</h4>
                  <p className="text-xs text-gray-600 mb-4">You have {pendingActions.length} applications requiring attention.</p>
                  <Button size="sm" variant="outline" className="w-full bg-white text-[#00a898] border-[#00a898] hover:bg-green-50" onClick={() => handleCardClick('applications', 'Action Required')}>View Details</Button>
               </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9 space-y-6">
               
                {/* --- OVERVIEW TAB --- */}
               {activeTab === 'overview' && (
                 <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* Active Applications (Cards) */}
                    {activeApplications.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-bold text-gray-900">Active Applications</h2>
                          <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                            {activeApplications.length} In Progress
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {activeApplications.map((app) => (
                            <ActiveApplicationCard 
                              key={app.id} 
                              app={app} 
                              onTrack={() => setViewingApp(app)}
                              onContinue={handleContinueDraft}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Applications (Table - Approved Only) */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Recent Applications</h2>
                        <button onClick={() => handleCardClick('applications', 'Approved')} className="text-sm text-[#00a898] hover:underline">View History</button>
                      </div>
                      
                      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                         <div className="overflow-x-auto">
                           <table className="w-full text-sm text-left whitespace-nowrap">
                             <thead className="bg-gray-50 text-gray-500 font-medium">
                               <tr>
                                 <th className="px-6 py-3">Reference</th>
                                 <th className="px-6 py-3">Service</th>
                                 <th className="px-6 py-3">Status</th>
                                 <th className="px-6 py-3">Date</th>
                                 <th className="px-6 py-3 text-right">Action</th>
                               </tr>
                             </thead>
                             <tbody className="divide-y divide-gray-100">
                               {myDocuments.slice(0, 5).map((app) => (
                                 <tr key={app.id} className="hover:bg-gray-50/50">
                                   <td className="px-6 py-4 font-mono text-gray-600">{app.ref}</td>
                                   <td className="px-6 py-4 font-medium text-gray-900">{app.service}</td>
                                   <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
                                   <td className="px-6 py-4 text-gray-500">{app.date}</td>
                                   <td className="px-6 py-4 text-right">
                                      <button onClick={() => setViewingCert(app)} className="text-[#00a898] hover:text-[#008f81] font-medium flex items-center justify-end w-full">
                                        <Download size={16} className="mr-1" /> Get Doc
                                      </button>
                                   </td>
                                 </tr>
                               ))}
                               {myDocuments.length === 0 && (
                                 <tr>
                                   <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                     No approved applications yet.
                                   </td>
                                 </tr>
                               )}
                             </tbody>
                           </table>
                         </div>
                      </div>
                    </div>

                    {/* Quick Access to Wallet */}
                    <div className="space-y-4">
                       <h2 className="text-lg font-bold text-gray-900">Issued Documents (Digital Wallet)</h2>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {myDocuments.slice(0, 4).map((doc) => (
                             <div key={doc.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-4">
                                <div className="p-3 bg-green-50 text-[#00a898] rounded-lg shrink-0">
                                   <FileCheck size={24} />
                                </div>
                                <div className="min-w-0">
                                   <h4 className="font-bold text-gray-900 truncate">{doc.service}</h4>
                                   <p className="text-xs text-gray-500 mb-3">Issued: {doc.lastUpdate}</p>
                                   <Button size="sm" variant="outline" onClick={() => setViewingCert(doc)} className="h-8 text-xs">
                                     View & Download
                                   </Button>
                                </div>
                             </div>
                          ))}
                          {myDocuments.length === 0 && (
                             <div className="col-span-2 text-center py-8 text-gray-500 bg-white rounded-lg border border-dashed border-gray-200">
                                No documents issued yet.
                             </div>
                          )}
                       </div>
                    </div>
                 </div>
               )}

               {/* --- APPLICATIONS TAB --- */}
               {activeTab === 'applications' && (
                 <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* Active Applications Section (Only if no specific filter or filtering for active ones) */}
                    {(statusFilter === 'All' || ['Processing', 'Pending Payment', 'Draft', 'Rejected', 'Action Required'].includes(statusFilter)) && activeApplications.length > 0 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">Active Applications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {activeApplications
                            .filter(app => {
                              if (statusFilter === 'All') return true;
                              if (statusFilter === 'Action Required') return ['Pending Payment', 'Draft', 'Rejected'].includes(app.status);
                              return app.status === statusFilter;
                            })
                            .map((app) => (
                              <ActiveApplicationCard 
                                key={app.id} 
                                app={app} 
                                onTrack={() => setViewingApp(app)}
                                onContinue={handleContinueDraft}
                              />
                            ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                       <div className="w-full sm:w-auto">
                         <h2 className="text-xl font-bold text-gray-900">Application History</h2>
                         <p className="text-sm text-gray-500">
                           {statusFilter === 'All' ? 'Showing all approved documents' : `Filtering by: ${statusFilter}`}
                         </p>
                       </div>
                       <div className="flex gap-2 w-full sm:w-auto">
                          {statusFilter !== 'All' && (
                            <Button variant="ghost" size="sm" onClick={() => setStatusFilter('All')} className="text-red-500 hover:bg-red-50 hover:text-red-600 whitespace-nowrap">
                              <X size={16} className="mr-2" /> Clear Filter
                            </Button>
                          )}
                          <Input placeholder="Search ref or service..." className="w-full sm:w-64" />
                       </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                       <div className="overflow-x-auto">
                         <table className="w-full text-sm text-left whitespace-nowrap">
                           <thead className="bg-gray-50 text-gray-500 font-medium">
                             <tr>
                               <th className="px-6 py-4">Reference</th>
                               <th className="px-6 py-4">Service</th>
                               <th className="px-6 py-4">Status</th>
                               <th className="px-6 py-4">Last Update</th>
                               <th className="px-6 py-4">Fee</th>
                               <th className="px-6 py-4 text-right">Actions</th>
                             </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-100">
                             {filteredApplications.length > 0 ? (
                               filteredApplications.map((app) => (
                                 <tr key={app.id} className="hover:bg-gray-50/50">
                                   <td className="px-6 py-4 font-mono text-gray-600">{app.ref}</td>
                                   <td className="px-6 py-4 font-medium text-gray-900">{app.service}</td>
                                   <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
                                   <td className="px-6 py-4 text-gray-500">{app.lastUpdate}</td>
                                   <td className="px-6 py-4 text-gray-600">{app.fee}</td>
                                   <td className="px-6 py-4 text-right">
                                      <div className="flex items-center justify-end space-x-2">
                                         <button 
                                            onClick={() => setViewingApp(app)} 
                                            className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors" 
                                            title="View Details"
                                         >
                                            <Eye size={16} />
                                         </button>
                                         {app.status === 'Approved' && (
                                           <button 
                                              onClick={() => setViewingCert(app)} 
                                              className="p-1.5 hover:bg-green-50 rounded text-green-600 transition-colors" 
                                              title="Download Document"
                                           >
                                              <Download size={16} />
                                           </button>
                                         )}
                                         {app.status === 'Draft' && (
                                            <button 
                                                onClick={() => handleContinueDraft(app)} 
                                                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition-colors" 
                                                title="Continue Application"
                                            >
                                                <Play size={16} />
                                            </button>
                                         )}
                                      </div>
                                   </td>
                                 </tr>
                               ))
                             ) : (
                               <tr>
                                 <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                   No applications found matching the current filter.
                                 </td>
                               </tr>
                             )}
                           </tbody>
                         </table>
                       </div>
                    </div>
                 </div>
               )}

                {/* --- DOCUMENTS TAB --- */}
               {activeTab === 'documents' && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center">
                       <h2 className="text-xl font-bold text-gray-900">My Digital Wallet</h2>
                       <Button variant="outline" className="hidden sm:flex">
                         <Download size={16} className="mr-2" /> Download All
                       </Button>
                    </div>

                    <p className="text-gray-600">Access and download your officially issued government documents at any time.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {myDocuments.map((doc) => (
                          <Card key={doc.id} className="group hover:border-[#00a898] transition-colors cursor-pointer" onClick={() => setViewingCert(doc)}>
                             <CardContent className="p-0">
                                <div className="h-32 bg-gray-100 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                                   <FileCheck size={48} className="text-gray-300 group-hover:text-[#00a898]/50 transition-colors" />
                                   <div className="absolute top-3 right-3">
                                      <Badge className="bg-green-500 text-white">Active</Badge>
                                   </div>
                                </div>
                                <div className="p-6">
                                   <div className="flex justify-between items-start mb-2">
                                      <div>
                                         <h3 className="font-bold text-gray-900 truncate">{doc.service}</h3>
                                         <p className="text-xs text-gray-500 font-mono mt-1">{doc.ref}</p>
                                      </div>
                                      <div className="bg-green-50 p-2 rounded-full text-[#00a898]">
                                         <CheckCircle2 size={18} />
                                      </div>
                                   </div>
                                   <div className="mt-4 flex space-x-3">
                                      <Button className="flex-1" size="sm" onClick={(e) => { e.stopPropagation(); setViewingApp(doc); }}>View Details</Button>
                                      <Button variant="outline" size="sm" className="flex-1" onClick={(e) => { e.stopPropagation(); setViewingCert(doc); }}>
                                         <Download size={16} className="mr-2" /> PDF
                                      </Button>
                                   </div>
                                </div>
                             </CardContent>
                          </Card>
                       ))}
                       
                       {/* Empty State for Docs */}
                       {myDocuments.length === 0 && (
                          <div className="col-span-1 md:col-span-2 bg-white rounded-lg border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center">
                             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <FileText size={32} className="text-gray-400" />
                             </div>
                             <h3 className="text-lg font-bold text-gray-900">No Documents Found</h3>
                             <p className="text-gray-500 mt-2 max-w-sm">You haven't received any issued documents yet. Once your applications are approved, they will appear here.</p>
                             <Button className="mt-6" onClick={() => handleCardClick('applications', 'All')}>Check Application Status</Button>
                          </div>
                       )}
                    </div>
                 </div>
               )}

               {/* --- NOTIFICATIONS TAB --- */}
               {activeTab === 'notifications' && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center">
                       <h2 className="text-xl font-bold text-gray-900">Notifications & Alerts</h2>
                       <Button variant="ghost" size="sm" className="text-gray-500">Mark all as read</Button>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
                       {NOTIFICATIONS.map((notif) => (
                          <div key={notif.id} className={`p-6 flex gap-4 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50/30' : ''}`}>
                             <div className={`p-3 rounded-full shrink-0 h-fit ${
                               notif.type === 'success' ? 'bg-green-100 text-green-600' :
                               notif.type === 'error' ? 'bg-red-100 text-red-600' :
                               notif.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                               'bg-blue-100 text-blue-600'
                             }`}>
                                <Bell size={20} />
                             </div>
                             <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                   <h4 className={`font-bold ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>{notif.title}</h4>
                                   <span className="text-xs text-gray-400">{notif.date}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                                {notif.appRef && (
                                   <button 
                                      onClick={() => {
                                        const app = APPLICATIONS.find(a => a.ref === notif.appRef);
                                        if (app) setViewingApp(app);
                                      }}
                                      className="text-xs font-bold text-[#00a898] mt-3 hover:underline flex items-center"
                                   >
                                      View Application Details <ChevronRight size={14} className="ml-1" />
                                   </button>
                                )}
                             </div>
                             {!notif.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                             )}
                          </div>
                       ))}
                    </div>
                 </div>
               )}

            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
