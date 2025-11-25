'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Kezdőlap' },
    { href: '/szolgaltatasok', label: 'Szolgáltatások' },
    { href: '/galeria', label: 'Galéria' },
    { href: '/rolunk', label: 'Rólunk' },
    { href: '/kapcsolat', label: 'Kapcsolat' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative z-50 bg-transparent">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-36 py-2 flex items-center">
        <div className="flex justify-between items-center w-full">
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="absolute inset-0 bg-white rounded-full opacity-80 blur-sm -z-10 group-hover:opacity-90 transition-opacity scale-125" />
            <img
              src="/logo.png"
              alt="Salarkitek logo"
              className="h-32 max-h-36 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-lg"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-construction-orange transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kapcsolat"
              className="bg-construction-orange hover:bg-construction-orange/90 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
            >
              Ajánlatkérés
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white/90 backdrop-blur-md border-t border-white/20">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-800 hover:text-construction-orange transition-colors font-medium py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kapcsolat"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-construction-orange hover:bg-construction-orange/90 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Ajánlatkérés
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}