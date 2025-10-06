import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Contacte-nos
          </h2>
          <p className="text-xl text-slate-600">
            Estamos aqui para ajudar. Entre em contacto connosco
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-slate-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                Informações de Contacto
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Morada</h4>
                    <p className="text-slate-600">
                      Rua do Aeroporto, 123<br />
                      2685-123 Portela, Lisboa
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Telefone</h4>
                    <p className="text-slate-600">
                      <a href="tel:+351234567890" className="hover:text-emerald-600 transition-colors">
                        +351 234 567 890
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Email</h4>
                    <p className="text-slate-600">
                      <a href="mailto:info@boeingpark.pt" className="hover:text-emerald-600 transition-colors">
                        info@boeingpark.pt
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                    <Clock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Horário</h4>
                    <p className="text-slate-600">
                      Aberto 24 horas por dia<br />
                      7 dias por semana
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Apoio ao Cliente</h3>
              <p className="text-emerald-100 mb-6">
                A nossa equipa está disponível 24/7 para responder às suas questões
                e ajudar com qualquer necessidade.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+351234567890"
                  className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors text-center"
                >
                  Ligar Agora
                </a>
                <a
                  href="mailto:info@boeingpark.pt"
                  className="bg-emerald-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-900 transition-colors text-center"
                >
                  Enviar Email
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-xl h-full min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.268743183923!2d-9.133583484682054!3d38.76827627959374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19324616d90183%3A0xa66a53e58036d46!2sLisbon%20Airport!5e0!3m2!1sen!2spt!4v1620000000000!5m2!1sen!2spt"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px' }}
                allowFullScreen
                loading="lazy"
                title="BoeingPark Location"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-slate-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Como Chegar
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🚗</div>
              <h4 className="font-semibold text-slate-800 mb-2">De Carro</h4>
              <p className="text-slate-600 text-sm">
                Saída A12, direção aeroporto. Seguir indicações para BoeingPark.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🚇</div>
              <h4 className="font-semibold text-slate-800 mb-2">Metro</h4>
              <p className="text-slate-600 text-sm">
                Linha Vermelha até Aeroporto, depois transfer gratuito.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🚌</div>
              <h4 className="font-semibold text-slate-800 mb-2">Autocarro</h4>
              <p className="text-slate-600 text-sm">
                Linhas 705, 722, 744 e 783 param perto das instalações.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
