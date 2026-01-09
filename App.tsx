import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { Features } from './components/home/Features';
import { TechStack } from './components/home/TechStack';
import { Process } from './components/home/Process';
import { Pricing } from './components/home/Pricing';
import { Testimonials } from './components/home/Testimonials';
import { Contact } from './components/home/Contact';
import { Footer } from './components/layout/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TechStack />
        <Process />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;