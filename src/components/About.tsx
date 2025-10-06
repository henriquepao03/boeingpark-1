import React from 'react';
import { Shield, Award, Users, MapPin } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Sobre a BoeingPark
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Líder em estacionamento aeroportuário com foco em segurança, qualidade e satisfação do cliente
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.pexels.com/photos/2050718/pexels-photo-2050718.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="BoeingPark Facilities"
              className="rounded-2xl shadow-2xl"
            />
          </div>

          <div>
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              A Nossa Missão
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Na BoeingPark, acreditamos que a sua viagem começa no momento em que sai de casa.
              Por isso, oferecemos um serviço de estacionamento que combina segurança máxima,
              conveniência total e preços justos.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Com anos de experiência no mercado, somos a escolha preferida de milhares de
              viajantes que confiam em nós para cuidar do seu bem mais precioso enquanto estão fora.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-emerald-600 font-semibold">
                <Shield className="w-5 h-5 mr-2" />
                Seguro Incluído
              </div>
              <div className="flex items-center text-emerald-600 font-semibold">
                <Award className="w-5 h-5 mr-2" />
                Certificado ISO
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-emerald-600" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Segurança</h4>
            <p className="text-slate-600">
              Videovigilância 24/7 e acesso controlado para máxima proteção
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Equipa Profissional</h4>
            <p className="text-slate-600">
              Staff treinado e dedicado ao seu serviço
            </p>
          </div>

          <div className="text-center">
            <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-amber-600" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Localização</h4>
            <p className="text-slate-600">
              A poucos minutos do aeroporto com transfer gratuito
            </p>
          </div>

          <div className="text-center">
            <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-emerald-600" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Qualidade</h4>
            <p className="text-slate-600">
              Instalações modernas e serviço de excelência
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-12 text-white text-center shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Os Nossos Números</h3>
          <div className="grid md:grid-cols-4 gap-8 mt-8">
            <div>
              <div className="text-5xl font-bold text-emerald-400 mb-2">10+</div>
              <div className="text-slate-300">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-emerald-400 mb-2">50K+</div>
              <div className="text-slate-300">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-emerald-400 mb-2">99.8%</div>
              <div className="text-slate-300">Taxa de Satisfação</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-emerald-400 mb-2">24/7</div>
              <div className="text-slate-300">Suporte Disponível</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
