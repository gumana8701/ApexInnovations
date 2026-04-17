import Link from 'next/link';
import { Logo } from './Logo';
import { Container } from './Container';

const cols = [
  {
    title: 'Servicios',
    links: [
      { label: 'Voice Agents', href: '/servicios#voice' },
      { label: 'Chat & WhatsApp', href: '/servicios#chat' },
      { label: 'Integraciones', href: '/servicios#integraciones' },
      { label: 'GoHighLevel', href: '/servicios#ghl' },
      { label: 'Development', href: '/servicios#dev' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre nosotros', href: '/sobre-nosotros' },
      { label: 'Contacto', href: '/contacto' },
      { label: 'Casos de uso', href: '/#casos' },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: 'hola@appex.ai', href: 'mailto:hola@appex.ai' },
      { label: 'WhatsApp', href: 'https://wa.me/50378888120' },
      { label: 'Agendar llamada', href: 'https://calendly.com/guillermo-appex/30min' },
    ],
  },
];

export const Footer = () => (
  <footer className="border-t border-navy-700 bg-navy-900 pt-16 pb-8">
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div>
          <Logo className="h-7 mb-4" />
          <p className="text-navy-300 text-sm leading-relaxed max-w-xs">
            Agentes IA, integraciones y automatización — hechos a medida, o listos para que los armes tú mismo en 5 minutos.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-navy-300 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-navy-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-navy-400 text-sm">© 2026 AppEx · Hecho desde 🇸🇻</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-navy-400 hover:text-white text-sm transition-colors">Privacy</Link>
          <Link href="/terms" className="text-navy-400 hover:text-white text-sm transition-colors">Terms</Link>
        </div>
      </div>
    </Container>
  </footer>
);
