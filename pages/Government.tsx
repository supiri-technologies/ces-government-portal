
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollText, Briefcase, Users, Building2, ChevronRight, User, Layers, Phone, LayoutGrid, Map, MapPin, AlertCircle, Calendar, History } from 'lucide-react';
import { Card, CardContent, Badge } from '../components/ui';
import { MINISTRIES, COUNTIES } from '../data';

const Government = () => {
  const [activeTab, setActiveTab] = useState('governor');
  // State for Structure Tab
  const [selectedCountyId, setSelectedCountyId] = useState<string | null>(COUNTIES[0].id);
  const selectedCounty = COUNTIES.find(c => c.id === selectedCountyId);

  // Calculate stats for Structure Tab
  const totalCounties = COUNTIES.length;
  const totalPayams = COUNTIES.reduce((acc, curr) => acc + curr.payams.length, 0);
  const totalBomas = COUNTIES.reduce((acc, curr) => acc + curr.payams.reduce((bAcc, bCurr) => bAcc + bCurr.bomas.length, 0), 0);


  const tabs = [
    { id: 'governor', label: 'Office of the Governor', icon: User },
    { id: 'executive', label: 'Executive Office', icon: Building2 },
    { id: 'structure', label: 'State Structure', icon: Layers },
    { id: 'ministries', label: 'Ministries', icon: LayoutGrid },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      
      {/* Sidenav - Updated Background Color (Lighter shade of gray-900 -> gray-800) */}
      <div className="w-full lg:w-72 bg-gray-800 border-r border-gray-700 flex flex-col shrink-0">
         <div className="p-6 lg:p-8 border-b border-gray-700">
             <h1 className="text-2xl font-bold text-white">Government</h1>
             <p className="text-gray-400 text-sm mt-1">Central Equatoria State</p>
         </div>
         
         <div className="px-4 py-6 space-y-1 flex-grow">
           {tabs.map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`
                 w-full text-left px-4 py-3 rounded-lg font-medium flex items-center transition-all duration-200
                 ${activeTab === tab.id 
                   ? 'text-[#00a898]' 
                   : 'text-gray-400 hover:bg-gray-700 hover:text-white'}
               `}
             >
               <tab.icon size={18} className="mr-3 shrink-0" />
               {tab.label}
             </button>
           ))}
         </div>

         {/* Quick Link to Portal */}
         <div className="p-6 mt-auto">
             <div className="p-4 rounded-xl">
               <h4 className="text-[#00a898] font-bold text-sm mb-2">Self-Service Portal</h4>
               <p className="text-gray-400 text-xs mb-3">Access government services online.</p>
               <Link to="/portal" className="text-xs font-bold text-white hover:text-[#00a898] hover:underline flex items-center transition-colors">
                 CES eGovernment Portal <ChevronRight size={12} className="ml-1" />
               </Link>
             </div>
         </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow bg-white p-6 lg:p-12">
         <div className="max-w-6xl mx-auto">
           
           {/* Governor Tab */}
           {activeTab === 'governor' && (
             <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Governor Profile Section */}
                <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-4 mb-2">
                      <h2 className="text-3xl font-bold text-gray-900">Office of the Governor</h2>
                      <p className="text-gray-600">Providing strategic leadership and vision for peace, stability, and development.</p>
                    </div>
                    <Card className="overflow-hidden border border-gray-100 shadow-lg">
                      <div className="grid grid-cols-1 md:grid-cols-12">
                         <div className="md:col-span-5 h-80 md:h-auto bg-gray-200 relative">
                           <img 
                             src="/jadalla.jpeg"
                             alt="H.E. Gen. Augustino Jadalla Kamilo Wani"
                             className="w-full h-full object-cover object-top"
                             referrerPolicy="no-referrer"
                           />
                           {/* Flag Overlay */}
                           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-black via-red-600 to-[#00a898]"></div>
                         </div>
                         
                         <div className="md:col-span-7 p-8 md:p-10 space-y-6">
                           <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 rounded-full bg-[#00a898] text-white flex items-center justify-center text-2xl font-bold border-4 border-white shadow-md overflow-hidden shrink-0">
                                 <img 
                                   src="/jadalla.jpeg" 
                                   alt="AJ"
                                   className="w-full h-full object-cover"
                                   referrerPolicy="no-referrer"
                                 />
                              </div>
                              <div>
                                 <h2 className="text-xl font-bold text-gray-900 leading-tight">H.E. Gen. Augustino Jadalla Kamilo Wani</h2>
                                 <p className="text-[#00a898] font-medium text-sm">Caretaker Governor, Central Equatoria State</p>
                              </div>
                           </div>
                           
                           <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                             <p>
                               Appointed on September 22, 2026, Caretaker Governor Augustino Jadalla Kamilo Wani leads the Central Equatoria State administration with a vision for peace, stability, institutional continuity, and effective public service delivery.
                             </p>
                             <p>
                               As the head of the executive branch, the Governor is responsible for implementing state laws, overseeing the administration of the state ministries, and representing the state in national affairs.
                             </p>
                           </div>
                           
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                              <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-[#00a898]">
                                <span className="text-xs text-gray-500 uppercase font-bold">Appointed</span>
                                <p className="font-semibold text-gray-900 text-sm">September 22, 2026</p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500">
                                <span className="text-xs text-gray-500 uppercase font-bold">Term</span>
                                <p className="font-semibold text-gray-900 text-sm">Current (Caretaker Administration)</p>
                              </div>
                           </div>
                         </div>
                      </div>
                    </Card>
                </div>

                {/* Restored Structure Section */}
                <div className="space-y-6 pt-6 border-t border-gray-100">
                   <div className="pb-2">
                      <h2 className="text-2xl font-bold text-gray-900">Government Structure</h2>
                      <p className="text-gray-600">Organization of the state administration.</p>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {["Office of the Governor", "Office of the Deputy Governor", "State Advisors", "State Commissions", "State Assembly", "Administrative Structure"].map((item, idx) => (
                         <Card key={idx} className="hover:shadow-md transition-shadow border border-gray-100 bg-gray-50/50">
                           <CardContent className="p-6 flex items-center space-x-3">
                             <div className="w-2 h-2 rounded-full bg-[#00a898]"></div>
                             <span className="font-medium text-gray-800">{item}</span>
                           </CardContent>
                         </Card>
                      ))}
                   </div>
                </div>

                {/* Previous Governors Section */}
                <div className="space-y-6 pt-6 border-t border-gray-100">
                   <div className="pb-2">
                      <h2 className="text-2xl font-bold text-gray-900">Previous Governors of Central Equatoria State</h2>
                      <p className="text-gray-600">Chronological record of past governors who led Central Equatoria State prior to the current administration.</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          name: "H.E. Emmanuel Adil Anthony",
                          term: "November 17, 2025 – September 22, 2026",
                          role: "Governor (Second Term)",
                          image: "/Governor-Emmanuel-Adil-Anthony.png",
                          notes: "Reappointed in November 2025 and served until the September 2026 caretaker transition."
                        },
                        {
                          name: "H.E. Gen. Rabi Mujung Emmanuel",
                          term: "June 16, 2025 – November 17, 2025",
                          role: "Governor",
                          image: "/rabi-mujung.png",
                          notes: "Appointed in June 2025 and served until the November 2025 executive reshuffle."
                        },
                        {
                          name: "H.E. Gen. Augustino Jadalla Kamilo Wani",
                          term: "May 2, 2024 – June 16, 2025",
                          role: "Governor (First Term)",
                          image: "/jadalla.jpeg",
                          notes: "Served as Governor of Central Equatoria State after previously leading Jubek State (2015–2020), before returning as Caretaker Governor in 2026."
                        },
                        {
                          name: "H.E. Emmanuel Adil Anthony",
                          term: "June 29, 2020 – May 2, 2024",
                          role: "Governor (First Term)",
                          image: "/Governor-Emmanuel-Adil-Anthony.png",
                          notes: "First Governor of the restored Central Equatoria State under the R-ARCSS 10-state framework; previously Governor of Yei River State (2018–2020)."
                        },
                        {
                          name: "H.E. Juma Ali Malou",
                          term: "August 2015 – December 2015",
                          role: "Caretaker Governor",
                          image: "/juma-malou.jpeg",
                          notes: "Appointed Caretaker Governor of Central Equatoria State prior to the December 2015 state subdivision, later serving as Governor of Terekeka State."
                        },
                        {
                          name: "H.E. Maj. Gen. Clement Wani Konga",
                          term: "2005 – August 2015",
                          role: "First Governor of Central Equatoria State",
                          image: "/clement-wani.jpeg",
                          notes: "Oversaw the 2005 renaming from Bahr el Jebel State to Central Equatoria State and won the 2010 gubernatorial election."
                        }
                      ].map((gov, idx) => (
                        <Card key={idx} className="overflow-hidden hover:shadow-md transition-shadow border border-gray-100 bg-white">
                          <div className="h-52 w-full bg-gray-100 relative overflow-hidden">
                            <img
                              src={gov.image}
                              alt={gov.name}
                              className="w-full h-full object-cover object-top"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-black via-red-600 to-[#00a898]"></div>
                          </div>
                          <CardContent className="p-6 space-y-3">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="font-bold text-gray-900 text-base">{gov.name}</h3>
                                <p className="text-[#00a898] font-medium text-xs uppercase tracking-wide mt-0.5">{gov.role}</p>
                              </div>
                              <div className="p-2 bg-[#f0f9f1] rounded-lg text-[#00a898] shrink-0">
                                <History size={18} />
                              </div>
                            </div>
                            <div className="flex items-center text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-2 rounded-md border-l-4 border-[#00a898]">
                              <Calendar size={14} className="mr-2 text-[#00a898] shrink-0" />
                              {gov.term}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{gov.notes}</p>
                          </CardContent>
                        </Card>
                      ))}
                   </div>

                   {/* Historical Context Notes */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border border-gray-100 bg-gray-50/70" noShadow>
                        <CardContent className="p-5 space-y-1.5">
                          <h4 className="font-bold text-gray-900 text-sm">2015–2020 Subdivision Period</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            Between December 2015 and February 2020, Central Equatoria was temporarily subdivided into <strong>Jubek State</strong> (Gov. Augustino Jadalla Wani), <strong>Terekeka State</strong> (Gov. Juma Ali Malou), and <strong>Yei River State</strong> (Gov. David Lokonga Moses, succeeded by Gov. Emmanuel Adil Anthony).
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border border-gray-100 bg-gray-50/70" noShadow>
                        <CardContent className="p-5 space-y-1.5">
                          <h4 className="font-bold text-gray-900 text-sm">Pre-2005 Era (Bahr el Jebel State)</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            Prior to being renamed Central Equatoria State in April 2005 under the Comprehensive Peace Agreement, the state was known as <strong>Bahr el Jebel State</strong>, led by governors including <strong>Henry Jada Zakaria</strong> and <strong>Agnes Lukudu</strong>.
                          </p>
                        </CardContent>
                      </Card>
                   </div>
                </div>
             </div>
           )}

           {/* Executive Office Tab */}
           {activeTab === 'executive' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Executive Office Header */}
                <div className="border-b border-gray-100 pb-4 mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">Executive Office</h2>
                  <p className="text-gray-600">The central nerve center coordinating state affairs, policy implementation, and administrative functions.</p>
                </div>
                {/* Changed grid layout to cols-3 for large screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {/* Executive Orders */}
                   <Card noShadow className="h-full hover:translate-y-[-4px] transition-all border border-gray-200 shadow-md">
                     <CardContent className="flex items-start space-x-4 p-6 h-full">
                        <div className="p-3 bg-green-50 rounded-full text-green-700 shrink-0">
                          <ScrollText size={24} />
                        </div>
                        <div className="flex flex-col h-full">
                          <h3 className="font-bold text-lg text-gray-900 mb-1">Executive Orders</h3>
                          <p className="text-gray-500 text-sm mb-3 flex-grow">View official decrees and orders issued by the Governor</p>
                          <Link to="/government/executive-orders" className="text-[#00a898] text-sm font-medium flex items-center hover:underline mt-auto">
                            View Details <ChevronRight size={14} />
                          </Link>
                        </div>
                     </CardContent>
                   </Card>

                   {/* Appointments */}
                   <Card noShadow className="h-full hover:translate-y-[-4px] transition-all border border-gray-200 shadow-md">
                     <CardContent className="flex items-start space-x-4 p-6 h-full">
                        <div className="p-3 bg-blue-50 rounded-full text-blue-700 shrink-0">
                          <Briefcase size={24} />
                        </div>
                        <div className="flex flex-col h-full">
                          <h3 className="font-bold text-lg text-gray-900 mb-1">Appointments</h3>
                          <p className="text-gray-500 text-sm mb-3 flex-grow">Recent government appointments and staffing changes</p>
                          <Link to="/government/appointments" className="text-[#00a898] text-sm font-medium flex items-center hover:underline mt-auto">
                            View Details <ChevronRight size={14} />
                          </Link>
                        </div>
                     </CardContent>
                   </Card>

                   {/* Cabinet Affairs */}
                   <Card noShadow className="h-full hover:translate-y-[-4px] transition-all border border-gray-200 shadow-md">
                     <CardContent className="flex items-start space-x-4 p-6 h-full">
                        <div className="p-3 bg-purple-50 rounded-full text-purple-700 shrink-0">
                          <Users size={24} />
                        </div>
                        <div className="flex flex-col h-full">
                          <h3 className="font-bold text-lg text-gray-900 mb-1">Cabinet Affairs</h3>
                          <p className="text-gray-500 text-sm mb-3 flex-grow">Information regarding the state cabinet and meetings</p>
                          <Link to="/government/cabinet-affairs" className="text-[#00a898] text-sm font-medium flex items-center hover:underline mt-auto">
                            View Details <ChevronRight size={14} />
                          </Link>
                        </div>
                     </CardContent>
                   </Card>

                   {/* NEW: Directives */}
                   <Card noShadow className="h-full hover:translate-y-[-4px] transition-all border border-gray-200 shadow-md">
                     <CardContent className="flex items-start space-x-4 p-6 h-full">
                        <div className="p-3 bg-red-50 rounded-full text-red-700 shrink-0">
                          <AlertCircle size={24} />
                        </div>
                        <div className="flex flex-col h-full">
                          <h3 className="font-bold text-lg text-gray-900 mb-1">Directives</h3>
                          <p className="text-gray-500 text-sm mb-3 flex-grow">Official instructions and mandates from state ministries</p>
                          <Link to="/government/directives" className="text-[#00a898] text-sm font-medium flex items-center hover:underline mt-auto">
                            View Details <ChevronRight size={14} />
                          </Link>
                        </div>
                     </CardContent>
                   </Card>
                </div>
             </div>
           )}

           {/* Structure Tab (Interactive Map/Hierarchy) */}
           {activeTab === 'structure' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
               <div className="flex flex-col xl:flex-row gap-8">
                 {/* Left Info Panel */}
                 <div className="w-full xl:w-1/3 space-y-6">
                    <div className="space-y-2 mb-6">
                      <h2 className="text-3xl font-bold text-gray-900">Administrative Structure</h2>
                      <p className="text-gray-600">Hierarchy of local government in Central Equatoria State.</p>
                    </div>

                    {/* State Overview Stats */}
                    <Card className="bg-white">
                      <CardContent className="p-6 space-y-4">
                         <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">State Overview</h3>
                         <div className="space-y-3">
                           <div className="flex justify-between items-center">
                             <span className="text-gray-600 text-sm flex items-center"><Map className="w-4 h-4 mr-2 text-[#00a898]" /> Counties</span>
                             <span className="font-bold text-gray-900">{totalCounties}</span>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="text-gray-600 text-sm flex items-center"><Layers className="w-4 h-4 mr-2 text-blue-500" /> Payams</span>
                             <span className="font-bold text-gray-900">{totalPayams}</span>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="text-gray-600 text-sm flex items-center"><MapPin className="w-4 h-4 mr-2 text-purple-500" /> Bomas</span>
                             <span className="font-bold text-gray-900">{totalBomas}</span>
                           </div>
                         </div>
                      </CardContent>
                    </Card>

                    {/* Legend */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Hierarchy Legend</h3>
                        <div className="relative space-y-6 pl-2">
                          {/* Vertical Line */}
                          <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-200"></div>

                          <div className="relative flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-[#00a898] flex items-center justify-center text-white z-10">
                              <Building2 size={16} />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">State</p>
                              <p className="text-xs text-gray-500">Central Gov</p>
                            </div>
                          </div>

                          <div className="relative flex items-center space-x-3">
                             <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white z-10">
                              <Map size={16} />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">County</p>
                              <p className="text-xs text-gray-500">Local Admin</p>
                            </div>
                          </div>

                          <div className="relative flex items-center space-x-3">
                             <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white z-10">
                              <Layers size={16} />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">Payam</p>
                              <p className="text-xs text-gray-500">District Level</p>
                            </div>
                          </div>

                           <div className="relative flex items-center space-x-3">
                             <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white z-10">
                              <MapPin size={16} />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">Boma</p>
                              <p className="text-xs text-gray-500">Village Level</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                 </div>

                 {/* Main Content Area */}
                 <div className="w-full xl:w-2/3 space-y-6">
                    {/* State Header */}
                    <div className="w-full bg-[rgb(240,249,255)] rounded-xl shadow-sm border border-blue-50 p-8 text-gray-900 relative overflow-hidden">
                       <div className="relative z-10">
                         <div className="flex items-center space-x-2 mb-2 text-gray-600">
                           <Building2 size={20} className="text-[#00a898]" />
                           <span className="text-sm font-medium uppercase tracking-wider">Highest Administrative Level</span>
                         </div>
                         <h2 className="text-3xl font-bold mb-2">Central Equatoria State</h2>
                         <div className="flex flex-wrap gap-6 mt-4 text-gray-700">
                           <div className="flex items-center space-x-2">
                             <MapPin className="text-[#00a898]" size={18} />
                             <span>Capital: <strong>Juba</strong></span>
                           </div>
                           <div className="flex items-center space-x-2">
                             <Users className="text-[#00a898]" size={18} />
                             <span>Est. Population: <strong>1.5M+</strong></span>
                           </div>
                         </div>
                       </div>
                       {/* Decorative circle */}
                       <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-[#00a898] opacity-5 rounded-full blur-2xl"></div>
                    </div>

                    {/* Selector and Detail Split */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* County Selector */}
                        <div className="md:col-span-5 space-y-3">
                          <h3 className="font-semibold text-gray-900 mb-2 px-1">Select a County</h3>
                          {COUNTIES.map((county) => (
                            <div 
                              key={county.id}
                              onClick={() => setSelectedCountyId(county.id)}
                              className={`
                                cursor-pointer rounded-lg p-4 transition-all duration-200 flex items-center justify-between group
                                ${selectedCountyId === county.id 
                                  ? 'bg-white ring-2 ring-[#00a898] shadow-md' 
                                  : 'bg-white hover:bg-gray-50 shadow-sm border border-transparent'}
                              `}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${county.color}`}></div>
                                <div>
                                  <p className={`font-semibold ${selectedCountyId === county.id ? 'text-[#00a898]' : 'text-gray-700'}`}>
                                    {county.name}
                                  </p>
                                </div>
                              </div>
                              {selectedCountyId === county.id && <ChevronRight size={18} className="text-[#00a898]" />}
                            </div>
                          ))}
                        </div>

                        {/* Display Area */}
                        <div className="md:col-span-7">
                          {selectedCounty ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                              {/* County Header */}
                              <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-6 text-white shadow-md relative overflow-hidden">
                                <div className="relative z-10">
                                   <h3 className="text-2xl font-bold mb-1">{selectedCounty.name} County</h3>
                                   <p className="text-blue-100 text-sm mb-4">Headquarters: {selectedCounty.capital}</p>
                                   <div className="flex items-center space-x-4 text-sm">
                                     <Badge className="bg-white/20 text-white hover:bg-white/30 border-none">
                                       {selectedCounty.payams.length} Payams
                                     </Badge>
                                     <span className="flex items-center"><Users size={14} className="mr-1"/> {selectedCounty.population}</span>
                                   </div>
                                </div>
                                <div className="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                              </div>

                              {/* Payams List */}
                              <div className="space-y-4">
                                 <h4 className="font-bold text-gray-900 flex items-center">
                                   <Layers size={18} className="mr-2 text-gray-500" /> Administrative Units (Payams)
                                 </h4>
                                 
                                 {selectedCounty.payams.map((payam, idx) => (
                                   <Card key={idx} className="border-l-4 border-l-purple-500" noShadow>
                                     <CardContent className="p-5">
                                       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 border-b border-gray-100 pb-3">
                                         <div className="flex items-center space-x-2">
                                            <div className="bg-purple-100 p-1.5 rounded text-purple-600">
                                              <Layers size={16} />
                                            </div>
                                            <h5 className="font-bold text-gray-900 text-lg">{payam.name} Payam</h5>
                                         </div>
                                         <div className="text-xs text-gray-500 mt-2 sm:mt-0 bg-gray-100 px-2 py-1 rounded">
                                           Pop: {payam.population}
                                         </div>
                                       </div>
                                       
                                       <div>
                                         <p className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center">
                                           <MapPin size={12} className="mr-1" /> Bomas (Villages)
                                         </p>
                                         <div className="flex flex-wrap gap-2">
                                           {payam.bomas.map((boma, bIdx) => (
                                             <span key={bIdx} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-orange-50 text-orange-700 border border-orange-100">
                                               {boma}
                                             </span>
                                           ))}
                                         </div>
                                       </div>
                                     </CardContent>
                                   </Card>
                                 ))}
                              </div>
                            </div>
                          ) : (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 p-8 text-center">
                               <Map size={48} className="mb-4 opacity-50" />
                               <h3 className="text-lg font-semibold text-gray-600">No County Selected</h3>
                               <p className="text-sm max-w-xs mx-auto mt-2">Select a county from the list on the left to view its detailed administrative structure, payams, and bomas.</p>
                            </div>
                          )}
                        </div>
                    </div>
                 </div>
               </div>
             </div>
           )}

           {/* Ministries Tab */}
           {activeTab === 'ministries' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-gray-100 pb-4 mb-2 gap-2">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">State Ministries</h2>
                    <p className="text-gray-600">The 17 ministries of Central Equatoria State.</p>
                  </div>
                  <Link to="/ministries" className="text-[#00a898] text-sm font-medium hover:underline flex items-center shrink-0">
                     Full Details Page <ChevronRight size={16} />
                  </Link>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MINISTRIES.map((ministry, idx) => (
                    <Card key={idx} className="hover:shadow-md transition-shadow border border-gray-100">
                      <CardContent className="p-5 flex items-start space-x-3">
                        <div className="mt-0.5 p-2 bg-green-50 rounded text-[#00a898] shrink-0">
                          <Building2 size={18} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{ministry.name}</h3>
                          <p className="text-xs text-gray-500 line-clamp-2">{ministry.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
               </div>
             </div>
           )}

           {/* Contact Tab */}
           {activeTab === 'contact' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="border-b border-gray-100 pb-4 mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">Contact Information</h2>
                  <p className="text-gray-600">Get in touch with the Executive Office.</p>
                </div>
                <Card className="border border-gray-100 shadow-sm">
                  <CardContent className="p-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div>
                         <h3 className="text-gray-900 text-lg font-bold mb-2">Contact the Executive Office</h3>
                         <p className="mb-6 text-gray-600 text-sm">For official correspondence and scheduling.</p>
                         <div className="space-y-3 text-gray-600">
                           <p className="flex items-center"><Building2 size={16} className="mr-3 text-[#00a898]" /> Secretariat General, Juba</p>
                           <p className="flex items-center"><Users size={16} className="mr-3 text-[#00a898]" /> Monday - Friday, 8:30 AM - 4:30 PM</p>
                         </div>
                       </div>
                       <div className="bg-gray-900 p-6 rounded-lg text-gray-300">
                          <p className="text-sm mb-1 text-gray-400">Email Address</p>
                          <p className="text-white font-mono mb-4">governor.office@ces.gov.ss</p>
                          <p className="text-sm mb-1 text-gray-400">Press Inquiries</p>
                          <p className="text-white font-mono">press@ces.gov.ss</p>
                       </div>
                     </div>
                  </CardContent>
                </Card>
             </div>
           )}

         </div>
      </div>
    </div>
  );
};

export default Government;
