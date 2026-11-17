import React, { useState } from 'react';
import { Users, Map, MapPin, ChevronRight, Building2, Layers, ArrowRight } from 'lucide-react';
import { COUNTIES } from '../data';
import { Card, CardContent, Badge } from '../components/ui';

const CESStructure = () => {
  // Set default selected county to Juba (first in list) so content area is not empty
  const [selectedCountyId, setSelectedCountyId] = useState<string | null>(COUNTIES[0].id);

  const selectedCounty = COUNTIES.find(c => c.id === selectedCountyId);

  // Calculate stats
  const totalCounties = COUNTIES.length;
  const totalPayams = COUNTIES.reduce((acc, curr) => acc + curr.payams.length, 0);
  const totalBomas = COUNTIES.reduce((acc, curr) => acc + curr.payams.reduce((bAcc, bCurr) => bAcc + bCurr.bomas.length, 0), 0);

  return (
    <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/4 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Administrative Structure</h1>
            <p className="text-gray-600 text-sm">Hierarchy of local government in Central Equatoria State.</p>
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

        {/* Main Content */}
        <div className="w-full lg:w-3/4 space-y-6">
           
           {/* State Header */}
           <div className="w-full bg-[rgb(240,249,255)] rounded-xl shadow-md p-8 text-gray-900 relative overflow-hidden">
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

           {/* Split View */}
           <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* County Selector (Left) */}
              <div className="md:col-span-4 space-y-3">
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

              {/* Display Area (Right) */}
              <div className="md:col-span-8">
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
  );
};

export default CESStructure;