import React from 'react';
import { Car, Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-emerald-600 rounded-lg">
                <Car className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">BoeingPark</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              O seu parceiro de confiança para estacionamento aeroportuário seguro,
              conveniente e acessível.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-emerald-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-emerald-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-emerald-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-emerald-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Serviços</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Parque Coberto
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Parque Descoberto
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Serviço Valet
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Lavagem de Carros
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Carregamento Elétrico
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#process" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#faq" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Galeria
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Contactos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contactos</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0 mt-1" />
                <span className="text-slate-400">
                  Rua do Aeroporto, 123<br />
                  2685-123 Portela, Lisboa
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                <a href="tel:+351234567890" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  +351 234 567 890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                <a href="mailto:info@boeingpark.pt" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  info@boeingpark.pt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} BoeingPark. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Termos de Serviço
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
