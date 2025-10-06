import React from 'react';
import { Calendar, Key, Plane, ArrowRight } from 'lucide-react';

export default function ProcessSteps() {
  const steps = [
    {
      icon: Calendar,
      title: 'Reserve Online',
      description: 'Escolha o serviço e as datas. Processo rápido e seguro.',
      color: 'emerald',
    },
    {
      icon: Key,
      title: 'Entregue o Carro',
      description: 'No parque ou diretamente no terminal com o serviço valet.',
      color: 'blue',
    },
    {
      icon: Plane,
      title: 'Viaje Tranquilo',
      description: 'O seu carro está seguro e protegido durante toda a viagem.',
      color: 'amber',
    },
    {
      icon: ArrowRight,
      title: 'Recupere o Carro',
      description: 'Na volta, o seu carro estará pronto e à sua espera.',
      color: 'slate',
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Como Funciona
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Um processo simples e eficiente para garantir a sua tranquilidade
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className={`bg-${step.color}-100 p-4 rounded-full mb-6`}>
                      <Icon className={`w-10 h-10 text-${step.color}-600`} />
                    </div>

                    <div className="text-sm font-bold text-emerald-600 mb-2">
                      PASSO {index + 1}
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-emerald-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">5-7min</div>
              <p className="text-slate-600">Tempo de shuttle</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">15-20min</div>
              <p className="text-slate-600">Frequência de shuttles</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
              <p className="text-slate-600">Sempre disponível</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
