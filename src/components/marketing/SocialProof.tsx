import { Container } from '../shared/Container';

const stats = [
  { value: '100+', label: 'Agentes desplegados' },
  { value: '4 países', label: 'Argentina, Colombia, Panamá, México' },
  { value: '24/7', label: 'Operando sin descanso' },
];

const cases = [
  {
    industry: '🦷 Clínica dental · Medellín',
    quote: '"De 3 horas a 3 minutos de respuesta en WhatsApp. 40% más citas agendadas en 60 días."',
    metric: '+40% citas',
  },
  {
    industry: '⚖️ Bufete personal injury · Florida',
    quote: '"Sistema multi-agente calificando 800+ leads/mes. 3x tasa de calificación vs. equipo humano."',
    metric: '3x calificación',
  },
  {
    industry: '🏠 Real estate investor · Texas',
    quote: '"Outbound voice agents calificando sellers. $18K en deals cerrados el primer mes."',
    metric: '$18K mes 1',
  },
];

export const SocialProof = () => (
  <section id="casos" className="py-24 lg:py-32 border-t border-navy-700/50">
    <Container>
      <div className="text-center mb-14">
        <p className="text-overline text-blue-400 uppercase tracking-widest text-xs font-medium mb-3">Resultados reales</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Construido con clientes reales en producción</h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-14 max-w-2xl mx-auto">
        {stats.map((s) => (
          <div key={s.value} className="text-center">
            <p className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{s.value}</p>
            <p className="text-navy-400 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Case studies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cases.map((c) => (
          <div key={c.industry} className="bg-navy-800 border border-navy-600 rounded-xl p-6 hover:border-blue-500/40 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <p className="text-sm font-medium text-navy-300">{c.industry}</p>
              <span className="text-xs font-bold px-2.5 py-1 rounded-pill shrink-0 ml-2"
                style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))', color: '#60A5FA', border: '1px solid rgba(37,99,235,0.3)' }}>
                {c.metric}
              </span>
            </div>
            <p className="text-navy-200 text-sm leading-relaxed italic">{c.quote}</p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);
