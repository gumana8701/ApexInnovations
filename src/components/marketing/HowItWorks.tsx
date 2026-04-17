import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '../shared/Container';

export const HowItWorks = () => (
  <section id="como-funciona" className="py-24 lg:py-32 border-t border-navy-700/50">
    <Container>
      <div className="text-center mb-14">
        <p className="text-overline text-blue-400 uppercase tracking-widest text-xs font-medium mb-3">El proceso</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Dos caminos, cero fricción</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Column A */}
        <div className="bg-navy-800 border border-navy-600 rounded-xl p-8 hover:border-blue-500/50 transition-colors">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-5"
            style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Lo hacemos nosotros</h3>
          <p className="text-navy-400 text-sm mb-6">Para equipos que quieren resultados sin aprender todo desde cero.</p>
          <ol className="space-y-4 mb-8">
            {[
              'Agendás una llamada de 30 min',
              'Definimos scope + presupuesto',
              'Entregamos en 2-4 semanas con soporte incluido',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-navy-200 text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          <Link href="/contacto"
            className="flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-pill text-sm w-fit transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
            Agendar llamada <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Column B */}
        <div className="bg-navy-800 border border-navy-600 rounded-xl p-8 relative overflow-hidden opacity-80">
          <div className="absolute top-4 right-4">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-pill bg-violet-600/20 text-violet-300 border border-violet-500/30">
              PRONTO
            </span>
          </div>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-5 bg-violet-600/20 border border-violet-500/30">
            <span className="text-violet-300 text-sm font-bold">B</span>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Lo armás vos</h3>
          <p className="text-navy-400 text-sm mb-6">Plantillas probadas, configuradas en minutos. Sin código.</p>
          <ol className="space-y-4 mb-8">
            {[
              'Elegís una plantilla probada',
              'Configurás en un wizard de 5 pasos',
              'Activamos tu agente en 5 minutos',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-navy-200 text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          <button
            className="flex items-center gap-2 border border-navy-500 text-navy-300 font-semibold px-5 py-2.5 rounded-pill text-sm w-fit cursor-not-allowed"
            disabled>
            Sumate al waitlist <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Container>
  </section>
);
