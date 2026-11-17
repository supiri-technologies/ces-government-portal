
import React, { useState } from 'react';
import { FileText, Download, DollarSign, Briefcase, Heart, GraduationCap, Home, Scale } from 'lucide-react';
import { Card, CardContent } from '../components/ui';
import { DOCUMENTS } from '../data';
import { Document } from '../types';
import { DocumentViewer } from '../components/DocumentViewer';

const DocumentGroup = ({ 
  title, 
  icon: Icon, 
  description, 
  docs, 
  type = 'list',
  color = "text-[#00a898]",
  bg = "bg-[#d2f2d4]",
  onSelect
}: { 
  title: string; 
  icon: React.ElementType; 
  description?: string; 
  docs: Document[]; 
  type?: 'grid' | 'list';
  color?: string;
  bg?: string;
  onSelect: (doc: Document) => void;
}) => {
  if (type === 'list') {
    return (
      <Card className="h-full border-none shadow-sm">
         <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
                <div className={`p-3 rounded-xl ${bg} ${color}`}>
                   <Icon size={24} />
                </div>
                <h3 className="font-bold text-lg text-gray-900">{title}</h3>
            </div>
            
            {description && <p className="text-gray-600 mb-6 text-sm">{description}</p>}

            <div className="space-y-3">
                {docs.map((doc, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => onSelect(doc)}
                    className="group flex items-center justify-between py-3 px-4 bg-white border border-gray-100 rounded-xl hover:border-[#00a898] hover:shadow-sm hover:bg-[#dff1f0] transition-all duration-200 cursor-pointer"
                  >
                     <div className="flex items-center space-x-2 overflow-hidden">
                       <span className="text-[#00a898] font-semibold text-sm group-hover:underline decoration-[#00a898] underline-offset-2 truncate">
                         {doc.title}
                       </span>
                     </div>
                     <div className="flex items-center space-x-3 shrink-0 ml-2">
                        <span className="text-xs text-gray-500 hidden sm:inline">{doc.size}</span>
                        <Download size={16} className="text-gray-400 group-hover:text-[#00a898] transition-colors" />
                     </div>
                  </div>
                ))}
            </div>
         </CardContent>
      </Card>
    );
  }
  return null;
};

const Documents = () => {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const publicDocs = DOCUMENTS.filter(d => d.category === 'Public Documents');
  const fees = DOCUMENTS.filter(d => d.category === 'Service Fees');

  const formCategories = [
    { title: "Civil Documentation", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Business Services", icon: Briefcase, color: "text-green-600", bg: "bg-green-50" },
    { title: "Healthcare Services", icon: Heart, color: "text-red-600", bg: "bg-red-50" },
    { title: "Education Services", icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Land & Housing", icon: Home, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Legal Services", icon: Scale, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-12 space-y-16">
      
      {selectedDoc && (
        <DocumentViewer document={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}

      {/* Forms Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Downloadable Forms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {formCategories.map((cat, idx) => {
             const categoryDocs = DOCUMENTS.filter(d => d.category === cat.title);
             
             return (
               <Card key={idx} className="h-full border-none shadow-sm">
                 <CardContent className="p-6">
                   <div className="flex items-center space-x-4 mb-6">
                     <div className={`p-3 rounded-xl ${cat.bg} ${cat.color}`}>
                       <cat.icon size={24} />
                     </div>
                     <h3 className="font-bold text-lg text-gray-900">{cat.title}</h3>
                   </div>
                   
                   <div className="space-y-3">
                     {categoryDocs.map((doc, i) => (
                       <div 
                         key={i} 
                         onClick={() => setSelectedDoc(doc)}
                         className="group flex items-center justify-between py-3 px-4 bg-white border border-gray-100 rounded-xl hover:border-[#00a898] hover:shadow-sm hover:bg-[#dff1f0] transition-all duration-200 cursor-pointer"
                       >
                         <div className="flex items-center space-x-2 overflow-hidden">
                           <span className="text-[#00a898] font-semibold text-sm group-hover:underline decoration-[#00a898] underline-offset-2 truncate">
                             {doc.title}
                           </span>
                         </div>
                         <div className="flex items-center space-x-3 shrink-0 ml-2">
                            <span className="text-xs text-gray-500 hidden sm:inline">{doc.size}</span>
                            <Download size={16} className="text-gray-400 group-hover:text-[#00a898] transition-colors" />
                         </div>
                       </div>
                     ))}
                     {categoryDocs.length === 0 && (
                       <div className="text-sm text-gray-400 italic text-center py-2">No forms available</div>
                     )}
                   </div>
                 </CardContent>
               </Card>
             );
           })}
        </div>
      </div>

      {/* Public Docs & Fees */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <DocumentGroup 
          title="Public Documents" 
          icon={FileText}
          description="Access official government documents, reports, and publications."
          docs={publicDocs}
          type="list"
          color="text-green-700"
          bg="bg-green-100"
          onSelect={setSelectedDoc}
        />
        <DocumentGroup 
          title="Service Fees" 
          icon={DollarSign}
          description="Information on fees for government services and transactions."
          docs={fees}
          type="list"
          color="text-emerald-700"
          bg="bg-emerald-100"
          onSelect={setSelectedDoc}
        />
      </div>

    </div>
  );
};

export default Documents;
