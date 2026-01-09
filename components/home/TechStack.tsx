import React from 'react';
import { Container } from '../ui/Container';
import { Activity, Layers, Wifi } from 'lucide-react';

export const TechStack: React.FC = () => {
  return (
    <section id="tech" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            <div className="absolute w-96 h-96 bg-brand-500 rounded-full blur-[100px] -top-20 -left-20"></div>
            <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-[100px] bottom-0 right-0"></div>
        </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Powered by MQTT Protocol</h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                    Unlike traditional REST APIs that require constant polling, our mobile solutions utilize the MQTT (Message Queuing Telemetry Transport) protocol. This lightweight, publish-subscribe network protocol transports messages between devices with minimal network bandwidth.
                </p>
                
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-900/50 flex items-center justify-center shrink-0 border border-brand-700">
                            <Wifi className="w-6 h-6 text-brand-400" />
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Low Bandwidth Usage</h4>
                            <p className="text-slate-400">Perfect for unstable mobile networks. Headers are kept small to ensure messages are delivered efficiently.</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-900/50 flex items-center justify-center shrink-0 border border-brand-700">
                            <Activity className="w-6 h-6 text-brand-400" />
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Real-Time Bi-directional</h4>
                            <p className="text-slate-400">Push updates to the client instantly. Ideal for chat, notifications, and live dashboards.</p>
                        </div>
                    </div>

                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-900/50 flex items-center justify-center shrink-0 border border-brand-700">
                            <Layers className="w-6 h-6 text-brand-400" />
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Battery Efficient</h4>
                            <p className="text-slate-400">Keep connections open without draining the user's battery, unlike frequent HTTP polling.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                <div className="font-mono text-sm text-green-400 mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    System Status: Connected
                </div>
                <div className="space-y-4 font-mono text-sm">
                    <div className="p-3 bg-slate-900 rounded border-l-4 border-brand-500">
                        <span className="text-slate-500">{`>`}</span> Connecting to broker... <span className="text-green-500">OK</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded border-l-4 border-purple-500">
                        <span className="text-slate-500">{`>`}</span> Subscribing to topic 'user/updates'... <span className="text-green-500">OK</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded border-l-4 border-yellow-500">
                        <span className="text-slate-500">{`>`}</span> Payload received: <span className="text-blue-300">{`{ "id": 102, "status": "shipped" }`}</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded border-l-4 border-green-500">
                        <span className="text-slate-500">{`>`}</span> DOM Update triggered: 12ms
                    </div>
                </div>
            </div>
        </div>
      </Container>
    </section>
  );
};