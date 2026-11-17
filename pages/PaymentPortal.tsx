
import React, { useState } from 'react';
import { CreditCard, Search, ShieldCheck, CheckCircle2, Wallet, Loader2, ArrowRight, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Button, Input, Label } from '../components/ui';

const PaymentPortal = () => {
  const [step, setStep] = useState(1);
  const [billNo, setBillNo] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [billDetails, setBillDetails] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billNo) return;
    setIsSearching(true);
    
    // Simulate lookup
    setTimeout(() => {
      setIsSearching(false);
      setBillDetails({
        id: billNo,
        description: 'Business Registration Renewal',
        entity: 'CES Ministry of Trade',
        amount: '5,000',
        currency: 'SSP',
        dueDate: '2025-02-28',
        status: 'Unpaid'
      });
      setStep(2);
    }, 1500);
  };

  const handlePay = () => {
    if (!paymentMethod) return;
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CASHIT Brand Header */}
      <div className="bg-gray-900 text-white py-6">
        <div className="container mx-auto max-w-[95%] px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#00a898] rounded-lg flex items-center justify-center font-black text-xl italic tracking-tighter">
              C
            </div>
            <span className="text-2xl font-bold tracking-tight">CASHIT <span className="text-[#00a898]">PAY</span></span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ShieldCheck size={16} className="mr-2 text-[#00a898]" /> Secure Government Payment Gateway
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-xl px-4 py-12">
        
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Make a Payment</h1>
              <p className="text-gray-600 mt-2">Pay for government services, licenses, and taxes securely.</p>
            </div>

            <Card className="shadow-xl border-t-4 border-t-[#00a898]">
              <CardContent className="p-8">
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="billNo" className="text-base">Bill Reference Number</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input 
                        id="billNo" 
                        placeholder="Enter Bill No. (e.g. INV-2025-001)" 
                        className="pl-10 h-14 text-lg"
                        value={billNo}
                        onChange={(e) => setBillNo(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-gray-500">You can find this on your assessment form or invoice.</p>
                  </div>
                  <Button type="submit" size="lg" className="w-full h-12 text-lg" disabled={isSearching}>
                    {isSearching ? <Loader2 className="animate-spin" /> : 'Find Bill'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4 text-center text-gray-500 text-xs">
               <div className="flex flex-col items-center gap-2">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"><Wallet size={20} /></div>
                 <span>Mobile Money</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"><CreditCard size={20} /></div>
                 <span>Credit/Debit Card</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"><Building2 size={20} /></div>
                 <span>Bank Transfer</span>
               </div>
            </div>
          </div>
        )}

        {step === 2 && billDetails && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-gray-900 flex items-center">
              <ArrowRight className="rotate-180 mr-1" size={16} /> Back to Search
            </button>

            <Card className="shadow-lg overflow-hidden">
               <div className="bg-gray-900 text-white p-6 flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-xs uppercase font-bold">Amount Due</p>
                    <p className="text-3xl font-bold">{billDetails.amount} <span className="text-lg text-[#00a898]">{billDetails.currency}</span></p>
                  </div>
                  <div className="text-right">
                    <div className="bg-[#00a898] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {billDetails.status}
                    </div>
                  </div>
               </div>
               <CardContent className="p-6">
                 <div className="space-y-4 mb-8">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Bill Reference</span>
                      <span className="font-mono font-bold text-gray-900">{billDetails.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Description</span>
                      <span className="font-semibold text-gray-900">{billDetails.description}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Beneficiary</span>
                      <span className="font-semibold text-gray-900">{billDetails.entity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Due Date</span>
                      <span className="font-semibold text-gray-900">{billDetails.dueDate}</span>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <Label>Select Payment Method</Label>
                    <div className="grid grid-cols-1 gap-3">
                       {['mGurush', 'NilePay', 'VISA / MasterCard'].map(method => (
                         <div 
                           key={method} 
                           onClick={() => setPaymentMethod(method)}
                           className={`p-4 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${paymentMethod === method ? 'border-[#00a898] bg-[#f0f9f1] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                         >
                            <span className="font-semibold text-gray-700">{method}</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === method ? 'border-[#00a898]' : 'border-gray-300'}`}>
                               {paymentMethod === method && <div className="w-2.5 h-2.5 bg-[#00a898] rounded-full"></div>}
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <Button 
                   onClick={handlePay} 
                   className="w-full mt-8 h-12 text-lg font-bold" 
                   disabled={!paymentMethod || isProcessing}
                 >
                   {isProcessing ? <><Loader2 className="animate-spin mr-2" /> Processing...</> : `Pay ${billDetails.amount} ${billDetails.currency}`}
                 </Button>

               </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-8 animate-in zoom-in duration-300">
             <div className="w-24 h-24 bg-green-100 text-[#00a898] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <CheckCircle2 size={48} />
             </div>
             <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful</h2>
             <p className="text-gray-600 mb-8">Transaction ID: TXN-{Math.floor(Math.random()*10000000)}</p>

             <Card className="max-w-sm mx-auto mb-8 bg-gray-50 border-gray-200">
               <CardContent className="p-6 text-left space-y-3">
                  <div className="flex justify-between">
                     <span className="text-gray-500">Amount Paid</span>
                     <span className="font-bold">{billDetails.amount} {billDetails.currency}</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-gray-500">Method</span>
                     <span className="font-bold">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-gray-500">Date</span>
                     <span className="font-bold">{new Date().toLocaleDateString()}</span>
                  </div>
               </CardContent>
             </Card>

             <div className="flex justify-center gap-4">
               <Button variant="outline" onClick={() => window.print()}>Print Receipt</Button>
               <Link to="/portal">
                 <Button>Return to Portal</Button>
               </Link>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPortal;
