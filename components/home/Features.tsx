import React from 'react';
import { FEATURES } from '../../constants';
import { Container } from '../ui/Container';

export const Features: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-brand-600 tracking-wide uppercase">Why Choose MqttWebs</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Engineering the Future of Mobile Web
          </p>
          <p className="mt-4 text-xl text-slate-500">
            We move beyond standard media queries. Our approach involves a complete architectural overhaul for mobile devices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};