import React, { useEffect, useState } from 'react';
import { supabase, Service, Pricing, Extra } from '../lib/supabase';
import { Calculator } from 'lucide-react';
import Button from './Button';

interface PricingCalculatorProps {
  onBookNow?: (serviceId: string, days: number, extras: string[]) => void;
}

export default function PricingCalculator({ onBookNow }: PricingCalculatorProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [pricing, setPricing] = useState<Pricing[]>([]);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [days, setDays] = useState<number>(7);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [selectedService, days, selectedExtras, pricing, extras]);

  async function fetchData() {
    try {
      const [servicesRes, pricingRes, extrasRes] = await Promise.all([
        supabase.from('services').select('*').eq('active', true).order('display_order'),
        supabase.from('pricing').select('*').eq('active', true),
        supabase.from('extras').select('*').eq('active', true),
      ]);

      if (servicesRes.data) setServices(servicesRes.data);
      if (pricingRes.data) setPricing(pricingRes.data);
      if (extrasRes.data) setExtras(extrasRes.data);

      if (servicesRes.data && servicesRes.data.length > 0) {
        setSelectedService(servicesRes.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function calculateTotal() {
    let total = 0;

    if (selectedService && pricing.length > 0) {
      const servicePricing = pricing.filter(p => p.service_id === selectedService);

      const exactMatch = servicePricing.find(p => p.duration_days === days);
      if (exactMatch) {
        total = exactMatch.total_price;
      } else {
        const closestPricing = servicePricing
          .sort((a, b) => Math.abs(a.duration_days - days) - Math.abs(b.duration_days - days))[0];

        if (closestPricing) {
          total = closestPricing.price_per_day * days;
        }
      }
    }

    selectedExtras.forEach(extraId => {
      const extra = extras.find(e => e.id === extraId);
      if (extra) {
        total += extra.price;
      }
    });

    setTotalPrice(total);
  }

  function toggleExtra(extraId: string) {
    setSelectedExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  }

  function handleBookNow() {
    if (onBookNow) {
      onBookNow(selectedService, days, selectedExtras);
    }
  }

  return (
    <section id="calculator" className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <Calculator className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Calcule o Seu Preço
          </h2>
          <p className="text-xl text-slate-300">
            Personalize o seu serviço e veja o preço em tempo real
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-semibold mb-3">Tipo de Serviço</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {services.map(service => (
                  <option key={service.id} value={service.id} className="text-slate-800">
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">
                Número de Dias: {days}
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>1 dia</span>
                <span>30 dias</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold mb-4">Serviços Extras</label>
            <div className="grid sm:grid-cols-2 gap-4">
              {extras.map(extra => (
                <div
                  key={extra.id}
                  onClick={() => toggleExtra(extra.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedExtras.includes(extra.id)
                      ? 'bg-emerald-500/20 border-emerald-400'
                      : 'bg-white/5 border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{extra.name}</div>
                      <div className="text-xs text-slate-300 mt-1">{extra.description}</div>
                    </div>
                    <div className="text-emerald-400 font-bold">+€{extra.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <div className="text-sm text-slate-300 mb-1">Preço Total</div>
                <div className="text-5xl font-bold text-emerald-400">
                  €{totalPrice.toFixed(2)}
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  €{(totalPrice / days).toFixed(2)} por dia
                </div>
              </div>

              <Button onClick={handleBookNow} variant="secondary" size="lg">
                Reservar Agora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
