import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '../shared/Container';

export const CTASection = () => (
  <section className="py-24 lg:py-32">
    <Container>
      <div className="relative rounded-xl overflow-hidden p-12 text-center border border-navy-600"
        style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(124,58,237,0.08) 100%)' }}>
        {/* Background orb */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Listo para dejar de atender mensajes a las 11 de la noche?
          </h2>
          <p className="text-navy-300 text-body-lg mb-8 leading-relaxed">
            Agendá una llamada de 30 minutos. Si no te sirve, te devolvemos tus 30 minutos con intereses (un consejo útil).
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-pill text-base transition-all hover:-translate-y-0.5 hover:shadow-glow"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
            Agendar llamada <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </Container>
  </section>
);
