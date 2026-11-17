
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, ChevronLeft, User, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Button, Input, Label, Select } from '../components/ui';

const AppointmentScheduler = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [ministry, setMinistry] = useState('');

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", "03:00 PM"
  ];

  const handleBook = () => {
    setStep(3);
  };

  return (
    <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-12">
      <Link to="/portal" className="inline-flex items-center text-gray-500 hover:text-[#00a898] mb-6">
        <ChevronLeft size={16} className="mr-1" /> Back to Portal
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Book an Appointment</h1>
          <p className="text-gray-600 mt-2">Schedule a visit with government offices for consultations or services.</p>
        </div>

        {step < 3 && (
          <div className="flex items-center justify-center mb-8 space-x-4">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-[#00a898]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-[#00a898] bg-[#00a898] text-white' : 'border-gray-300'}`}>1</div>
              <span className="font-medium hidden sm:inline">Details</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-[#00a898]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-[#00a898] bg-[#00a898] text-white' : 'border-gray-300'}`}>2</div>
              <span className="font-medium hidden sm:inline">Personal Info</span>
            </div>
          </div>
        )}

        <Card className="shadow-lg">
          <CardContent className="p-8">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="ministry">Select Ministry / Department</Label>
                    <Select id="ministry" icon={Building2} value={ministry} onChange={(e) => setMinistry(e.target.value)}>
                       <option value="">Choose Department</option>
                       <option>Ministry of Trade & Industry</option>
                       <option>Ministry of Housing & Lands</option>
                       <option>Civil Registry (Passport/ID)</option>
                       <option>Traffic Police HQ</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Type</Label>
                    <Select id="service">
                       <option>General Consultation</option>
                       <option>Document Submission</option>
                       <option>Interview</option>
                       <option>Complaint/Appeal</option>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <Input 
                      type="date" 
                      className="h-12" 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Select Time Slot</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setTime(slot)}
                          className={`text-sm py-2 rounded-md border transition-colors ${time === slot ? 'bg-[#00a898] text-white border-[#00a898]' : 'bg-white border-gray-200 hover:border-[#00a898] text-gray-700'}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button onClick={() => setStep(2)} disabled={!date || !time || !ministry} size="lg">Next Step</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center mb-6">
                   <div>
                     <p className="text-sm text-gray-500">Appointment For</p>
                     <p className="font-bold text-gray-900">{ministry}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-sm text-gray-500">{date}</p>
                     <p className="font-bold text-[#00a898]">{time}</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <Label>Full Name</Label>
                     <Input placeholder="Enter your name" />
                   </div>
                   <div className="space-y-2">
                     <Label>Phone Number</Label>
                     <Input placeholder="+211..." />
                   </div>
                   <div className="space-y-2 md:col-span-2">
                     <Label>Reason for Visit (Optional)</Label>
                     <Input placeholder="Brief description..." />
                   </div>
                </div>

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={handleBook} size="lg">Confirm Booking</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 text-[#00a898] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
                <p className="text-gray-600 mb-8">Your appointment has been scheduled successfully.</p>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto text-left space-y-3 mb-8">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Reference:</span>
                    <span className="font-mono font-bold">APT-{Math.floor(Math.random()*10000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-bold">{date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time:</span>
                    <span className="font-bold">{time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-bold text-right w-1/2">{ministry}</span>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => window.print()}>Print Slip</Button>
                  <Link to="/portal">
                    <Button>Return to Portal</Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
