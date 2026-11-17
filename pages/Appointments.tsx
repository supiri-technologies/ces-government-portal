
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, ChevronLeft, Award, FileCheck, Filter, ChevronRight, Info } from 'lucide-react';
import { Card, CardContent, Badge, Select, Button } from '../components/ui';

const APPOINTMENTS_DATA = [
  {
    id: 1,
    name: "Hon. Sarah Juma",
    role: "State Advisor on Economic Affairs",
    date: "2025-02-15",
    type: "State Advisor",
    status: "Active"
  },
  {
    id: 2,
    name: "Mr. James Lado",
    role: "Commissioner General, State Revenue Authority",
    date: "2025-02-01",
    type: "Technical",
    status: "Active"
  },
  {
    id: 3,
    name: "Major Gen. Peter Deng",
    role: "Director of Traffic Police, CES",
    date: "2025-01-10",
    type: "Security",
    status: "Active"
  },
  {
    id: 4,
    name: "Hon. Jacob Gore",
    role: "Commissioner, Terekeka County",
    date: "2024-11-28",
    type: "Local Government",
    status: "Active"
  },
  {
    id: 5,
    name: "Hon. Mary Kiden",
    role: "Minister of Gender, Child and Social Welfare",
    date: "2024-08-15",
    type: "Cabinet Minister",
    status: "Active"
  },
  {
    id: 6,
    name: "Mr. Paul Lado",
    role: "Chairperson, Investment Authority",
    date: "2024-05-20",
    type: "Technical",
    status: "Active"
  },
  {
    id: 7,
    name: "Hon. Simon Wani",
    role: "Advisor on Peace and Security",
    date: "2023-11-10",
    type: "State Advisor",
    status: "Resigned"
  }
];

const Appointments = () => {
  const [activeTab, setActiveTab] = useState<'recent' | 'archive'>('recent');
  const [selectedYear, setSelectedYear] = useState<string>('2024');

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Group by Year -> Month for Archive
  const getArchivedAppointments = (year: string) => {
    const appsInYear = APPOINTMENTS_DATA.filter(a => a.date.startsWith(year));
    // Group by month
    const grouped: Record<string, typeof APPOINTMENTS_DATA> = {};
    
    appsInYear.forEach(app => {
      const date = new Date(app.date);
      const month = date.toLocaleString('default', { month: 'long' });
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(app);
    });

    return grouped;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-8">
           <Link to="/government" className="inline-flex items-center text-[#00a898] hover:underline mb-4 text-sm font-medium">
             <ChevronLeft size={16} className="mr-1" /> Back to Government
           </Link>
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Government Appointments</h1>
           <p className="text-gray-600 mt-2 text-lg">
             Recent staffing changes and official appointments within the Central Equatoria State Government.
           </p>

           <div className="mt-8 w-full">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                 <Info size={20} className="text-[#00a898] mr-2" /> About Official Appointments
              </h3>
              <p className="text-gray-700 leading-relaxed">
                 The Governor of Central Equatoria State has the constitutional authority to appoint key government officials to ensure effective administration and service delivery. These appointments are made through Executive Orders and include positions in county administration, state commissions, advisory roles, and ministerial leadership.
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
                      <span>Recent Appointments</span>
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
                      <option value="2022">2022</option>
                   </Select>
                </div>
              )}
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {activeTab === 'recent' ? (
                 <div className="space-y-6 animate-in fade-in">
                    <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Latest Appointments</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {APPOINTMENTS_DATA.slice(0, 6).map((appt) => (
                         <Card key={appt.id} className="hover:shadow-md transition-shadow border-t-4 border-t-[#00a898]">
                            <CardContent className="p-6">
                               <div className="flex justify-between items-start mb-4">
                                  <div className="bg-blue-50 text-blue-700 p-2 rounded-lg">
                                     <User size={24} />
                                  </div>
                                  <Badge className={appt.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                                    {appt.status}
                                  </Badge>
                               </div>
                               <h3 className="text-xl font-bold text-gray-900 mb-1">{appt.name}</h3>
                               <p className="text-[#00a898] font-medium text-sm mb-4 min-h-[40px]">{appt.role}</p>
                               
                               <div className="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-4">
                                  <div className="flex items-center justify-between">
                                     <span className="flex items-center"><Calendar size={14} className="mr-2" /> Appointed Date</span>
                                     <span className="font-semibold">{formatDate(appt.date)}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                     <span className="flex items-center"><Award size={14} className="mr-2" /> Category</span>
                                     <span>{appt.type}</span>
                                  </div>
                               </div>
                               
                               <div className="mt-6">
                                  <Link to="/government/executive-orders" className="text-sm text-gray-500 hover:text-[#00a898] flex items-center justify-center border border-gray-200 rounded py-2 hover:bg-gray-50 transition-colors">
                                     <FileCheck size={14} className="mr-2" /> View Appointment Decree
                                  </Link>
                               </div>
                            </CardContent>
                         </Card>
                      ))}
                    </div>
                 </div>
              ) : (
                 <div className="space-y-8 animate-in fade-in">
                    <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Archive: {selectedYear}</h2>
                    
                    {Object.entries(getArchivedAppointments(selectedYear)).map(([month, appointments]) => (
                       <div key={month} className="space-y-4">
                          <h3 className="font-bold text-gray-800 text-lg sticky top-20 bg-gray-50 py-2">{month}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {appointments.map(appt => (
                               <Card key={appt.id} className="hover:shadow-sm border border-gray-200">
                                  <CardContent className="p-4 flex flex-col h-full">
                                     <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-gray-900">{appt.name}</h4>
                                        <Badge variant="outline" className="text-xs">{appt.status}</Badge>
                                     </div>
                                     <p className="text-[#00a898] text-sm mb-3 flex-grow">{appt.role}</p>
                                     <div className="text-xs text-gray-500 flex items-center pt-2 border-t border-gray-100">
                                        <Calendar size={12} className="mr-1" /> {formatDate(appt.date)}
                                     </div>
                                  </CardContent>
                               </Card>
                            ))}
                          </div>
                       </div>
                    ))}
                    
                    {Object.keys(getArchivedAppointments(selectedYear)).length === 0 && (
                       <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-200">
                          <p className="text-gray-500">No appointments found for {selectedYear}.</p>
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

export default Appointments;
