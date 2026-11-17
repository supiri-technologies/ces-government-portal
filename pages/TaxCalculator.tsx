
import React, { useState } from 'react';
import { Calculator, RefreshCcw, Info, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Button, Input, Label, Select } from '../components/ui';

const TaxCalculator = () => {
  const [mode, setMode] = useState<'individual' | 'business'>('individual');
  const [income, setIncome] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateTax = () => {
    const amount = parseFloat(income);
    if (isNaN(amount)) return;

    let tax = 0;
    
    if (mode === 'individual') {
      // Simple PIT Logic Simulation for South Sudan (Example brackets)
      // 0 - 2,000: 0%
      // 2,001 - 5,000: 5%
      // 5,001 - 10,000: 10%
      // 10,001+: 15%
      if (amount <= 2000) tax = 0;
      else if (amount <= 5000) tax = (amount - 2000) * 0.05;
      else if (amount <= 10000) tax = (3000 * 0.05) + ((amount - 5000) * 0.10);
      else tax = (3000 * 0.05) + (5000 * 0.10) + ((amount - 10000) * 0.15);
    } else {
      // Business Profit Tax (Flat 20% for simulation)
      tax = amount * 0.20;
    }

    setResult(tax);
  };

  const reset = () => {
    setIncome('');
    setResult(null);
  };

  return (
    <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-12">
      <Link to="/portal" className="inline-flex items-center text-gray-500 hover:text-[#00a898] mb-6">
        <ChevronLeft size={16} className="mr-1" /> Back to Portal
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-100 text-[#00a898] rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Tax Liability Calculator</h1>
          <p className="text-gray-600 mt-2">Estimate your Personal Income Tax (PIT) or Business Profit Tax obligations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Calculator Form */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-8">
                <div className="flex space-x-4 mb-6">
                  <button 
                    onClick={() => { setMode('individual'); setResult(null); }}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${mode === 'individual' ? 'bg-[#00a898] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    Individual (PIT)
                  </button>
                  <button 
                    onClick={() => { setMode('business'); setResult(null); }}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${mode === 'business' ? 'bg-[#00a898] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    Business Profit Tax
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="income" className="text-base mb-2 block">
                      {mode === 'individual' ? 'Gross Monthly Income (SSP)' : 'Annual Net Profit (SSP)'}
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">SSP</span>
                      <Input 
                        id="income" 
                        type="number" 
                        className="pl-12 h-12 text-lg" 
                        placeholder="0.00"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                      />
                    </div>
                  </div>

                  {mode === 'business' && (
                    <div>
                      <Label htmlFor="sector" className="mb-2 block">Business Sector</Label>
                      <Select id="sector">
                        <option>General Trading</option>
                        <option>Agriculture (Exemptions apply)</option>
                        <option>Services</option>
                        <option>Manufacturing</option>
                      </Select>
                    </div>
                  )}

                  <div className="flex space-x-4 pt-4">
                    <Button onClick={calculateTax} size="lg" className="flex-1 text-base">
                      Calculate Tax
                    </Button>
                    <Button onClick={reset} variant="outline" size="lg" className="px-6">
                      <RefreshCcw size={20} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Result Panel */}
          <div className="md:col-span-1">
            <Card className={`h-full border-2 ${result !== null ? 'border-[#00a898] bg-[#f0f9f1]' : 'border-dashed border-gray-200 bg-gray-50'}`}>
              <CardContent className="p-8 h-full flex flex-col justify-center items-center text-center">
                {result !== null ? (
                  <div className="animate-in zoom-in duration-300 w-full">
                    <h3 className="text-gray-600 font-medium mb-2">Estimated Liability</h3>
                    <div className="text-4xl font-bold text-[#00a898] mb-6">
                      {result.toLocaleString()} <span className="text-lg text-gray-500">SSP</span>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm text-left text-sm space-y-2 mb-6 w-full">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Taxable Amount:</span>
                        <span className="font-semibold">{parseFloat(income).toLocaleString()} SSP</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Rate Applied:</span>
                        <span className="font-semibold">{mode === 'individual' ? 'Progressive' : '20% Flat'}</span>
                      </div>
                      <div className="border-t border-gray-100 my-2"></div>
                      <div className="flex justify-between text-[#00a898] font-bold">
                        <span>Total Due:</span>
                        <span>{result.toLocaleString()} SSP</span>
                      </div>
                    </div>

                    <Link to="/payment">
                      <Button className="w-full">Proceed to Payment</Button>
                    </Link>
                    <p className="text-xs text-gray-400 mt-4">* This is an estimation. Final assessment is done by the State Revenue Authority.</p>
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <Info size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Enter your financial details to see the tax breakdown.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;
