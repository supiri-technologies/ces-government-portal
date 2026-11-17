
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Calendar, Filter, Info, ChevronRight, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, Select } from '../components/ui';
import { DocumentViewer } from '../components/DocumentViewer';
import { Document } from '../types';

// Mock Data for Directives
const DIRECTIVES_DATA = [
  {
    id: 'DIR-2025-05',
    number: '05/2025',
    title: 'Mandatory Registration of NGOs',
    date: '2025-02-19',
    description: 'Directive requiring all NGOs operating in the state to renew operation licenses by Q1 2025.',
    fileSize: '0.5 MB'
  },
  {
    id: 'DIR-2025-04',
    number: '04/2025',
    title: 'Strict Adherence to Building Codes',
    date: '2025-02-10',
    description: 'Order for municipal councils to enforce building standards and halt illegal constructions.',
    fileSize: '0.8 MB'
  },
  {
    id: 'DIR-2025-03',
    number: '03/2025',
    title: 'Prohibition of Charcoal Export',
    date: '2025-01-25',
    description: 'Strict ban on the commercial export of charcoal to neighboring countries to preserve forests.',
    fileSize: '0.4 MB'
  },
  {
    id: 'DIR-2025-02',
    number: '02/2025',
    title: 'Traffic Management During Peak Hours',
    date: '2025-01-15',
    description: 'Directive to Traffic Police to implement new flow control measures in Juba City.',
    fileSize: '0.6 MB'
  },
  {
    id: 'DIR-2025-01',
    number: '01/2025',
    title: 'Clean City Campaign Initiative',
    date: '2025-01-05',
    description: 'Mandatory participation of all businesses in weekly cleaning exercises.',
    fileSize: '0.3 MB'
  },
  {
    id: 'DIR-2024-18',
    number: '18/2024',
    title: 'Regulation of Night Clubs Opening Hours',
    date: '2024-12-10',
    description: 'Limiting operating hours for entertainment venues in residential areas.',
    fileSize: '0.7 MB'
  }
];

const Directives = () => {
  const [activeTab, setActiveTab] = useState<'recent' | 'archive'>('recent');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Group orders by Year -> Month for Archive
  const getArchivedDirectives = (year: string) => {
    const ordersInYear = DIRECTIVES_DATA.filter(o => o.date.startsWith(year));
    // Group by month
    const grouped: Record<string, typeof DIRECTIVES_DATA> = {};
    
    ordersInYear.forEach(order => {
      const date = new Date(order.date);
      const month = date.toLocaleString('default', { month: 'long' });
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(order);
    });

    return grouped;
  };

  const handleOpenDoc = (item: typeof DIRECTIVES_DATA[0]) => {
    setSelectedDoc({
      id: item.id,
      title: item.title,
      category: 'Directive',
      size: item.fileSize,
      date: item.date
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {selectedDoc && (
        <DocumentViewer document={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-8">
           <Link to="/government" className="inline-flex items-center text-[#00a898] hover:underline mb-4 text-sm font-medium">
             <ChevronLeft size={16} className="mr-1" /> Back to Government
           </Link>
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Government Directives</h1>
           <p className="text-gray-600 mt-2 text-lg">
             Official instructions and mandates issued by the State Secretariat and Ministries.
           </p>

           <div className="mt-8 w-full">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                 <Info size={20} className="text-[#00a898] mr-2" /> About Directives
              </h3>
              <p className="text-gray-700 leading-relaxed">
                 Directives are authoritative instructions issued by the State Government to ensure compliance with laws, implement specific policies, or address urgent public matters. They are binding for all targeted institutions, businesses, and individuals within Central Equatoria State.
              </p>
           </div>
        </div>
      </div>

      <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           
           {/* Sidebar Controls */}
           <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                 <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                   <Filter size={18} className="mr-2" /> View Options
                 </h3>
                 <div className="space-y-2">
                    <button 
                      onClick={() => setActiveTab('recent')}
                      className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors flex justify-between items-center ${activeTab === 'recent' ? 'bg-[#d2f2d4] text-[#00a898]' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <span>Recent Directives</span>
                      {activeTab === 'recent' && <ChevronRight size={16} />}
                    </button>
                    <button 
                      onClick={() => setActiveTab('archive')}
                      className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors flex justify-between items-center ${activeTab === 'archive' ? 'bg-[#d2f2d4] text-[#00a898]' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <span>Browse Archives</span>
                      {activeTab === 'archive' && <ChevronRight size={16} />}
                    </button>
                 </div>
              </div>

              {activeTab === 'archive' && (
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 animate-in fade-in slide-in-from-top-2">
                   <h3 className="font-bold text-gray-900 mb-3 text-sm">Select Year</h3>
                   <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                   </Select>
                </div>
              )}
           </div>

           {/* Main List Area */}
           <div className="lg:col-span-3">
              {activeTab === 'recent' ? (
                <div className="space-y-6 animate-in fade-in">
                   <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Latest Directives</h2>
                   {DIRECTIVES_DATA.slice(0, 5).map((item) => (
                      <Card key={item.id} className="hover:border-red-300 transition-all group border-l-4 border-l-red-500">
                         <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                               <div className="shrink-0">
                                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                                     <AlertCircle size={24} />
                                  </div>
                               </div>
                               <div className="flex-grow">
                                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                     <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-1 rounded-full uppercase tracking-wide w-fit">
                                        Ref: {item.number}
                                     </span>
                                     <span className="text-sm text-gray-500 flex items-center mt-2 md:mt-0">
                                        <Calendar size={14} className="mr-1" /> {formatDate(item.date)}
                                     </span>
                                  </div>
                                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors mb-2">
                                    {item.title}
                                  </h3>
                                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                                  <div className="flex items-center space-x-6">
                                     <button 
                                        onClick={() => handleOpenDoc(item)}
                                        className="text-sm font-medium text-[#00a898] hover:underline bg-transparent border-none cursor-pointer p-0 flex items-center"
                                     >
                                        <FileText size={14} className="mr-1.5" /> View Official Document
                                     </button>
                                  </div>
                               </div>
                            </div>
                         </CardContent>
                      </Card>
                   ))}
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in">
                   <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Archive: {selectedYear}</h2>
                   
                   {Object.entries(getArchivedDirectives(selectedYear)).map(([month, items]) => (
                      <div key={month} className="space-y-4">
                         <h3 className="font-bold text-gray-800 text-lg sticky top-20 bg-gray-50 py-2">{month}</h3>
                         {items.map(item => (
                            <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                               <div className="flex items-center space-x-4">
                                  <div className="p-2 bg-red-50 rounded text-red-600">
                                     <FileText size={20} />
                                  </div>
                                  <div>
                                     <p className="text-xs text-red-600 font-bold">{item.number}</p>
                                     <h4 className="font-semibold text-gray-900 text-sm md:text-base">{item.title}</h4>
                                     <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
                                  </div>
                               </div>
                               <button 
                                 onClick={() => handleOpenDoc(item)} 
                                 className="text-gray-400 hover:text-[#00a898] p-2 bg-transparent border-none cursor-pointer"
                               >
                                  <Download size={20} />
                               </button>
                            </div>
                         ))}
                         {items.length === 0 && <p className="text-gray-500 text-sm italic">No directives found.</p>}
                      </div>
                   ))}
                   
                   {Object.keys(getArchivedDirectives(selectedYear)).length === 0 && (
                      <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-200">
                         <p className="text-gray-500">No directives found for {selectedYear}.</p>
                      </div>
                   )}
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Directives;
