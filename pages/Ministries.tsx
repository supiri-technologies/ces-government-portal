
import React from 'react';
import { Building2, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../components/ui';
import { MINISTRIES } from '../data';

const Ministries = () => {
  return (
    <div className="container mx-auto max-w-[95%] px-4 md:px-8 py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Central Equatoria State Ministries</h1>
        <p className="text-gray-600 max-w-3xl">
          The executive branch of the state government is organized into 17 ministries, each responsible for specific sectors of public administration and service delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MINISTRIES.map((ministry, index) => (
          <Card key={index} className="h-full flex flex-col hover:border-[#00a898]/30 transition-all">
            <CardContent className="flex items-start space-x-4 p-6 flex-grow">
              <div className="p-3 bg-[#f0f9f1] rounded-lg text-[#00a898] shrink-0">
                <Building2 size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900">{ministry.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {ministry.description}
                </p>
              </div>
            </CardContent>
            <div className="px-6 pb-6 pt-0">
               <a 
                 href="#"
                 onClick={(e) => e.preventDefault()}
                 className="text-sm font-medium text-[#00a898] hover:underline flex items-center w-fit"
               >
                 Visit Ministry Website <ExternalLink size={14} className="ml-1" />
               </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Ministries;
