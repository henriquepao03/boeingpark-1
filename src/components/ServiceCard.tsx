import React from 'react';
import * as Icons from 'lucide-react';
import { Service } from '../lib/supabase';

interface ServiceCardProps {
  service: Service;
  onSelect?: () => void;
  selected?: boolean;
}

export default function ServiceCard({ service, onSelect, selected }: ServiceCardProps) {
  const IconComponent = (Icons as any)[service.icon.split('-').map((word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('')] || Icons.Car;

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-1 ${
        selected ? 'ring-4 ring-emerald-500 border-2 border-emerald-500' : 'border-2 border-transparent'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`p-4 rounded-full mb-6 transition-colors ${
          selected ? 'bg-emerald-100' : 'bg-slate-100'
        }`}>
          <IconComponent className={`w-12 h-12 ${
            selected ? 'text-emerald-600' : 'text-slate-700'
          }`} />
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-3">{service.name}</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>

        <ul className="space-y-3 w-full">
          {service.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center text-sm text-slate-700">
              <Icons.Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
