
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Calendar, Filter, Info, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { Card, CardContent, Select } from '../components/ui';
import { DocumentViewer } from '../components/DocumentViewer';
import { Document } from '../types';
import { jsPDF } from 'jspdf';

// Mock Data for Executive Orders
const EXECUTIVE_ORDERS = [
  {
    id: 'EO-2025-05',
    number: '05/2025',
    title: 'Appointment of State Advisors',
    date: '2025-02-15',
    description: 'Decree appointing new State Advisors for Peace and Security.',
    fileSize: '1.2 MB'
  },
  {
    id: 'EO-2025-04',
    number: '04/2025',
    title: 'Establishment of Revenue Authority Board',
    date: '2025-02-01',
    description: 'Order establishing the new Board of Directors for the State Revenue Authority.',
    fileSize: '0.8 MB'
  },
  {
    id: 'EO-2025-03',
    number: '03/2025',
    title: 'Suspension of Illegal Logging Activities',
    date: '2025-01-20',
    description: 'Immediate suspension of all unlicensed timber logging in Kajo-Keji and Yei River counties.',
    fileSize: '0.5 MB'
  },
  {
    id: 'EO-2025-02',
    number: '02/2025',
    title: 'Administrative Reshuffle in Juba City Council',
    date: '2025-01-10',
    description: 'Reorganization of administrative officers within the Juba City Council.',
    fileSize: '1.5 MB'
  },
  {
    id: 'EO-2025-01',
    number: '01/2025',
    title: 'New Year Public Holiday Declaration',
    date: '2025-01-01',
    description: 'Official declaration of public holidays for the month of January.',
    fileSize: '0.2 MB'
  },
  {
    id: 'EO-2024-22',
    number: '22/2024',
    title: 'Formation of State Investment Committee',
    date: '2024-12-15',
    description: 'Creation of a committee to oversee foreign direct investment protocols.',
    fileSize: '2.1 MB'
  },
  {
    id: 'EO-2024-21',
    number: '21/2024',
    title: 'Appointment of County Commissioners',
    date: '2024-11-28',
    description: 'Decree appointing commissioners for Terekeka and Lainya counties.',
    fileSize: '1.8 MB'
  },
  {
    id: 'EO-2024-15',
    number: '15/2024',
    title: 'Regulation of Public Transport Fees',
    date: '2024-08-10',
    description: 'Standardization of public transport fares within Juba City.',
    fileSize: '0.6 MB'
  }
];

const ExecutiveOrders = () => {
  const [activeTab, setActiveTab] = useState<'recent' | 'archive'>('recent');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [generatingPdfId, setGeneratingPdfId] = useState<string | null>(null);

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Group orders by Year -> Month for Archive
  const getArchivedOrders = (year: string) => {
    const ordersInYear = EXECUTIVE_ORDERS.filter(o => o.date.startsWith(year));
    // Group by month
    const grouped: Record<string, typeof EXECUTIVE_ORDERS> = {};
    
    ordersInYear.forEach(order => {
      const date = new Date(order.date);
      const month = date.toLocaleString('default', { month: 'long' });
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(order);
    });

    return grouped;
  };

  const handleOpenDoc = (order: typeof EXECUTIVE_ORDERS[0]) => {
    setSelectedDoc({
      id: order.id,
      title: order.title,
      category: 'Executive Order',
      size: order.fileSize,
      date: order.date
    });
  };

  const handleDownload = async (order: typeof EXECUTIVE_ORDERS[0]) => {
    if (generatingPdfId) return;
    setGeneratingPdfId(order.id);

    try {
        // Native jsPDF Generation for reliability
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const width = doc.internal.pageSize.getWidth();
        const height = doc.internal.pageSize.getHeight();
        const margin = 20;
        const contentWidth = width - (margin * 2);

        // -- Colors --
        // CES Green: #00a898 -> R:0, G:168, B:152
        
        // -- Double Border --
        doc.setDrawColor(0, 168, 152); 
        doc.setLineWidth(1);
        doc.rect(5, 5, width - 10, height - 10);
        doc.setLineWidth(0.5);
        doc.rect(7, 7, width - 14, height - 14);

        // -- Header --
        // Logo Placeholder (Circle)
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(0, 168, 152);
        doc.setLineWidth(1);
        doc.circle(width / 2, 25, 12, 'FD'); 
        
        // Logo Text inside circle
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("CES", width / 2, 25, { align: "center", baseline: "middle" });
        doc.setFontSize(6);
        doc.setTextColor(0, 168, 152);
        doc.text("SOUTH SUDAN", width / 2, 30, { align: "center", baseline: "middle" });

        // Header Titles
        let y = 48;
        doc.setFont("times", "bold");
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.text("REPUBLIC OF SOUTH SUDAN", width / 2, y, { align: "center" });
        
        y += 8;
        doc.setFontSize(16);
        doc.setTextColor(0, 168, 152);
        doc.text("CENTRAL EQUATORIA STATE", width / 2, y, { align: "center" });
        
        y += 8;
        doc.setFontSize(14);
        doc.setTextColor(100, 100, 100);
        doc.text("OFFICE OF THE GOVERNOR", width / 2, y, { align: "center" });

        // Separator line
        y += 6;
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(margin + 20, y, width - margin - 20, y);

        // -- Info Row --
        y += 10;
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(`Ref: CES/GOV/EO/${order.number}`, margin, y);
        doc.text(`Date: ${formatDate(order.date)}`, width - margin, y, { align: "right" });

        // -- Title --
        y += 15;
        doc.setFontSize(16);
        doc.setFont("times", "bold");
        // Split title if it's too long
        const titleLines = doc.splitTextToSize(order.title.toUpperCase(), contentWidth);
        doc.text(titleLines, width / 2, y, { align: "center" });
        
        // Add underline to title
        const titleHeight = titleLines.length * 7; // Approx height
        doc.setLineWidth(0.5);
        // Draw a line under the title block. Rough calculation of width or just fixed.
        // For simplicity, underlining the whole block width occupied by text is harder without precise width calc per line.
        // We will skip underline or just draw a fixed width line below.
        doc.line(margin, y + 2, width - margin, y + 2);

        y += (titleLines.length * 7) + 5; // Adjust Y based on title height

        // -- Body Content --
        doc.setFontSize(12);
        doc.setFont("times", "normal");
        const lineHeight = 6;
        
        // EO Number Heading
        doc.setFont("times", "bold");
        doc.text(`EXECUTIVE ORDER NO. ${order.number}`, margin, y);
        y += lineHeight * 2;

        // WHEREAS paragraphs
        doc.setFont("times", "normal");
        const p1 = "WHEREAS, the Constitution of Central Equatoria State grants the Governor authority to issue executive orders for the effective administration of the state;";
        const splitP1 = doc.splitTextToSize(p1, contentWidth);
        doc.text(splitP1, margin, y);
        y += splitP1.length * lineHeight + 3;

        const p2 = `AND WHEREAS, it has become necessary to address the matters described regarding ${order.description};`;
        const splitP2 = doc.splitTextToSize(p2, contentWidth);
        doc.text(splitP2, margin, y);
        y += splitP2.length * lineHeight + 3;

        const p3 = "NOW THEREFORE, I, GEN. AUGUSTINO JADALLA KAMILO WANI, Caretaker Governor of Central Equatoria State, do hereby order and direct as follows:";
        const splitP3 = doc.splitTextToSize(p3, contentWidth);
        doc.setFont("times", "bold");
        doc.text(splitP3, margin, y);
        y += splitP3.length * lineHeight + 5;
        
        // List Items
        doc.setFont("times", "normal");
        const items = [
            "That the directives contained herein shall take effect immediately upon signature.",
            "That all relevant state ministries, departments, and agencies are hereby directed to implement these orders without delay.",
            "That any previous orders or regulations inconsistent with this Executive Order are hereby revoked to the extent of such inconsistency.",
            "That this order shall remain in force until revoked or amended by a subsequent Executive Order."
        ];

        items.forEach((item, index) => {
            const prefix = `${index + 1}. `;
            const itemText = doc.splitTextToSize(item, contentWidth - 10);
            doc.text(prefix, margin, y);
            doc.text(itemText, margin + 10, y);
            y += itemText.length * lineHeight + 3;
        });

        // Closing
        y += 10;
        const closing = `Issued under my hand and the seal of the Central Equatoria State Government on this day, ${formatDate(order.date)}.`;
        const splitClosing = doc.splitTextToSize(closing, contentWidth);
        doc.text(splitClosing, margin, y);

        // -- Signature --
        // Position signature near bottom, but check if we need a new page (unlikely for short EOs)
        if (y < 210) y = 210; 
        else y += 20;

        const sigX = width - margin - 45;
        
        // Signature Text
        doc.setFont("times", "italic");
        doc.setFontSize(24);
        doc.setTextColor(0, 0, 150); // Blue ink
        doc.text("Signed", sigX, y, { align: "center", angle: -10 }); // Rotated
        
        y += 15;
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(sigX - 35, y, sigX + 35, y); // Line

        y += 5;
        doc.setFont("times", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text("H.E. Gen. Augustino Jadalla Kamilo Wani", sigX, y, { align: "center" });
        
        y += 5;
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("Caretaker Governor, Central Equatoria State", sigX, y, { align: "center" });

        // -- Footer --
        const footerY = height - 15;
        doc.setDrawColor(0, 168, 152);
        doc.setLineWidth(0.5);
        doc.line(margin, footerY - 5, width - margin, footerY - 5);
        
        doc.setFont("times", "bold");
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text("OFFICIAL GOVERNMENT PUBLICATION • CENTRAL EQUATORIA STATE", width / 2, footerY, { align: "center" });

        // Save
        doc.save(`${order.id}_${order.title.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
        console.error("PDF Generation failed", err);
        alert("Failed to generate PDF. Please try again.");
    } finally {
        setGeneratingPdfId(null);
    }
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
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Executive Orders</h1>
           <p className="text-gray-600 mt-2 text-lg">
             Official decrees, directives, and appointments issued by the Governor of Central Equatoria State.
           </p>

           <div className="mt-8 w-full">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                 <Info size={20} className="text-[#00a898] mr-2" /> About Executive Orders
              </h3>
              <p className="text-gray-700 leading-relaxed">
                 Executive Orders are official directives issued by the Governor to manage the operations of the state government. These orders carry the full authority of the Governor's office and are used to implement policies, make appointments, establish programs, and direct state agencies.
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
                      <span>Recent Orders</span>
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

           {/* Main List Area */}
           <div className="lg:col-span-3">
              {activeTab === 'recent' ? (
                <div className="space-y-6 animate-in fade-in">
                   <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Latest Executive Orders</h2>
                   {EXECUTIVE_ORDERS.slice(0, 5).map((order) => (
                      <Card key={order.id} className="hover:border-[#00a898] transition-all group">
                         <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                               <div className="shrink-0">
                                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                                     <FileText size={24} />
                                  </div>
                               </div>
                               <div className="flex-grow">
                                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                     <span className="text-xs font-bold text-[#00a898] bg-green-50 px-2 py-1 rounded-full uppercase tracking-wide w-fit">
                                        Order No: {order.number}
                                     </span>
                                     <span className="text-sm text-gray-500 flex items-center mt-2 md:mt-0">
                                        <Calendar size={14} className="mr-1" /> {formatDate(order.date)}
                                     </span>
                                  </div>
                                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#00a898] transition-colors mb-2">
                                    {order.title}
                                  </h3>
                                  <p className="text-gray-600 text-sm mb-4">{order.description}</p>
                                  <div className="flex items-center space-x-6">
                                     <button 
                                        onClick={() => handleOpenDoc(order)}
                                        className="text-sm font-medium text-[#00a898] hover:underline bg-transparent border-none cursor-pointer p-0"
                                     >
                                        View Document
                                     </button>
                                     <button 
                                        onClick={() => handleDownload(order)}
                                        disabled={generatingPdfId === order.id}
                                        className="text-sm font-medium text-gray-600 hover:text-[#00a898] hover:underline flex items-center transition-colors bg-transparent border-none cursor-pointer p-0 disabled:opacity-50"
                                     >
                                        {generatingPdfId === order.id ? (
                                           <><Loader2 size={14} className="mr-1.5 animate-spin" /> Generating PDF...</>
                                        ) : (
                                           <><Download size={14} className="mr-1.5" /> Download PDF ({order.fileSize})</>
                                        )}
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
                   
                   {Object.entries(getArchivedOrders(selectedYear)).map(([month, orders]) => (
                      <div key={month} className="space-y-4">
                         <h3 className="font-bold text-gray-800 text-lg sticky top-20 bg-gray-50 py-2">{month}</h3>
                         {orders.map(order => (
                            <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                               <div className="flex items-center space-x-4">
                                  <div className="p-2 bg-gray-100 rounded text-gray-500">
                                     <FileText size={20} />
                                  </div>
                                  <div>
                                     <p className="text-xs text-[#00a898] font-bold">{order.number}</p>
                                     <h4 className="font-semibold text-gray-900 text-sm md:text-base">{order.title}</h4>
                                     <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
                                  </div>
                               </div>
                               <button 
                                 onClick={() => handleDownload(order)} 
                                 className="text-gray-400 hover:text-[#00a898] p-2 bg-transparent border-none cursor-pointer"
                                 disabled={generatingPdfId === order.id}
                               >
                                  {generatingPdfId === order.id ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                               </button>
                            </div>
                         ))}
                         {orders.length === 0 && <p className="text-gray-500 text-sm italic">No orders found.</p>}
                      </div>
                   ))}
                   
                   {Object.keys(getArchivedOrders(selectedYear)).length === 0 && (
                      <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-200">
                         <p className="text-gray-500">No executive orders found for {selectedYear}.</p>
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

export default ExecutiveOrders;
