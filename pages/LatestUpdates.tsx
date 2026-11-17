
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, User, Tag, Filter, Search, ChevronLeft, ArrowRight, Share2, FileText, Clock, ArrowLeft, Download } from 'lucide-react';
import { Card, CardContent, Button, Badge, Input, Select } from '../components/ui';
import { DocumentViewer } from '../components/DocumentViewer';
import { Document } from '../types';

// Mock Data for News Updates & Directives
const UPDATES = [
  {
    id: 1,
    title: "Governor Adil Launches New Road Infrastructure Project in Juba",
    date: "2025-02-20",
    category: "Infrastructure",
    author: "Press Secretary",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000",
    excerpt: "H.E. Emmanuel Adil Anthony has officially flagged off the rehabilitation of 15km of urban roads within Juba City to improve connectivity and reduce traffic congestion.",
    content: `
      <p class="mb-4"><strong>JUBA, CENTRAL EQUATORIA</strong> — In a significant move to modernize the state capital's infrastructure, H.E. Governor Emmanuel Adil Anthony today officially flagged off the rehabilitation of 15 kilometers of key urban roads within Juba City.</p>
      <p class="mb-4">The project, funded by the State Government in partnership with local contractors, aims to improve connectivity between major residential areas and the central business district. Speaking at the launch ceremony in Munuki, the Governor emphasized that infrastructure development is a cornerstone of his administration's strategy to boost economic activity and improve the quality of life for citizens.</p>
      <p class="mb-4">"Good roads are the arteries of our economy," Governor Adil stated. "By rehabilitating these roads, we are reducing travel time, lowering vehicle maintenance costs for our people, and facilitating the easier movement of goods and services."</p>
      <p class="mb-4">The Minister of Roads and Bridges, who accompanied the Governor, outlined that the project will include grading, compacting, and the installation of proper drainage systems to mitigate the perennial flooding issues faced during the rainy season. The work is expected to be completed within six months.</p>
      <p>Residents have welcomed the initiative, citing that the current state of the roads has been a major hindrance to business and daily commute. The State Government has pledged to continue rolling out similar projects across other counties in the coming fiscal year.</p>
    `,
    featured: true
  },
  {
    id: 7,
    title: "Directive: Mandatory Registration of NGOs operating in CES",
    date: "2025-02-19",
    category: "Directive",
    author: "State Secretariat",
    image: null, 
    excerpt: "All Non-Governmental Organizations (NGOs) operating within Central Equatoria State are directed to renew their state operation licenses by the end of Q1 2025.",
    content: `
      <p class="mb-4"><strong>DIRECTIVE NO. 05/2025</strong></p>
      <p class="mb-4"><strong>SUBJECT: MANDATORY REGISTRATION AND RENEWAL OF LICENSES FOR NGOs</strong></p>
      <p class="mb-4">The State Secretariat of Central Equatoria State hereby issues this directive to all Non-Governmental Organizations (NGOs), both international and national, operating within the jurisdiction of Central Equatoria State.</p>
      <p class="mb-4">To ensure proper coordination of humanitarian and development activities, and in accordance with the State NGO Act, all organizations are required to:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Renew their Annual State Operation Licenses for the year 2025.</li>
        <li>Submit their annual activity reports for the preceding year (2024) to the State Relief and Rehabilitation Commission (RRC).</li>
        <li>Ensure all expatriate staff possess valid work permits issued by the relevant authorities.</li>
      </ul>
      <p class="mb-4"><strong>Deadline for Compliance:</strong> March 31, 2025.</p>
      <p>Failure to comply with this directive may result in penalties, suspension of activities, or revocation of operation licenses. The State Government appreciates the partnership of the NGO community and seeks to strengthen collaboration for the benefit of our citizens.</p>
    `,
    featured: false
  },
  {
    id: 2,
    title: "Ministry of Health Announces Statewide Vaccination Campaign",
    date: "2025-02-18",
    category: "Health",
    author: "Ministry of Health",
    image: "https://images.unsplash.com/photo-1632053002928-199f195d85d7?auto=format&fit=crop&q=80&w=1000",
    excerpt: "A comprehensive polio and measles vaccination drive targeting children under 5 years will commence next week across all six counties.",
    content: `
      <p class="mb-4">The Ministry of Health has announced a comprehensive statewide vaccination campaign targeting children under the age of five. The campaign, set to begin next Monday, will focus on eradicating Polio and mitigating the spread of Measles.</p>
      <p class="mb-4">Health teams will be deployed to all six counties: Juba, Yei River, Morobo, Lainya, Kajo-Keji, and Terekeka. The Ministry urges all parents and guardians to ensure their children are available for vaccination at designated health centers and through mobile outreach teams.</p>
      <p>"Prevention is better than cure," said the State Minister of Health. "We are committed to ensuring that no child in Central Equatoria is left behind in this health drive."</p>
    `,
    featured: false
  },
  {
    id: 3,
    title: "CES Revenue Authority Reports 15% Increase in Annual Collection",
    date: "2025-02-15",
    category: "Economy",
    author: "Revenue Authority",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000",
    excerpt: "The State Revenue Authority attributes the growth to the new digital tax collection system and improved compliance from the business sector.",
    content: `
      <p class="mb-4">The Central Equatoria State Revenue Authority (CESRA) has released its annual performance report, highlighting a 15% increase in non-oil revenue collection compared to the previous fiscal year.</p>
      <p class="mb-4">This significant growth is attributed to the successful implementation of the new digital tax collection system, which has plugged leakages and streamlined the payment process for businesses. The Commissioner General thanked the business community for their improved compliance.</p>
      <p>"The funds collected are directly channeled into service delivery projects, such as the road rehabilitation we are seeing in Juba," the Commissioner noted.</p>
    `,
    featured: false
  },
  {
    id: 4,
    title: "Education Ministry Distributes Textbooks to Rural Schools",
    date: "2025-02-10",
    category: "Education",
    author: "Ministry of Education",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Over 50,000 textbooks have been dispatched to primary schools in Morobo and Kajo-Keji counties to support the new curriculum.",
    content: `
      <p class="mb-4">In an effort to improve literacy rates and support the implementation of the new national curriculum, the State Ministry of Education has dispatched over 50,000 textbooks to rural schools.</p>
      <p class="mb-4">The beneficiaries primarily include schools in Morobo and Kajo-Keji counties, which are recovering from past disruptions. The learning materials cover core subjects such as English, Mathematics, Science, and Social Studies.</p>
    `,
    featured: false
  },
  {
    id: 5,
    title: "State Government Hosting Investment Conference Next Month",
    date: "2025-02-05",
    category: "Business",
    author: "Investment Authority",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000",
    excerpt: "International and local investors are invited to the Juba Economic Forum to explore opportunities in agriculture, tourism, and mining.",
    content: `
      <p class="mb-4">Central Equatoria State is open for business. The State Investment Authority announced today that it will host the 'Juba Economic Forum' next month.</p>
      <p class="mb-4">The conference aims to attract foreign direct investment and mobilize local capital into key sectors including mechanized agriculture, tourism, and mineral extraction. The Governor is expected to open the summit.</p>
    `,
    featured: false
  },
  {
    id: 6,
    title: "Public Notice: Adjustment of Working Hours During Ramadan",
    date: "2025-02-01",
    category: "Public Notice",
    author: "Secretariat General",
    image: null,
    excerpt: "The State Secretariat announces adjusted working hours for all government institutions during the holy month of Ramadan.",
    content: `
      <p class="mb-4"><strong>PUBLIC NOTICE</strong></p>
      <p class="mb-4">The Secretariat General of the State Government wishes to inform all civil servants and the general public that working hours will be adjusted during the Holy Month of Ramadan.</p>
      <p class="mb-4"><strong>New Working Hours:</strong> 9:00 AM to 3:00 PM.</p>
      <p>This adjustment is to allow Muslim colleagues to observe their religious obligations. Normal working hours (8:30 AM - 4:30 PM) will resume immediately after Eid al-Fitr.</p>
    `,
    featured: false
  },
  {
    id: 8,
    title: "Directive: Prohibition of Charcoal Export",
    date: "2024-11-15",
    category: "Directive",
    author: "Governor's Office",
    image: null,
    excerpt: "Strict ban on the commercial export of charcoal to neighboring countries to preserve state forests.",
    content: "<p>Full directive content here...</p>",
    featured: false
  },
  {
    id: 9,
    title: "Yei River County Agricultural Show Concludes",
    date: "2024-10-20",
    category: "Agriculture",
    author: "Ministry of Agriculture",
    image: null,
    excerpt: "Farmers from across the Green Belt showcased their produce.",
    content: "<p>Full story content here...</p>",
    featured: false
  }
];

const StoryViewer = ({ story, onBack, onViewDoc }: { story: any, onBack: () => void, onViewDoc: (story: any) => void }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Hero Image */}
        {story.image ? (
          <div className="h-64 md:h-96 w-full relative">
             <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
             <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                <Badge className="bg-[#00a898] text-white border-none mb-3">{story.category}</Badge>
                <h1 className="text-2xl md:text-4xl font-bold leading-tight">{story.title}</h1>
             </div>
          </div>
        ) : (
          <div className="bg-gray-900 text-white p-8 md:p-12">
             <div className="flex items-center space-x-2 mb-4">
                <Badge className={`border-none ${story.category === 'Directive' ? 'bg-red-600 text-white' : 'bg-[#00a898] text-white'}`}>{story.category}</Badge>
                <span className="text-gray-400 text-sm flex items-center"><Calendar size={14} className="mr-1"/> {story.date}</span>
             </div>
             <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">{story.title}</h1>
             <div className="flex items-center text-gray-300 text-sm">
                <User size={16} className="mr-2" /> By {story.author}
             </div>
          </div>
        )}

        <div className="p-6 md:p-12 max-w-4xl mx-auto">
           {/* Meta for Image posts (already shown in non-image header) */}
           {story.image && (
             <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-6 text-gray-500 text-sm">
                <div className="flex items-center space-x-6">
                   <span className="flex items-center"><Calendar size={16} className="mr-2" /> {story.date}</span>
                   <span className="flex items-center"><User size={16} className="mr-2" /> {story.author}</span>
                </div>
                <button className="flex items-center text-[#00a898] hover:text-[#008f81]">
                   <Share2 size={16} className="mr-2" /> Share
                </button>
             </div>
           )}

           {/* Content */}
           <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: story.content }}>
           </div>

           {/* Directive Action */}
           {story.category === 'Directive' && (
              <div className="mt-8 bg-red-50 border border-red-100 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                 <div>
                    <h4 className="font-bold text-red-900">Official Document Available</h4>
                    <p className="text-sm text-red-700">Download the signed official directive for your records.</p>
                 </div>
                 <Button onClick={() => onViewDoc(story)} className="bg-red-600 hover:bg-red-700 text-white border-none whitespace-nowrap">
                    <Download size={16} className="mr-2" /> Download Directive
                 </Button>
              </div>
           )}

           {/* Footer Navigation */}
           <div className="mt-12 pt-8 border-t border-gray-200">
              <Button onClick={onBack} variant="outline" className="flex items-center">
                 <ArrowLeft size={16} className="mr-2" /> Back to Updates
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

const LatestUpdates = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'recent' | 'archive'>('recent');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [readingStory, setReadingStory] = useState<any | null>(null);
  
  // Document Viewer State
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const categories = ['All', 'Directive', 'Infrastructure', 'Health', 'Economy', 'Education', 'Business', 'Public Notice'];

  // Helper to filter updates
  const getFilteredUpdates = (data: typeof UPDATES) => {
    return data.filter(update => {
      const matchesFilter = filter === 'All' || update.category === filter;
      const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            update.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  };

  // Archive Logic
  const getArchivedUpdates = () => {
    const updatesInYear = UPDATES.filter(u => u.date.startsWith(selectedYear));
    const grouped: Record<string, typeof UPDATES> = {};
    updatesInYear.forEach(u => {
      const date = new Date(u.date);
      const month = date.toLocaleString('default', { month: 'long' });
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(u);
    });
    return grouped;
  };

  const handleViewDoc = (story: any) => {
    setSelectedDoc({
      id: `DIR-${story.id}`,
      title: story.title,
      category: 'Directive',
      size: '0.5 MB', // Mock
      date: story.date
    });
  };

  const featuredUpdate = UPDATES.find(u => u.featured);
  const recentUpdates = getFilteredUpdates(UPDATES.filter(u => u.date.startsWith('2025')));

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {selectedDoc && (
        <DocumentViewer document={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-8">
           <Link to="/" className="inline-flex items-center text-[#00a898] hover:underline mb-4 text-sm font-medium">
             <ChevronLeft size={16} className="mr-1" /> Back to Home
           </Link>
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Latest Directives & Updates</h1>
           <p className="text-gray-600 mt-2 text-lg">
             Official directives, news, press releases, and public announcements from the Central Equatoria State Government.
           </p>
        </div>
      </div>

      <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-8">
        
        {readingStory ? (
          <StoryViewer story={readingStory} onBack={() => setReadingStory(null)} onViewDoc={handleViewDoc} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-8">
              
              {activeTab === 'recent' ? (
                <>
                  {/* Featured Article - Only show if no search/filter active */}
                  {filter === 'All' && !searchQuery && featuredUpdate && (
                    <div 
                      onClick={() => setReadingStory(featuredUpdate)}
                      className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer bg-white"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={featuredUpdate.image || ''} 
                          alt={featuredUpdate.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
                        <Badge className="bg-[#00a898] text-white border-none w-fit mb-3">Featured Story</Badge>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-green-100 transition-colors">
                          {featuredUpdate.title}
                        </h2>
                        <p className="text-gray-200 line-clamp-2 mb-4 max-w-2xl">
                          {featuredUpdate.excerpt}
                        </p>
                        <div className="flex items-center text-gray-300 text-sm space-x-4">
                          <span className="flex items-center"><Calendar size={14} className="mr-1.5" /> {featuredUpdate.date}</span>
                          <span className="flex items-center"><User size={14} className="mr-1.5" /> {featuredUpdate.author}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* News Grid */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                       <h2 className="text-xl font-bold text-gray-900">Recent Stories</h2>
                       <span className="text-sm text-gray-500">Showing {recentUpdates.length} updates</span>
                    </div>

                    {recentUpdates.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recentUpdates.filter(u => !u.featured || filter !== 'All' || searchQuery).map((update) => (
                          <Card 
                            key={update.id} 
                            className="h-full hover:border-[#00a898]/50 transition-colors group flex flex-col cursor-pointer"
                          >
                            <CardContent className="p-6 flex flex-col h-full">
                              <div className="flex justify-between items-start mb-3">
                                <Badge variant="outline" className={`border-green-100 bg-green-50 ${update.category === 'Directive' ? 'text-red-600 border-red-100 bg-red-50' : 'text-[#00a898]'}`}>
                                  {update.category}
                                </Badge>
                                <span className="text-xs text-gray-400 flex items-center">
                                  <Calendar size={12} className="mr-1" /> {update.date}
                                </span>
                              </div>
                              <h3 onClick={() => setReadingStory(update)} className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#00a898] transition-colors line-clamp-2">
                                {update.title}
                              </h3>
                              <p onClick={() => setReadingStory(update)} className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                {update.excerpt}
                              </p>
                              <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                                 <span className="text-xs text-gray-500 font-medium">By {update.author}</span>
                                 <div className="flex items-center gap-3">
                                    {update.category === 'Directive' && (
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleViewDoc(update); }} 
                                            className="text-red-600 hover:text-red-800"
                                            title="Download Directive"
                                        >
                                            <Download size={16} />
                                        </button>
                                    )}
                                    <button onClick={() => setReadingStory(update)} className="text-[#00a898] text-sm font-medium flex items-center hover:underline">
                                        Read More <ArrowRight size={14} className="ml-1" />
                                    </button>
                                 </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white p-12 rounded-lg border border-dashed border-gray-200 text-center">
                        <p className="text-gray-500">No updates found matching your criteria.</p>
                        <Button variant="ghost" onClick={() => {setFilter('All'); setSearchQuery('');}} className="mt-2 text-[#00a898]">Clear Filters</Button>
                      </div>
                    )}
                    
                    {/* Pagination (Mock) */}
                    {recentUpdates.length > 0 && (
                      <div className="flex justify-center pt-8">
                        <Button variant="outline" className="w-full md:w-auto">Load More Updates</Button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // Archive View
                <div className="space-y-8 animate-in fade-in">
                  <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Archive: {selectedYear}</h2>
                  
                  {Object.entries(getArchivedUpdates()).map(([month, updates]) => (
                    <div key={month} className="space-y-4">
                        <h3 className="font-bold text-gray-800 text-lg sticky top-0 bg-gray-50 py-2 z-10">{month}</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {updates.map(update => (
                              <div 
                                key={update.id} 
                                className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                              >
                                <div onClick={() => setReadingStory(update)} className="flex items-start space-x-4 flex-grow">
                                    <div className={`p-2 rounded shrink-0 ${update.category === 'Directive' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                                      {update.category === 'Directive' ? <FileText size={20} /> : <FileText size={20} />}
                                    </div>
                                    <div>
                                      <div className="flex items-center space-x-2 mb-1">
                                         <Badge variant="outline" className="text-xs py-0 h-5">{update.category}</Badge>
                                         <span className="text-xs text-gray-500">{update.date}</span>
                                      </div>
                                      <h4 className="font-semibold text-gray-900 text-base group-hover:text-[#00a898] transition-colors">{update.title}</h4>
                                      <p className="text-sm text-gray-500 line-clamp-1 mt-1">{update.excerpt}</p>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 md:pl-4 flex items-center justify-end gap-3">
                                   {update.category === 'Directive' && (
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleViewDoc(update); }} 
                                            className="text-gray-400 hover:text-red-600 p-1"
                                            title="Download Document"
                                        >
                                            <Download size={20} />
                                        </button>
                                   )}
                                   <ChevronRight onClick={() => setReadingStory(update)} size={20} className="text-gray-300 group-hover:text-[#00a898]" />
                                </div>
                              </div>
                          ))}
                        </div>
                    </div>
                  ))}

                  {Object.keys(getArchivedUpdates()).length === 0 && (
                      <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-200">
                        <p className="text-gray-500">No directives or updates found for {selectedYear}.</p>
                      </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
               
               {/* View Toggle */}
               <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                 <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                   <Clock size={18} className="mr-2" /> Timeline
                 </h3>
                 <div className="space-y-2">
                    <button 
                      onClick={() => setActiveTab('recent')}
                      className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors flex justify-between items-center ${activeTab === 'recent' ? 'bg-[#d2f2d4] text-[#00a898]' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <span>Recent Stories</span>
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

               {/* Search */}
               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                 <h3 className="font-bold text-gray-900 mb-4">Search Updates</h3>
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <Input 
                     placeholder="Keywords..." 
                     className="pl-10" 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                 </div>
               </div>

               {/* Categories */}
               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                 <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                   <Filter size={18} className="mr-2" /> Categories
                 </h3>
                 <div className="space-y-2">
                   {categories.map(cat => (
                     <button
                       key={cat}
                       onClick={() => setFilter(cat)}
                       className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                         filter === cat 
                           ? 'bg-[#d2f2d4] text-[#00a898] font-semibold' 
                           : 'text-gray-600 hover:bg-gray-50'
                       }`}
                     >
                       <span>{cat}</span>
                       {filter === cat && <ChevronRight size={16} />}
                     </button>
                   ))}
                 </div>
               </div>

               {/* Media Contact */}
               <div className="bg-[#00a898] text-white p-6 rounded-lg shadow-md relative overflow-hidden">
                 <div className="relative z-10">
                   <h3 className="font-bold text-lg mb-2">Media Inquiries</h3>
                   <p className="text-green-100 text-sm mb-6">
                     For press releases, interviews, and official statements, please contact the Office of the Press Secretary.
                   </p>
                   <div className="space-y-3 text-sm">
                     <div className="flex items-center bg-white/10 p-2 rounded">
                       <User size={16} className="mr-3" /> 
                       <span>Press Secretary</span>
                     </div>
                     <div className="flex items-center bg-white/10 p-2 rounded">
                       <Share2 size={16} className="mr-3" /> 
                       <span>press@ces.gov.ss</span>
                     </div>
                   </div>
                 </div>
                 {/* Decorative Circle */}
                 <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
               </div>

               {/* Quick Links */}
               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                 <h3 className="font-bold text-gray-900 mb-4">Related Links</h3>
                 <ul className="space-y-3 text-sm">
                   <li><Link to="/government/executive-orders" className="text-gray-600 hover:text-[#00a898] flex items-center"><ChevronRight size={14} className="mr-1"/> Executive Orders</Link></li>
                   <li><Link to="/government/directives" className="text-gray-600 hover:text-[#00a898] flex items-center"><ChevronRight size={14} className="mr-1"/> Directives</Link></li>
                   <li><Link to="/government/cabinet-affairs" className="text-gray-600 hover:text-[#00a898] flex items-center"><ChevronRight size={14} className="mr-1"/> Cabinet Resolutions</Link></li>
                   <li><Link to="/documents" className="text-gray-600 hover:text-[#00a898] flex items-center"><ChevronRight size={14} className="mr-1"/> Public Documents</Link></li>
                 </ul>
               </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default LatestUpdates;
