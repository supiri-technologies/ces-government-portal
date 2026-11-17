
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Phone, LifeBuoy, Download, Search } from 'lucide-react';
import { Card, CardContent, Button, LineInput, Checkbox, Label } from '../components/ui';

const SignIn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in with:', formData);
    // Simulate Login Success
    // If a redirect URL exists (from "File Online"), go there. Otherwise, go to dashboard.
    const destination = redirectUrl ? redirectUrl : '/portal/dashboard';
    navigate(destination);
  };

  return (
    <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-12 flex flex-col items-center">
      <div className="w-full max-w-md space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
          <p className="mt-2 text-gray-600">
            Access the Central Equatoria State eGovernment Portal
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-2">
          <CardContent className="space-y-6 pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <LineInput 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    icon={Mail}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <LineInput 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    icon={Lock}
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-[#00a898] hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full" size="lg">Sign In</Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <Link to="/auth/signup" className="block">
              <Button type="button" variant="outline" className="w-full">Create an Account</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-blue-50 border-none" noShadow>
          <CardContent className="flex items-start space-x-3 p-4">
            <AlertCircle className="text-blue-600 shrink-0" size={20} />
            <div className="text-sm text-blue-800">
              <span className="font-bold block mb-1">Security Notice</span>
              Never share your password with anyone. Government officials will never ask for your password via email or phone.
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <Link to="/services" className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-[#00a898]">
                <Search size={20} />
                <span className="text-xs font-medium">Browse Services</span>
            </Link>
            <Link to="/documents" className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-[#00a898]">
                <Download size={20} />
                <span className="text-xs font-medium">Download Forms</span>
            </Link>
            <Link to="/contact" className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-[#00a898]">
                <LifeBuoy size={20} />
                <span className="text-xs font-medium">Contact Support</span>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
