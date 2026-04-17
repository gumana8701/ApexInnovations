import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '../shared/Container';

export const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
    {/* Background orbs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="orb absolute top-1/4 left-1/4 w-96 h-96 opacity-20"
        style={{ background: 'radial-gradient(ellipse, #2563EB 0%, transparent 70%)' }} />
      <div className="orb absolute bottom-1/4 right-1/4 w-80 h-80 opacity-15"
        style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, transparent 70%)', animationDelay: '-3s' }} />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%220.5%22%20fill%3D%22%238E9CBC%22%20fill-opacity%3D%220.3%22/%3E%3C/svg%3E')]" />
    </div>

    <Container className="relative z-10 py-20">
      <div className="max-w-3xl">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 border border-navy-600 rounded-pill px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-overline text-navy-300 uppercase tracking-widest text-xs font-medium">
            Plataforma de Agentes IA
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-tight mb-6">
          <span className="gradient-text">Agentes IA</span> que cierran ventas,{' '}
          <br className="hidden sm:block" />
          agendan citas y atienden clientes.
        </h1>

        {/* Subtext */}
        <p className="text-body-lg text-navy-300 mb-8 max-w-xl leading-relaxed">
          Los construimos nosotros, o los armás vos en 5 minutos con plantillas probadas en 100+ negocios de LATAM y USA.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Link href="/#demo"
            className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-pill transition-all hover:-translate-y-0.5 hover:shadow-glow text-sm"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
            Probá un agente ahora <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/servicios"
            className="flex items-center gap-2 border border-navy-300 text-white font-semibold px-6 py-3 rounded-pill hover:border-blue-500 hover:text-blue-400 transition-colors text-sm">
            Ver servicios
          </Link>
        </div>

        {/* Trust line */}
        <div className="flex flex-wrap items-center gap-2 text-navy-400 text-sm">
          {['WhatsApp', 'Voz', 'Web', 'Instagram', 'GHL', 'Retell', 'n8n'].map((t, i) => (
            <span key={t} className="flex items-center gap-2">
              <span>{t}</span>
              {i < 6 && <span className="w-1 h-1 rounded-full bg-navy-600" />}
            </span>
          ))}
        </div>
      </div>

      {/* Floating chat mockup */}
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-72 animate-float">
        <div className="bg-navy-800 border border-navy-600 rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-navy-700">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>A</div>
            <div>
              <p className="text-white text-xs font-medium">Agente AppEx</p>
              <p className="text-green-400 text-xs">● En línea</p>
            </div>
          </div>
          {[
            { from: 'bot', text: '¡Hola! ¿Cómo puedo ayudarte hoy?' },
            { from: 'user', text: 'Quiero agendar una consulta' },
            { from: 'bot', text: '¡Perfecto! Tengo disponibilidad mañana a las 10am y 3pm. ¿Cuál prefieres?' },
            { from: 'user', text: 'A las 10am' },
            { from: 'bot', text: '✅ Listo, te confirmé para mañana 10am. Te llegará un recordatorio por WhatsApp.' },
          ].map((m, i) => (
            <div key={i} className={`flex mb-2 ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`text-xs px-3 py-1.5 rounded-xl max-w-[85%] ${
                m.from === 'user'
                  ? 'text-white rounded-br-sm'
                  : 'bg-navy-700 text-navy-200 rounded-bl-sm'
              }`} style={m.from === 'user' ? { background: 'linear-gradient(135deg, #2563EB, #7C3AED)' } : {}}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);
