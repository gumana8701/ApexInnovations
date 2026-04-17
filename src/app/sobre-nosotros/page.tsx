import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/shared/Container';

const values = [
  {
    title: 'Shipping > planning',
    text: 'Preferimos entregar algo funcional en 2 semanas que un documento perfecto en 3 meses. Iteramos rápido, corregimos en vuelo.',
  },
  {
    title: 'Sin bullshit técnico',
    text: 'Explicamos todo en español (literal y figurativamente). Si no podemos explicar por qué algo funciona, probablemente no lo entendemos bien.',
  },
  {
    title: 'Tu data, tus reglas',
    text: 'No hacemos vendor lock-in. Todo lo que construimos es tuyo — el código, los datos, la infraestructura. Si te vas, te vas con todo.',
  },
  {
    title: 'IA con propósito',
    text: 'No metemos IA donde no hace falta. Si un formulario resuelve el problema, recomendamos el formulario. No somos de esos.',
  },
];

const tools = [
  'Next.js', 'TypeScript', 'Supabase', 'Vercel', 'n8n',
  'GoHighLevel', 'Vapi', 'Retell AI', 'OpenClaw',
  'WhatsApp API', 'Anthropic Claude', 'Gemini',
  'Docker', 'PostgreSQL', 'Tailwind CSS',
];

export default function SobreNosotros() {
  return (
    <div className="pt-28 pb-24">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-overline text-blue-400 uppercase tracking-widest text-xs font-medium mb-3">Sobre nosotros</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Un equipo chico que construye cosas grandes
          </h1>
          <p className="text-navy-300 text-body-lg leading-relaxed">
            Empezamos construyendo agentes IA para clientes en USA y LATAM. 
            Hoy manejamos 40+ proyectos activos con un equipo lean desde El Salvador, 
            Argentina y Colombia.
          </p>
        </div>

        {/* Origin */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-navy-800 border border-navy-600 rounded-xl p-8">
            <h2 className="text-white font-bold text-xl mb-4">La historia corta</h2>
            <p className="text-navy-200 leading-relaxed mb-4">
              Guillermo estaba operando proyectos de IA para agencias y clientes directos en USA 
              — voice agents, chatbots WhatsApp, automatizaciones con n8n y GHL. El problema: 
              cada proyecto era custom, cada cliente empezaba de cero, y escalar era imposible.
            </p>
            <p className="text-navy-200 leading-relaxed mb-4">
              La solución fue doble: primero, un equipo especializado que puede entregar proyectos 
              custom en 2-4 semanas. Segundo, una plataforma de plantillas para que negocios 
              más chicos armen sus propios agentes sin necesitar un equipo técnico.
            </p>
            <p className="text-navy-200 leading-relaxed">
              Hoy AppEx es eso: la agencia que construye, la plataforma que empodera, y la 
              academia que enseña. Todo desde el mismo equipo que lleva 100+ agentes en producción.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">El equipo</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { name: 'Guillermo', role: 'Dev Operations Manager', flag: '🇸🇻' },
              { name: 'Enzo', role: 'Senior AI Supervisor', flag: '🇦🇷' },
              { name: 'Héctor', role: 'AI Agent Specialist', flag: '🇨🇴' },
              { name: 'Victor', role: 'AI Agent Specialist', flag: '🇲🇽' },
              { name: 'Lucas', role: 'Backend Integration Dev', flag: '🇦🇷' },
              { name: 'Kevin', role: 'Backend Integration Dev', flag: '🇨🇴' },
              { name: 'Jennifer', role: 'Client Success', flag: '🇸🇻' },
            ].map((m) => (
              <div key={m.name} className="bg-navy-800 border border-navy-600 rounded-xl p-5 text-center hover:border-blue-500/40 transition-colors">
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
                  style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))' }}>
                  {m.flag}
                </div>
                <p className="text-white font-semibold text-sm">{m.name}</p>
                <p className="text-navy-400 text-xs mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Cómo pensamos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="bg-navy-800 border border-navy-600 rounded-xl p-6">
                <h3 className="text-white font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-navy-300 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Stack técnico</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {tools.map((t) => (
              <span key={t} className="bg-navy-800 border border-navy-600 text-navy-200 text-sm font-medium rounded-pill px-4 py-2 hover:border-blue-500/40 hover:text-white transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Timezone */}
        <div className="text-center">
          <div className="bg-navy-800 border border-navy-600 rounded-xl p-8 max-w-xl mx-auto">
            <h3 className="text-white font-semibold text-lg mb-2">📍 El Salvador (UTC-6)</h3>
            <p className="text-navy-300 text-sm mb-4">
              Zona horaria CST. Overlap completo con USA (EST/CST/PST) y buena cobertura para LATAM. 
              Respondemos en &lt;24 horas hábiles.
            </p>
            <Link href="/contacto"
              className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-pill text-sm transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
              Hablemos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
