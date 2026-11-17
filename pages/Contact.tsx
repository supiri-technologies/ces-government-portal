
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Phone, Mail, Clock, Send, Building2 } from 'lucide-react';
import { Card, CardContent, Button, Input, Label, Select } from '../components/ui';
import { COUNTIES } from '../data';

// Coordinates for the map markers
const COUNTY_COORDINATES: Record<string, [number, number]> = {
  "juba": [4.85, 31.60],
  "yei": [4.09, 30.67],
  "morobo": [3.70, 30.70],
  "lainya": [4.15, 30.95],
  "kajokeji": [3.85, 31.65],
  "terekeka": [5.40, 31.75]
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending message:', formData);
    // Add submission logic
    alert("Message sent! (Simulation)");
  };

  return (
    <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-600">
          Have questions or need assistance? Reach out to the Central Equatoria State Government using the information below or send us a message directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Contact Info & Map */}
        <div className="space-y-8">
           {/* General Info Card */}
           <Card>
             <CardContent className="p-8 space-y-6">
               <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">General Inquiries</h3>
               
               <div className="space-y-6">
                 <div className="flex items-start space-x-4">
                    <div className="p-3 bg-green-50 text-[#00a898] rounded-xl shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">State Secretariat</h4>
                      <p className="text-gray-600 mt-1 leading-relaxed">
                        Ministries Complex<br />
                        Juba, Central Equatoria State<br />
                        Republic of South Sudan
                      </p>
                    </div>
                 </div>

                 <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Phone & Fax</h4>
                      <p className="text-gray-600 mt-1 leading-relaxed">
                        +211 920 000 000 (General)<br />
                        +211 920 000 001 (Governor's Office)
                      </p>
                    </div>
                 </div>

                 <div className="flex items-start space-x-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Email Address</h4>
                      <p className="text-gray-600 mt-1 leading-relaxed">
                        info@ces.gov.ss (General)<br />
                        support@ces.gov.ss (Services)
                      </p>
                    </div>
                 </div>

                 <div className="flex items-start space-x-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-xl shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Office Hours</h4>
                      <p className="text-gray-600 mt-1 leading-relaxed">
                        Monday - Friday: 8:30 AM - 4:30 PM<br />
                        Closed on Weekends and Public Holidays
                      </p>
                    </div>
                 </div>
               </div>
             </CardContent>
           </Card>

           {/* Locations Map */}
           <Card className="overflow-hidden shadow-md">
              <div className="h-[350px] w-full z-0 relative">
                 <MapContainer 
                    center={[4.5, 31.2]} 
                    zoom={8} 
                    scrollWheelZoom={false} 
                    style={{ height: '100%', width: '100%', zIndex: 0 }}
                 >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {Object.entries(COUNTY_COORDINATES).map(([id, coords]) => {
                       const county = COUNTIES.find(c => c.id === id);
                       return (
                         <Marker key={id} position={coords}>
                           <Popup>
                             <div className="text-center">
                               <h3 className="font-bold text-[#00a898]">{county?.name} County HQ</h3>
                               <p className="text-xs text-gray-600">{county?.capital}</p>
                             </div>
                           </Popup>
                         </Marker>
                       )
                    })}
                 </MapContainer>
              </div>
              <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500">Map showing Headquarters of all 6 Counties</p>
              </div>
           </Card>
        </div>

        {/* Right Column: Form & Offices List */}
        <div className="space-y-8">
           
           {/* Contact Form */}
           <Card>
             <CardContent className="p-8">
               <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>
               <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} />
                     </div>
                  </div>
                  
                  <div className="space-y-2">
                     <Label htmlFor="subject">Subject</Label>
                     <Select id="subject" value={formData.subject} onChange={handleChange}>
                        <option>General Inquiry</option>
                        <option>Service Support</option>
                        <option>Report an Issue</option>
                        <option>Media Inquiry</option>
                        <option>Other</option>
                     </Select>
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="message">Message</Label>
                     <textarea 
                        id="message" 
                        className="flex min-h-[150px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00a898] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-sans"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleChange}
                     ></textarea>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send size={18} className="mr-2" /> Send Message
                  </Button>
               </form>
             </CardContent>
           </Card>

           {/* County Offices List */}
           <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 px-1">County Offices</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {COUNTIES.map((county) => (
                    <div key={county.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#00a898]/30 hover:shadow-md transition-all">
                       <div className="flex items-center space-x-3 mb-3">
                          <div className={`w-3 h-3 rounded-full ${county.color}`}></div>
                          <h4 className="font-bold text-gray-900">{county.name} County</h4>
                       </div>
                       <div className="pl-6 space-y-2 text-sm text-gray-600">
                          <p className="flex items-center"><Building2 size={14} className="mr-2 text-gray-400" /> {county.capital} HQ</p>
                          <p className="flex items-center"><Phone size={14} className="mr-2 text-gray-400" /> +211 920 000 XXX</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
