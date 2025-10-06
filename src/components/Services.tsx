import React, { useEffect, useState } from 'react';
import { supabase, Service } from '../lib/supabase';
import ServiceCard from './ServiceCard';

interface ServicesProps {
  onServiceSelect?: (serviceId: string) => void;
}

export default function Services({ onServiceSelect }: ServicesProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('display_order');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    if (onServiceSelect) {
      onServiceSelect(serviceId);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Escolha o Seu Serviço
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Soluções adaptadas às suas necessidades, sempre com a garantia de segurança e qualidade
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              selected={selectedService === service.id}
              onSelect={() => handleServiceSelect(service.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
