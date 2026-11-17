
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ChevronLeft, Calendar, FileText, ArrowRight, Filter, ChevronRight, UserCircle2, Info } from 'lucide-react';
import { Card, CardContent, Select, Badge } from '../components/ui';
import { MINISTRIES } from '../data';
import { DocumentViewer } from '../components/DocumentViewer';
import { Document } from '../types';

const MEETINGS_DATA = [
  {
    id: 1,
    title: "Ordinary Council of Ministers Meeting No. 04/2025",
    date: "2025-02-20",
    summary: "The cabinet discussed the state budget for the fiscal year 2025/2026 and approved new measures for revenue collection enhancement.",
    resolutions: 4,
    type: "Ordinary"
  },
  {
    id: 2,
    title: "Extraordinary Cabinet Meeting on Security",
    date: "2025-02-05",
    summary: "Urgent meeting chaired by H.E. The Governor to address cattle-related conflicts in the northern counties.",
    resolutions: 2,
    type: "Extraordinary"
  },
  {
    id: 3,
    title: "Ordinary Council of Ministers Meeting No. 03/2025",
    date: "2025-01-15",
    summary: "Review of progress reports from the Ministry of Roads and Bridges regarding ongoing infrastructure projects.",
    resolutions: 5,
    type: "Ordinary"
  },
  {
    id: 4,
    title: "Ordinary Council of Ministers Meeting No. 02/2025",
    date: "2025-01-08",
    summary: "Discussion on the reopening of schools and new education policies.",
    resolutions: 3,
    type: "Ordinary"
  },
  {
    id: 5,
    title: "End of Year Cabinet Review 2024",
    date: "2024-12-20",
    summary: "Evaluation of the state government's performance in 2024.",
    resolutions: 10,
    type: "Special"
  },
  {
    id: 6,
    title: "Ordinary Council of Ministers Meeting No. 15/2024",
    date: "2024-11-14",
    summary: "Updates on the agricultural season and food security status.",
    resolutions: 4,
    type: "Ordinary"
  }
];

const CabinetAffairs = () => {
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

  // Group by Year -> Month for Archive
  const getArchivedMeetings = (year: string) => {
    const meetingsInYear = MEETINGS_DATA.filter(m => m.date.startsWith(year));
    // Group by month
    const grouped: Record<string, typeof MEETINGS_DATA> = {};
    
    meetingsInYear.forEach(meeting => {
      const date = new Date(meeting.date);
      const month = date.toLocaleString('default', { month: 'long' });
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(meeting);
    });

    return grouped;
  };

  const handleOpenResolutions = (meeting: typeof MEETINGS_DATA[0]) => {
     setSelectedDoc({
       id: `mtg-${meeting.id}`,
       title: `Resolutions of ${meeting.title}`,
       category: 'Cabinet Resolutions',
       size: '0.5 MB', // Mock size
       date: meeting.date
     });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {selectedDoc && (
        <DocumentViewer document={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
      
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-8">
           <Link to="/government" className="inline-flex items-center text-[#00a898] hover:underline mb-4 text-sm font-medium">
             <ChevronLeft size={16} className="mr-1" /> Back to Government
           </Link>
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Cabinet Affairs</h1>
           <p className="text-gray-600 mt-2 text-lg">
             Updates from the State Council of Ministers, meeting summaries, and cabinet resolutions.
           </p>

           <div className="mt-8 w-full">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                 <Info size={20} className="text-[#00a898] mr-2" /> About the State Cabinet
              </h3>
              <p className="text-gray-700 leading-relaxed">
                 The State Cabinet is the highest decision-making body of Central Equatoria State Government, chaired by the Governor. It consists of the Governor, Deputy Governor, and all State Ministers. The Cabinet meets regularly to review state affairs, approve policies, allocate resources, and coordinate government activities across all ministries.
              </p>
           </div>
        </div>
      </div>

      <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-8">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Controls & Widgets */}
            <div className="lg:col-span-1 space-y-6">
               
               {/* View Filter */}
               <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                 <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                   <Filter size={18} className="mr-2" /> View Options
                 </h3>
                 <div className="space-y-2">
                    <button 
                      onClick={() => setActiveTab('recent')}
                      className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors flex justify-between items-center ${activeTab === 'recent' ? 'bg-[#d2f2d4] text-[#00a898]' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <span>Recent Meetings</span>
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

               <Card className="bg-white border border-gray-200">
                  <CardContent className="p-6">
                     <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center">
                        <Users size={20} className="mr-2 text-[#00a898]" /> Cabinet Members
                     </h3>
                     <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        The State Cabinet is comprised of the Governor, Deputy Governor, and 17 Ministers.
                     </p>
                     <Link to="/ministries" className="block w-full bg-[#00a898] text-white text-center py-2 rounded font-bold hover:bg-[#008f81] transition-colors">
                        View Ministries
                     </Link>
                  </CardContent>
               </Card>

               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Meeting Schedule</h3>
                  <div className="space-y-4">
                     <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-gray-600">Ordinary Meetings: Thursdays</span>
                     </div>
                     <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-gray-600">Security Committee: Mondays</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
               {activeTab === 'recent' ? (
                 <div className="space-y-12 animate-in fade-in">
                    
                    {/* Recent Meetings Section */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Recent Cabinet Meetings</h2>
                        {MEETINGS_DATA.slice(0, 5).map((meeting) => (
                            <Card key={meeting.id} className="hover:border-[#00a898] transition-colors">
                                <CardContent className="p-6">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="shrink-0 text-center bg-gray-100 rounded-lg p-3 min-w-[80px]">
                                        <span className="block text-xs text-gray-500 uppercase font-bold">
                                            {new Date(meeting.date).toLocaleString('default', { month: 'short' })}
                                        </span>
                                        <span className="block text-2xl font-bold text-gray-900">{meeting.date.split('-')[2]}</span>
                                        <span className="block text-xs text-gray-500">{meeting.date.split('-')[0]}</span>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-gray-900">{meeting.title}</h3>
                                            <Badge variant="outline" className={`text-xs ${meeting.type === 'Extraordinary' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                                {meeting.type}
                                            </Badge>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{meeting.summary}</p>
                                        <button 
                                            onClick={() => handleOpenResolutions(meeting)}
                                            className="flex items-center text-sm text-[#00a898] font-medium hover:underline w-fit bg-transparent border-none cursor-pointer p-0"
                                        >
                                            <FileText size={16} className="mr-2" />
                                            {meeting.resolutions} Resolutions Passed
                                            <ArrowRight size={16} className="ml-2" />
                                        </button>
                                    </div>
                                </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Cabinet Composition Section */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Cabinet Composition</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {/* Leadership */}
                             <Card className="md:col-span-2 bg-[#f0f9f1] border-[#00a898] border">
                                <CardContent className="p-6 flex items-center space-x-4">
                                   <div className="w-16 h-16 rounded-full bg-[#00a898] text-white flex items-center justify-center text-xl font-bold border-2 border-white shadow-sm overflow-hidden">
                                       <img 
                                        src="/jadalla.jpeg" 
                                        alt="AJ"
                                        className="w-full h-full object-cover"
                                       />
                                   </div>
                                   <div>
                                      <h3 className="text-lg font-bold text-gray-900">H.E. Gen. Augustino Jadalla Kamilo Wani</h3>
                                      <p className="text-[#00a898] font-medium">Caretaker Governor</p>
                                      <p className="text-xs text-gray-500">Chairperson of the Council of Ministers</p>
                                   </div>
                                </CardContent>
                             </Card>
                             
                             <Card>
                                <CardContent className="p-6 flex items-center space-x-4">
                                   <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                                      <UserCircle2 size={32} />
                                   </div>
                                   <div>
                                      <h3 className="font-bold text-gray-900">H.E. Sarah Nene Redento</h3>
                                      <p className="text-gray-600 text-sm">Deputy Governor</p>
                                   </div>
                                </CardContent>
                             </Card>

                             <Card>
                                <CardContent className="p-6 flex items-center space-x-4">
                                   <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                                      <UserCircle2 size={32} />
                                   </div>
                                   <div>
                                      <h3 className="font-bold text-gray-900">Hon. Wayi Godwill Edward</h3>
                                      <p className="text-gray-600 text-sm">Minister of Cabinet Affairs</p>
                                   </div>
                                </CardContent>
                             </Card>

                             {/* Map other ministries */}
                             {MINISTRIES.filter(m => m.name !== "Ministry of Cabinet Affairs").map((ministry, idx) => (
                                <Card key={idx}>
                                    <CardContent className="p-4 flex items-start space-x-3">
                                       <div className="mt-1">
                                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                            <Users size={16} />
                                          </div>
                                       </div>
                                       <div>
                                          <p className="text-xs text-[#00a898] font-bold uppercase mb-0.5">Minister of</p>
                                          <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                                            {ministry.name.replace("Ministry of ", "")}
                                          </h4>
                                          <p className="text-xs text-gray-400 mt-1">Hon. Minister</p>
                                       </div>
                                    </CardContent>
                                </Card>
                             ))}
                        </div>
                    </div>
                 </div>
               ) : (
                 <div className="space-y-8 animate-in fade-in">
                    <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Archive: {selectedYear}</h2>

                    {Object.entries(getArchivedMeetings(selectedYear)).map(([month, meetings]) => (
                       <div key={month} className="space-y-4">
                          <h3 className="font-bold text-gray-800 text-lg sticky top-20 bg-gray-50 py-2">{month}</h3>
                          <div className="space-y-4">
                             {meetings.map(meeting => (
                                <div key={meeting.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                   <div className="flex justify-between items-start mb-2">
                                      <h4 className="font-bold text-gray-900 text-base">{meeting.title}</h4>
                                      <span className="text-xs text-gray-500 whitespace-nowrap">{formatDate(meeting.date)}</span>
                                   </div>
                                   <p className="text-sm text-gray-600 line-clamp-2 mb-2">{meeting.summary}</p>
                                   <div className="flex items-center space-x-4 text-xs">
                                       <span className="text-[#00a898] font-medium">{meeting.resolutions} Resolutions</span>
                                       <span className={`px-2 py-0.5 rounded ${meeting.type === 'Extraordinary' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                                         {meeting.type}
                                       </span>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                    ))}

                    {Object.keys(getArchivedMeetings(selectedYear)).length === 0 && (
                       <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-200">
                          <p className="text-gray-500">No cabinet meetings found for {selectedYear}.</p>
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

export default CabinetAffairs;
