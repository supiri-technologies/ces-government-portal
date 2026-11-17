
import React, { useState } from 'react';
import { FileCheck, Search, ShieldCheck, XCircle, ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Button, Input } from '../components/ui';

const DocumentVerification = () => {
  const [refNo, setRefNo] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [docDetails, setDocDetails] = useState<any>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refNo.trim()) return;

    setStatus('loading');
    
    // Simulate API Check
    setTimeout(() => {
      // Mock validation logic
      const validPrefixes = ['CES-BIZ', 'CES-BIR', 'CES-LND', 'CES-TAX', 'CES-HEA', 'CES-NID'];
      const isValidFormat = validPrefixes.some(p => refNo.toUpperCase().startsWith(p));
      
      if (isValidFormat || refNo === '12345') {
        setStatus('valid');
        setDocDetails({
          type: refNo.includes('BIZ') ? 'Business Registration' : 'Official Document',
          issueDate: '2025-01-15',
          holder: 'John Doe / Example Corp',
          expiry: '2026-01-15'
        });
      } else {
        setStatus('invalid');
        setDocDetails(null);
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-12">
      <Link to="/portal" className="inline-flex items-center text-gray-500 hover:text-[#00a898] mb-6">
        <ChevronLeft size={16} className="mr-1" /> Back to Portal
      </Link>

      <div className="max-w-2xl mx-auto text-center mb-10">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Document Verification</h1>
        <p className="text-gray-600 mt-2">Verify the authenticity of licenses, permits, and certificates issued by the Central Equatoria State Government.</p>
      </div>

      <div className="max-w-xl mx-auto">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleVerify} className="flex gap-3 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  placeholder="Enter Reference Number (e.g. CES-BIZ-2025...)" 
                  className="pl-10 h-12 text-lg"
                  value={refNo}
                  onChange={(e) => setRefNo(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg" disabled={status === 'loading'} className="h-12 px-8">
                {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Verify'}
              </Button>
            </form>

            <div className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50">
              {status === 'idle' && (
                <div className="text-center text-gray-400 p-6">
                  <FileCheck size={48} className="mx-auto mb-3 opacity-50" />
                  <p>Enter a document reference number above to check its status.</p>
                </div>
              )}

              {status === 'loading' && (
                <div className="text-center text-[#00a898] p-6">
                  <Loader2 size={48} className="mx-auto mb-3 animate-spin" />
                  <p>Searching central database...</p>
                </div>
              )}

              {status === 'valid' && (
                <div className="text-center p-6 w-full animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Document Verified</h3>
                  <p className="text-green-600 font-medium mb-6">This document is valid and active.</p>
                  
                  <div className="bg-white rounded-lg border border-gray-200 text-left p-4 space-y-3 shadow-sm">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500 text-sm">Document Type</span>
                      <span className="font-semibold text-gray-900">{docDetails.type}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500 text-sm">Issued To</span>
                      <span className="font-semibold text-gray-900">{docDetails.holder}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500 text-sm">Issue Date</span>
                      <span className="font-semibold text-gray-900">{docDetails.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Valid Until</span>
                      <span className="font-semibold text-gray-900">{docDetails.expiry}</span>
                    </div>
                  </div>
                </div>
              )}

              {status === 'invalid' && (
                <div className="text-center p-6 animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Not Found</h3>
                  <p className="text-red-600 font-medium max-w-xs mx-auto">
                    No valid record found for reference number <span className="font-mono font-bold">{refNo}</span>.
                  </p>
                  <p className="text-sm text-gray-500 mt-4">Please check the number and try again. If the issue persists, contact the issuing authority.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentVerification;
