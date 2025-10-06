import React, { useState, useEffect } from 'react';
import { supabase, Service, Extra } from '../lib/supabase';
import { X, Calendar, Car, User, Mail, Phone } from 'lucide-react';
import Button from './Button';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  preselectedDays?: number;
  preselectedExtras?: string[];
}

export default function BookingForm({
  isOpen,
  onClose,
  preselectedService,
  preselectedDays,
  preselectedExtras = [],
}: BookingFormProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceId: preselectedService || '',
    startDate: '',
    endDate: '',
    vehiclePlate: '',
    vehicleModel: '',
    selectedExtras: preselectedExtras,
    specialRequests: '',
  });

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceId: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedDays && formData.startDate) {
      const start = new Date(formData.startDate);
      const end = new Date(start);
      end.setDate(end.getDate() + preselectedDays);
      setFormData(prev => ({
        ...prev,
        endDate: end.toISOString().split('T')[0],
      }));
    }
  }, [preselectedDays, formData.startDate]);

  async function fetchData() {
    try {
      const [servicesRes, extrasRes] = await Promise.all([
        supabase.from('services').select('*').eq('active', true).order('display_order'),
        supabase.from('extras').select('*').eq('active', true),
      ]);

      if (servicesRes.data) {
        setServices(servicesRes.data);
        if (!formData.serviceId && servicesRes.data.length > 0) {
          setFormData(prev => ({ ...prev, serviceId: servicesRes.data[0].id }));
        }
      }
      if (extrasRes.data) setExtras(extrasRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function toggleExtra(extraId: string) {
    setFormData(prev => ({
      ...prev,
      selectedExtras: prev.selectedExtras.includes(extraId)
        ? prev.selectedExtras.filter(id => id !== extraId)
        : [...prev.selectedExtras, extraId],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const servicePricing = await supabase
        .from('pricing')
        .select('price_per_day')
        .eq('service_id', formData.serviceId)
        .eq('active', true)
        .maybeSingle();

      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      let totalPrice = 0;
      if (servicePricing.data) {
        totalPrice = servicePricing.data.price_per_day * days;
      }

      for (const extraId of formData.selectedExtras) {
        const extra = extras.find(e => e.id === extraId);
        if (extra) {
          totalPrice += extra.price;
        }
      }

      const { error } = await supabase.from('bookings').insert({
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        customer_phone: formData.customerPhone,
        service_id: formData.serviceId,
        start_date: formData.startDate,
        end_date: formData.endDate,
        vehicle_plate: formData.vehiclePlate,
        vehicle_model: formData.vehicleModel,
        extras: formData.selectedExtras,
        total_price: totalPrice,
        status: 'pending',
        special_requests: formData.specialRequests,
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          serviceId: services[0]?.id || '',
          startDate: '',
          endDate: '',
          vehiclePlate: '',
          vehicleModel: '',
          selectedExtras: [],
          specialRequests: '',
        });
      }, 2000);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Erro ao criar reserva. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-slate-800">Fazer Reserva</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        {success ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Reserva Confirmada!</h3>
            <p className="text-slate-600">Receberá um email de confirmação em breve.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Telefone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Car className="w-4 h-4 inline mr-2" />
                  Matrícula
                </label>
                <input
                  type="text"
                  required
                  value={formData.vehiclePlate}
                  onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Modelo do Veículo
                </label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tipo de Serviço
                </label>
                <select
                  required
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Data de Entrada
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Data de Saída
                </label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Serviços Extras
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {extras.map(extra => (
                  <div
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.selectedExtras.includes(extra.id)
                        ? 'bg-emerald-50 border-emerald-500'
                        : 'border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-slate-800">{extra.name}</div>
                        <div className="text-xs text-slate-600 mt-1">{extra.description}</div>
                      </div>
                      <div className="text-emerald-600 font-bold">+€{extra.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Pedidos Especiais (opcional)
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Ex: Preciso de cadeira de bebé, tenho alergia a perfumes..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="secondary"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'A processar...' : 'Confirmar Reserva'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
