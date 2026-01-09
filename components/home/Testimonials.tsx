import React from 'react';
import { TESTIMONIALS } from '../../constants';
import { Container } from '../ui/Container';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted by Mobile Leaders</h2>
          <p className="text-slate-600">See what our partners say about their transformation.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={t.avatarUrl} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-sm text-slate-500">{t.role}, {t.company}</p>
                </div>
              </div>
              <p className="text-slate-600 italic leading-relaxed">"{t.content}"</p>
              <div className="mt-6 flex text-brand-400">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};