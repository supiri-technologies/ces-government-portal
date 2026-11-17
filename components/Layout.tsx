
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutGrid, UserPlus, LogIn, MapPin, Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from './ui';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  // Treat auth pages as part of the portal context
  const isPortal = location.pathname.startsWith('/portal') || location.pathname.startsWith('/auth');

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Top Bar */}
      <div className="bg-gray-900 py-2 px-4 md:px-8 border-b border-gray-800">
        <div className="container mx-auto max-w-[95%] flex justify-between items-center text-xs md:text-sm">
          <span className="text-[#00a898] font-semibold hidden sm:inline">
            {isPortal ? 'Central Equatoria State' : 'Republic of South Sudan'}
          </span>
          <div className="flex items-center space-x-4 ml-auto">
            {!isPortal ? (
              <Link to="/portal" className="flex items-center space-x-1 text-[#00a898] hover:text-white transition-colors">
                <LayoutGrid size={14} />
                <span>CES eGovernment Portal</span>
              </Link>
            ) : (
              <>
                <Link to="/auth/signup" className="flex items-center space-x-1 text-gray-300 hover:text-[#00a898] transition-colors">
                  <UserPlus size={14} />
                  <span>Create Account</span>
                </Link>
                <div className="h-4 w-[1px] bg-gray-700 hidden sm:block"></div>
                <Link to="/auth/signin" className="flex items-center space-x-1 text-gray-300 hover:text-[#00a898] transition-colors">
                  <LogIn size={14} />
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Conditional Header Rendering */}
      {isPortal ? (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
          <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
             <div className="flex items-center">
               <Link to="/portal" className="mr-3 md:mr-4 flex-shrink-0">
                  <img 
                    src="/emblem_ces-removebg.png" 
                    alt="CES Emblem" 
                    className="w-16 h-16 md:w-20 md:h-20 object-contain" 
                    referrerPolicy="no-referrer" 
                  />
               </Link>
               <div className="flex flex-col justify-center">
                 <h1 className="text-lg md:text-2xl font-bold text-[#00a898] leading-tight">CES eGovernment Portal</h1>
                 <span className="text-xs md:text-sm font-medium text-gray-900 leading-tight hidden sm:block">The official government portal of CES, Republic of South Sudan.</span>
               </div>
             </div>
             <nav className="flex items-center space-x-1 md:space-x-2">
               <Link
                 to="/portal"
                 className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                   isActive('/portal') ? 'text-[#00a898]' : 'text-gray-700 hover:text-[#00a898]'
                 }`}
               >
                 Portal Home
               </Link>
               <Link
                 to="/portal/efiling-tools"
                 className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                   isActive('/portal/efiling-tools') ? 'text-[#00a898]' : 'text-gray-700 hover:text-[#00a898]'
                 }`}
               >
                 eFiling Tools
               </Link>
             </nav>
          </div>
        </header>
      ) : (
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto max-w-[95%] px-4 md:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              {/* Logo Area */}
              <Link to="/" className="flex items-center space-x-2 md:space-x-3 group">
                <img 
                  src="/emblem_ces-removebg.png" 
                  alt="CES Emblem" 
                  className="w-16 h-16 md:w-20 md:h-20 object-contain" 
                  referrerPolicy="no-referrer" 
                />
                <div className="flex flex-col">
                  <span className="text-base md:text-lg font-bold text-gray-900 leading-tight">Central Equatoria State</span>
                  <span className="text-[10px] md:text-xs text-gray-500 hidden sm:block">The official government portal of CES, Republic of South Sudan.</span>
                </div>
              </Link>

              {/* Desktop Menu */}
              <nav className="hidden lg:flex items-center space-x-1">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Government', path: '/government' },
                  { name: 'Ministries', path: '/ministries' },
                  { name: 'Services', path: '/services' },
                  { name: 'eFiling Tools', path: '/efiling-tools' },
                  { name: 'Documents', path: '/documents' },
                  { name: 'Contact', path: '/contact' },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                      isActive(item.path)
                        ? 'text-[#00a898]'
                        : 'text-gray-700 hover:text-[#00a898]'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-gray-600 hover:text-[#00a898]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-100 py-2 shadow-lg absolute w-full left-0 z-50">
              {[
                { name: 'Home', path: '/' },
                { name: 'Government', path: '/government' },
                { name: 'Ministries', path: '/ministries' },
                { name: 'Services', path: '/services' },
                { name: 'eFiling Tools', path: '/efiling-tools' },
                { name: 'Documents', path: '/documents' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-6 py-3 text-base font-medium ${
                    isActive(item.path)
                      ? 'text-[#00a898] bg-gray-50'
                      : 'text-gray-700 hover:text-[#00a898] hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </header>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-12 md:pt-16 pb-8">
        <div className="container mx-auto max-w-[95%] px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-white text-xl font-bold mb-4">Central Equatoria State Government</h3>
              <p className="text-gray-400 mb-6 max-w-md text-sm md:text-base">
                The official government portal of CES, Republic of South Sudan. Providing transparent, accessible, and efficient services to all citizens.
              </p>
              <div className="text-sm font-semibold text-gray-500">
                Republic of South Sudan | Central Equatoria State
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/" className="hover:text-[#00a898] transition-colors">Home</Link></li>
                <li><Link to="/government" className="hover:text-[#00a898] transition-colors">About the State</Link></li>
                <li><Link to="/services" className="hover:text-[#00a898] transition-colors">Services</Link></li>
                <li><Link to="/government" className="hover:text-[#00a898] transition-colors">Executive Office</Link></li>
                <li><Link to="/documents" className="hover:text-[#00a898] transition-colors">News & Updates</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start">
                  <MapPin size={18} className="mr-3 text-[#00a898] mt-0.5 shrink-0" />
                  <span>Juba, Central Equatoria State,<br/>South Sudan</span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-3 text-[#00a898] shrink-0" />
                  <span>+211 920 000 000</span>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="mr-3 text-[#00a898] shrink-0" />
                  <span className="break-all">info@ces.gov.ss</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
            <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Central Equatoria State Government. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
