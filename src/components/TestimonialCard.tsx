import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../lib/supabase';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? 'text-amber-400 fill-amber-400'
                : 'text-slate-300'
            }`}
          />
        ))}
      </div>

      <p className="text-slate-700 text-lg mb-6 leading-relaxed italic">
        "{testimonial.comment}"
      </p>

      <div className="flex items-center justify-between border-t border-slate-200 pt-4">
        <div>
          <p className="font-semibold text-slate-800">{testimonial.customer_name}</p>
          {testimonial.service_used && (
            <p className="text-sm text-slate-500">{testimonial.service_used}</p>
          )}
        </div>
        <div className="text-xs text-slate-400">
          {new Date(testimonial.created_at).toLocaleDateString('pt-PT')}
        </div>
      </div>
    </div>
  );
}
