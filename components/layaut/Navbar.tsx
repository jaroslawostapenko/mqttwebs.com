import React, { useState, useEffect } from 'react';
import { Menu, X, Smartphone } from 'lucide-react';
import { NAV_ITEMS } from '../../constants';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
              MqttWebs
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button variant="primary" size="sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-base font-medium text-slate-600 hover:text-brand-600 py-2 border-b border-slate-50 last:border-0"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button className="w-full mt-2" onClick={() => {
            setIsOpen(false);
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};