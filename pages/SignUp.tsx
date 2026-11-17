
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Lock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, Button, LineInput, Checkbox, Label, Select } from '../components/ui';
import { COUNTIES } from '../data';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    county: '',
    address: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    // Handle checkbox separately since HTMLSelectElement doesn't have 'checked' property
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up with:', formData);
    // Add logic here
  };

  return (
    <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-12 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">
            Join the digital government platform for easier access to services
          </p>
        </div>

        <Card className="p-2">
            <CardContent className="space-y-8 pt-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <LineInput id="firstName" placeholder="Enter first name" icon={User} value={formData.firstName} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <LineInput id="lastName" placeholder="Enter last name" icon={User} value={formData.lastName} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <LineInput id="email" type="email" placeholder="name@example.com" icon={Mail} value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <LineInput id="phone" type="tel" placeholder="+211 XXX XXX XXX" icon={Phone} value={formData.phone} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Address Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="county">County</Label>
                                <Select id="county" icon={MapPin} value={formData.county} onChange={handleChange}>
                                    <option value="">Select County</option>
                                    {COUNTIES.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="address">Physical Address</Label>
                                <LineInput id="address" placeholder="Residential Area / Boma" icon={MapPin} value={formData.address} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Security Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Security</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <LineInput id="password" type="password" placeholder="••••••••" icon={Lock} value={formData.password} onChange={handleChange} />
                                <p className="text-xs text-gray-500">Must be at least 8 characters</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <LineInput id="confirmPassword" type="password" placeholder="••••••••" icon={Lock} value={formData.confirmPassword} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start space-x-3 pt-2">
                        <Checkbox id="terms" className="mt-1" checked={formData.terms} onChange={handleChange} />
                        <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                            I agree to the <a href="#" className="text-[#00a898] hover:underline">Terms and Conditions</a> and <a href="#" className="text-[#00a898] hover:underline">Privacy Policy</a> of the Central Equatoria State eGovernment Portal.
                        </label>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button type="submit" size="lg" className="w-full">Create Account</Button>
                        <Link to="/auth/signin" className="w-full">
                             <Button type="button" variant="outline" className="w-full">Already have an account? Sign In</Button>
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>

        {/* Benefits Card */}
        <Card className="bg-[#f0f9f1] border-none w-full" noShadow>
            <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Why Create an Account?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                    <div className="flex items-center"><CheckCircle2 size={16} className="text-[#00a898] mr-2"/> Track application status in real-time</div>
                    <div className="flex items-center"><CheckCircle2 size={16} className="text-[#00a898] mr-2"/> Save forms and resume later</div>
                    <div className="flex items-center"><CheckCircle2 size={16} className="text-[#00a898] mr-2"/> Secure online payments history</div>
                    <div className="flex items-center"><CheckCircle2 size={16} className="text-[#00a898] mr-2"/> Receive notifications and alerts</div>
                    <div className="flex items-center"><CheckCircle2 size={16} className="text-[#00a898] mr-2"/> Access all services with one ID</div>
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default SignUp;
