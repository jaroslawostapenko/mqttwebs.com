import React from 'react';

export const PhonePreview: React.FC = () => {
  return (
    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl rotate-y-12 transform transition-transform hover:scale-105 duration-500">
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white relative">
        {/* Mock Screen Content */}
        <div className="bg-slate-900 text-white p-4 pb-8 rounded-b-3xl absolute top-0 w-full z-10">
            <div className="flex justify-between items-center mb-6 pt-2">
                <div className="w-8 h-8 rounded-full bg-white/20"></div>
                <div className="w-16 h-4 rounded-full bg-white/20"></div>
                <div className="w-8 h-8 rounded-full bg-white/20"></div>
            </div>
            <div className="space-y-3">
                <div className="h-6 w-3/4 bg-white/30 rounded"></div>
                <div className="h-4 w-1/2 bg-white/20 rounded"></div>
            </div>
        </div>
        
        <div className="pt-36 px-4 space-y-4 overflow-hidden h-full">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3">
                    <div className="w-12 h-12 rounded-lg bg-brand-100 shrink-0"></div>
                    <div className="space-y-2 w-full">
                        <div className="h-3 w-2/3 bg-slate-200 rounded"></div>
                        <div className="h-2 w-full bg-slate-100 rounded"></div>
                        <div className="h-2 w-4/5 bg-slate-100 rounded"></div>
                    </div>
                </div>
            ))}
             <div className="bg-brand-500 text-white p-4 rounded-xl shadow-lg mt-4 text-center">
                <div className="font-bold text-sm">Real-Time Update</div>
                <div className="text-xs opacity-80 mt-1">MQTT Connected</div>
            </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};