import React from 'react';
import { Image } from 'lucide-react';

export default function Gallery() {
  const galleryImages = [
    {
      url: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Parque Coberto',
      category: 'covered',
    },
    {
      url: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Parque Descoberto',
      category: 'outdoor',
    },
    {
      url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Serviço Valet',
      category: 'valet',
    },
    {
      url: 'https://images.pexels.com/photos/1756957/pexels-photo-1756957.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Shuttle Transfer',
      category: 'shuttle',
    },
    {
      url: 'https://images.pexels.com/photos/271691/pexels-photo-271691.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Segurança 24/7',
      category: 'facilities',
    },
    {
      url: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Instalações Modernas',
      category: 'facilities',
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Image className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            As Nossas Instalações
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Conheça os nossos parques e instalações de última geração
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-[4/3] cursor-pointer"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver detalhes
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl shadow-2xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Tour Virtual 360°</h3>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Explore as nossas instalações no conforto da sua casa com o nosso tour virtual interativo
          </p>
          <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
            Iniciar Tour Virtual
          </button>
        </div>
      </div>
    </section>
  );
}
