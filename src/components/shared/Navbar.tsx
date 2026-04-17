'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { Container } from './Container';

const links = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Casos', href: '/#casos' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy-900/80 backdrop-blur-lg border-b border-navy-700/50 shadow-md' : 'bg-transparent'
      }`}
      style={{ height: '72px' }}
    >
      <Container className="h-full flex items-center justify-between">
        <Link href="/" className="text-white">
          <Logo className="h-7" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-navy-300 hover:text-white text-sm font-medium transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contacto"
            className="flex items-center gap-2 border border-navy-300 text-white rounded-pill px-5 py-2.5 text-sm font-semibold hover:border-blue-500 hover:text-blue-400 transition-colors"
          >
            Agendar llamada <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-navy-900 border-t border-navy-700 px-4 py-6 space-y-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block text-navy-300 hover:text-white text-base font-medium py-2">
              {l.label}
            </Link>
          ))}
          <Link href="/contacto" onClick={() => setOpen(false)}
            className="flex items-center gap-2 bg-gradient-brand text-white rounded-pill px-5 py-3 text-sm font-semibold w-fit mt-2"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
            Agendar llamada <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
};
