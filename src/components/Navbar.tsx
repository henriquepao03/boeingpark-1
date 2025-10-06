import React, { useState, useEffect } from 'react';
import { Menu, X, Car } from 'lucide-react';
import Button from './Button';

interface NavbarProps {
  onBookNow: () => void;
}

export default function Navbar({ onBookNow }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Serviços', href: '#services' },
    { name: 'Como Funciona', href: '#process' },
    { name: 'Galeria', href: '#gallery' },
    { name: 'Sobre Nós', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contactos', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className={`p-2 rounded-lg ${scrolled ? 'bg-emerald-600' : 'bg-white'}`}>
              <Car className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-emerald-600'}`} />
            </div>
            <span className={`text-2xl font-bold ${scrolled ? 'text-slate-800' : 'text-white'}`}>
              BoeingPark
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-medium transition-colors hover:text-emerald-600 ${
                  scrolled ? 'text-slate-700' : 'text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            <Button onClick={onBookNow} variant="secondary" size="sm">
              Reservar
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              scrolled ? 'text-slate-800' : 'text-white bg-white/10'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-xl">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block py-3 text-slate-700 font-medium hover:text-emerald-600 transition-colors border-b border-slate-100 last:border-0"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <Button onClick={() => { onBookNow(); setIsOpen(false); }} variant="secondary" className="w-full">
                Reservar Agora
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
