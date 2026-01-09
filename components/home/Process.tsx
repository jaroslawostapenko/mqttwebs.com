import React from 'react';
import { SERVICE_STEPS } from '../../constants';
import { Container } from '../ui/Container';

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-slate-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our streamlined process ensures your transition to a mobile-first platform is smooth, secure, and efficient.
          </p>
        </div>

        <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>

            <div className="grid lg:grid-cols-4 gap-8 relative z-10">
                {SERVICE_STEPS.map((step, index) => (
                    <div key={step.number} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-brand-600 text-white text-2xl font-bold flex items-center justify-center mb-6 shadow-lg shadow-brand-200">
                            {step.number}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </Container>
    </section>
  );
};