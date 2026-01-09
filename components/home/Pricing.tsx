import React from 'react';
import { PRICING_TIERS } from '../../constants';
import { Container } from '../ui/Container';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-600">Choose the package that suits your business scale.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier) => (
            <div 
              key={tier.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                tier.recommended 
                  ? 'bg-slate-900 text-white ring-4 ring-brand-500/30 shadow-2xl scale-105' 
                  : 'bg-white text-slate-900 border border-slate-200 shadow-lg'
              }`}
            >
              {tier.recommended && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="inline-block bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Recommended
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-2 ${tier.recommended ? 'text-white' : 'text-slate-900'}`}>
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className={`text-sm ${tier.recommended ? 'text-slate-400' : 'text-slate-500'}`}>/project</span>}
                </div>
                <p className={`mt-4 text-sm ${tier.recommended ? 'text-slate-300' : 'text-slate-500'}`}>
                  {tier.description}
                </p>
              </div>

              <div className="flex-1 mb-8">
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 shrink-0 ${tier.recommended ? 'text-brand-400' : 'text-brand-600'}`} />
                      <span className={`text-sm ${tier.recommended ? 'text-slate-300' : 'text-slate-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                variant={tier.recommended ? 'primary' : 'outline'} 
                className="w-full"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Choose {tier.name}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};