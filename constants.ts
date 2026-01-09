import { 
  Smartphone, 
  Zap, 
  Globe, 
  Shield, 
  Wifi, 
  Cpu,
  Layers,
  Activity
} from 'lucide-react';
import { NavItem, Feature, PricingTier, Testimonial, ServiceStep } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Technology', href: '#tech' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export const FEATURES: Feature[] = [
  {
    title: 'Mobile-First Architecture',
    description: 'We do not just shrink your desktop site. We reimagine it specifically for touch interfaces and smaller screens.',
    icon: Smartphone,
  },
  {
    title: 'Real-Time MQTT Sync',
    description: 'Our proprietary MQTT integration ensures your mobile data is synchronized with your backend in milliseconds.',
    icon: Wifi,
  },
  {
    title: 'Offline Capabilities',
    description: 'Built as Progressive Web Apps (PWA), our sites work flawlessly even when the network connection is spotty.',
    icon: Zap,
  },
  {
    title: 'Global CDN Delivery',
    description: 'Assets are distributed across the globe to ensure the lowest latency for your international customers.',
    icon: Globe,
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and secure token handling for all mobile transactions and data exchanges.',
    icon: Shield,
  },
  {
    title: 'Hardware Acceleration',
    description: 'We utilize GPU acceleration for smooth 60fps animations and transitions on all modern mobile devices.',
    icon: Cpu,
  }
];

export const SERVICE_STEPS: ServiceStep[] = [
  {
    number: '01',
    title: 'Audit & Analysis',
    description: 'We analyze your current desktop infrastructure and identify key user journeys that need optimization for mobile.',
  },
  {
    number: '02',
    title: 'UX/UI Adaptation',
    description: 'Our designers create a high-fidelity prototype focused on thumb-friendly navigation and clear visual hierarchy.',
  },
  {
    number: '03',
    title: 'MQTT Integration',
    description: 'We implement our lightweight messaging protocol to handle real-time data streams without draining the battery.',
  },
  {
    number: '04',
    title: 'Deployment & Scale',
    description: 'Seamless launch with zero downtime, followed by continuous monitoring and performance scaling.',
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: '$999',
    description: 'Perfect for small businesses needing a quick mobile presence.',
    features: [
      'Responsive Layout',
      'Basic MQTT Integration',
      '5 Pages Conversion',
      'Standard SEO',
      'Email Support'
    ]
  },
  {
    name: 'Business',
    price: '$2,499',
    description: 'For growing companies requiring real-time features.',
    features: [
      'PWA Functionality',
      'Advanced MQTT Streams',
      'Unlimited Pages',
      'Performance Optimization',
      'Priority Support',
      'Push Notifications'
    ],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Full-scale solution for high-traffic platforms.',
    features: [
      'Custom Mobile Architecture',
      'Dedicated Server Cluster',
      'SLA Guarantee',
      '24/7 Dedicated Support',
      'Security Audits',
      'Custom Analytics'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechFlow',
    content: 'MqttWebs transformed our legacy portal into a lightning-fast mobile app. The real-time updates are instant.',
    avatarUrl: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'LogiStream',
    content: 'The battery optimization is incredible. Our field agents use the tool all day without draining their phones.',
    avatarUrl: 'https://picsum.photos/100/100?random=2'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Founder',
    company: 'RetailNow',
    content: 'Sales increased by 40% after we launched the mobile version. The checkout flow is buttery smooth.',
    avatarUrl: 'https://picsum.photos/100/100?random=3'
  }
];