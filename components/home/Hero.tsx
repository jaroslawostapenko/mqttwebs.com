import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { PhonePreview } from './PhonePreview';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-brand-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              Now supporting MQTT 5.0
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
              Mobile Websites <br />
              <span className="text-brand-600">Reimagined for Speed</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We don't just make your site responsive. We rebuild it as a high-performance Progressive Web App powered by MQTT for real-time data synchronization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Transformation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}>
                How it Works
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-500" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-500" />
                <span>Sub-second load</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-500" />
                <span>Native Feel</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center perspective-1000">
            <PhonePreview />
          </div>
        </div>
      </Container>
    </section>
  );
};