import Link from 'next/link';
import { ArrowRight, Phone, MessageSquare, Workflow, Layers, Code2, Server, GraduationCap } from 'lucide-react';
import { Container } from '../shared/Container';
import { services } from '@/content/services';

const iconMap: Record<string, React.ElementType> = {
  Phone, MessageSquare, Workflow, Layers, Code2, Server, GraduationCap,
};

export const ServicesGrid = () => (
  <section id="servicios" className="py-24 lg:py-32">
    <Container>
      <div className="text-center mb-14">
        <p className="text-overline text-blue-400 uppercase tracking-widest text-xs font-medium mb-3">Lo que construimos</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">7 áreas de trabajo, 1 solo equipo</h2>
        <p className="text-navy-300 text-body-lg max-w-2xl mx-auto">
          De un voice agent standalone a una plataforma completa con CRM, automatizaciones y dashboards.
          Elegí lo que necesitás — o dejanos armarte todo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => {
          const Icon = iconMap[s.icon];
          const isFeatured = i === 0;
          return (
            <div
              key={s.id}
              className={`card-gradient-border group relative p-6 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
                isFeatured ? 'border-blue-500/50 bg-navy-800' : 'border-navy-600 bg-navy-800'
              }`}
            >
              {isFeatured && (
                <span className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded-pill"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', color: 'white' }}>
                  Popular
                </span>
              )}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))' }}>
                {Icon && <Icon className="w-5 h-5 text-blue-400" />}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-navy-300 text-sm leading-relaxed mb-4">{s.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {s.tags.map(t => (
                  <span key={t} className="text-xs bg-navy-700 text-navy-300 rounded-pill px-2.5 py-1">{t}</span>
                ))}
              </div>
              <Link href={`/servicios#${s.id}`}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                Ver detalle <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </Container>
  </section>
);
