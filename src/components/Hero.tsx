import React from 'react';
import { ArrowRight, Shield, Zap, Clock, Car } from 'lucide-react';
import Button from './Button';

interface HeroProps {
  onBookNow: () => void;
}

export default function Hero({ onBookNow }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            O seu carro em boas mãos,
            <span className="block text-emerald-400">do parque ao terminal</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
            Estacionamento seguro, transfer gratuito e serviço premium para quem valoriza tranquilidade e conforto
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Button onClick={onBookNow} size="lg" variant="secondary">
              Reservar Agora <ArrowRight className="ml-2 inline w-5 h-5" />
            </Button>
            <Button onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }} size="lg" variant="outline">
              Ver Opções
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex flex-col items-center text-center group">
              <div className="bg-emerald-500/10 p-4 rounded-full mb-3 group-hover:bg-emerald-500/20 transition-colors">
                <Shield className="w-8 h-8 text-emerald-400" />
              </div>
              <span className="text-sm font-semibold">Segurança 24/7</span>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="bg-emerald-500/10 p-4 rounded-full mb-3 group-hover:bg-emerald-500/20 transition-colors">
                <Zap className="w-8 h-8 text-emerald-400" />
              </div>
              <span className="text-sm font-semibold">Transfer Gratuito</span>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="bg-emerald-500/10 p-4 rounded-full mb-3 group-hover:bg-emerald-500/20 transition-colors">
                <Clock className="w-8 h-8 text-emerald-400" />
              </div>
              <span className="text-sm font-semibold">Aberto 24H</span>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="bg-emerald-500/10 p-4 rounded-full mb-3 group-hover:bg-emerald-500/20 transition-colors">
                <Car className="w-8 h-8 text-emerald-400" />
              </div>
              <span className="text-sm font-semibold">Valet Premium</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
