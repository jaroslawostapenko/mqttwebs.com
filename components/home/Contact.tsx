import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactStatus } from '../../types';

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<ContactStatus>(ContactStatus.IDLE);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(ContactStatus.SUBMITTING);
    // Simulate API call
    setTimeout(() => {
      setStatus(ContactStatus.SUCCESS);
      setFormData({ name: '', email: '', website: '', message: '' });
      setTimeout(() => setStatus(ContactStatus.IDLE), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Let's Mobilize Your Web Presence</h2>
            <p className="text-slate-300 mb-12 text-lg">
              Ready to provide your users with a world-class mobile experience? Fill out the form or reach out directly.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Email Us</h4>
                  <a href="mailto:hello@mqttwebs.com" className="text-slate-400 hover:text-white transition-colors">hello@mqttwebs.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Call Us</h4>
                  <a href="tel:+15551234567" className="text-slate-400 hover:text-white transition-colors">+1 (555) 123-4567</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Office</h4>
                  <p className="text-slate-400">123 Innovation Blvd, Tech District<br />San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 text-slate-900">
            <h3 className="text-2xl font-bold mb-6">Request a Free Audit</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-slate-700 mb-1">Current Website URL</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  required
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="https://company.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Tell us about your mobile goals..."
                ></textarea>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={status === ContactStatus.SUBMITTING || status === ContactStatus.SUCCESS}
              >
                {status === ContactStatus.SUBMITTING ? 'Sending...' : 
                 status === ContactStatus.SUCCESS ? 'Message Sent!' : 
                 'Get Free Audit'}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};