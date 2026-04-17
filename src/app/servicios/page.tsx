'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, MessageSquare, Workflow, Layers, Code2, Server, GraduationCap } from 'lucide-react';
import { Container } from '@/components/shared/Container';

const iconMap: Record<string, React.ElementType> = {
  Phone, MessageSquare, Workflow, Layers, Code2, Server, GraduationCap,
};

const serviceDetails = [
  {
    id: 'voice',
    icon: 'Phone',
    title: 'Voice Agents',
    tagline: 'Llamadas inbound y outbound con IA — sin hold music, sin menús interminables.',
    description: [
      'Construimos agentes de voz que hablan como humanos, califican leads, agendan citas y resuelven dudas sin intervención humana. Funciona 24/7 en español e inglés.',
      'Integramos con Vapi, Retell AI y SimpleTalk dependiendo del caso de uso. Para outbound (prospección, seguimiento), usamos dialers inteligentes que priorizan por score. Para inbound (recepción, soporte), el agente resuelve o escala al humano correcto.',
      'Cada agente viene con dashboard de métricas: duración promedio, tasa de resolución, sentiment scoring, y grabaciones con transcripciones automáticas.',
    ],
    includes: ['Diseño de flujos conversacionales', 'Entrenamiento del modelo con data real del cliente', 'Integración con CRM (GHL, HubSpot, Salesforce)', 'Dashboard de analytics + grabaciones', 'A/B testing de scripts', 'Soporte técnico 60 días post-entrega'],
    examples: [
      { label: 'Clínica dental', text: 'Agente que agenda citas, confirma por WhatsApp y envía recordatorios. 40% menos no-shows.' },
      { label: 'Personal injury', text: 'Calificación de leads por voz. 3x más leads calificados vs. equipo humano.' },
    ],
    price: 'Desde $2,500 USD',
  },
  {
    id: 'chat',
    icon: 'MessageSquare',
    title: 'Chat & WhatsApp',
    tagline: 'Agentes multi-canal que atienden con contexto real — no scripts enlatados.',
    description: [
      'WhatsApp, web chat, Instagram DMs, Facebook Messenger — todo conectado a un solo agente que sabe quién es el cliente, qué compró y qué necesita.',
      'Usamos embeddings + RAG para que el agente tenga acceso a tu base de conocimiento (FAQs, catálogos, políticas) sin alucinaciones. Cada respuesta cita la fuente.',
      'El agente escala a humano cuando detecta frustración, preguntas fuera de scope, o cuando el cliente lo pide explícitamente. La transición es invisible.',
    ],
    includes: ['Agente multi-canal (WhatsApp, Web, Instagram, Messenger)', 'Base de conocimiento con RAG', 'Escalación inteligente a humanos', 'Plantillas de respuesta para edge cases', 'Integración con Evolution API / Twilio / WhatsApp Cloud API', 'Métricas: tiempo de respuesta, resolución, CSAT'],
    examples: [
      { label: 'E-commerce LATAM', text: 'Agente WhatsApp atendiendo 500+ conversaciones/día. Tiempo de respuesta: <30 segundos.' },
      { label: 'Consultorio médico', text: 'De 3 horas promedio de respuesta a 3 minutos. 40% más citas agendadas.' },
    ],
    price: 'Desde $1,800 USD',
  },
  {
    id: 'integraciones',
    icon: 'Workflow',
    title: 'Integraciones & APIs',
    tagline: 'Conectamos todo lo que usás — sin copy-paste, sin CSV, sin "lo actualizo mañana".',
    description: [
      'Construimos la plomería que conecta tus herramientas. GHL con Supabase, HubSpot con Stripe, Shopify con WhatsApp, Calendly con tu CRM. Lo que necesites.',
      'Usamos n8n como motor de automatización cuando el flujo es visual y cambable. Para integraciones complejas o de alto volumen, construimos middleware custom en Node.js/TypeScript.',
      'Cada integración viene con monitoreo, alertas de fallo, y documentación para que tu equipo pueda mantenerla sin nosotros.',
    ],
    includes: ['Diseño de arquitectura de integración', 'n8n workflows + webhooks', 'Middleware custom cuando n8n no alcanza', 'Monitoreo + alertas (Slack, email, PagerDuty)', 'Documentación técnica', 'Migración de datos legacy'],
    examples: [
      { label: 'Agencia digital', text: '50+ workflows n8n sincronizando GHL, Stripe, y Slack en tiempo real.' },
      { label: 'SaaS B2B', text: 'Middleware custom procesando 10K webhooks/día de Shopify → Supabase → dashboards.' },
    ],
    price: 'Desde $1,200 USD',
  },
  {
    id: 'ghl',
    icon: 'Layers',
    title: 'GoHighLevel',
    tagline: 'De snapshot a plataforma — hacemos que GHL trabaje para vos, no al revés.',
    description: [
      'Somos expertos certificados en GoHighLevel. Setup completo, white-label, pipelines custom, dashboards de reporting, y migraciones desde otras plataformas.',
      'Si sos agencia: te armamos el snapshot perfecto para tu nicho con workflows, emails, y funnels listos para vender. Si sos negocio: te configuramos todo para que solo tengas que atender.',
      'También construimos custom widgets, integraciones API que GHL no tiene out of the box, y dashboards de analytics que van más allá del reporting nativo.',
    ],
    includes: ['Setup completo de sub-cuenta o agencia', 'Pipelines y workflows custom', 'Email/SMS sequences', 'White-label setup', 'Custom dashboards vía API', 'Migración desde HubSpot, Salesforce, etc.', 'Training de tu equipo (1-2 sesiones)'],
    examples: [
      { label: 'Agencia de marketing', text: 'White-label GHL con 15 sub-cuentas, cada una con pipelines y dashboards custom.' },
      { label: 'Clínica estética', text: 'Pipeline de pacientes desde lead hasta follow-up post-tratamiento. 100% automatizado.' },
    ],
    price: 'Desde $800 USD',
  },
  {
    id: 'dev',
    icon: 'Code2',
    title: 'Development',
    tagline: 'Apps, dashboards y backends — rápido, limpio, desplegado.',
    description: [
      'Next.js, TypeScript, Supabase, Tailwind, Vercel. Ese es nuestro stack. Construimos rápido porque no improvisamos — tenemos templates y arquitecturas probadas.',
      'Dashboards interactivos con filtros, exports, y AI-powered analysis. Landing pages que convierten. Portales de cliente. Lo que tu negocio necesite en la web.',
      'Todo viene con CI/CD (Vercel + GitHub), TypeScript estricto, y documentación. No te dejamos con código que nadie más puede mantener.',
    ],
    includes: ['Diseño + desarrollo frontend (Next.js)', 'Backend APIs (Node.js/TypeScript)', 'Base de datos (Supabase/PostgreSQL)', 'Deploy a Vercel con CI/CD', 'Responsive design (mobile-first)', 'Documentación + handoff'],
    examples: [
      { label: 'Dashboard de analytics', text: 'Dashboard de KPIs para call center con filtros AI-powered y export CSV.' },
      { label: 'Portal de clientes', text: 'Plataforma self-service para agencia con login, reportes, y facturación.' },
    ],
    price: 'Desde $3,000 USD',
  },
  {
    id: 'infra',
    icon: 'Server',
    title: 'Infraestructura IA',
    tagline: 'Tu stack de IA, tu servidor, tus reglas. Sin vendor lock-in.',
    description: [
      'OpenClaw, NemoClaw, VPS en Hetzner/AWS/DigitalOcean, Docker, self-hosted models. Control total sobre tu infraestructura de IA.',
      'Para empresas que necesitan privacidad total, compliance, o simplemente quieren dejar de pagar por token. Desplegamos modelos on-prem o en tu cloud.',
      'También configuramos agentes autónomos (OpenClaw) que monitorean, ejecutan tareas, y reportan sin intervención humana.',
    ],
    includes: ['Setup de VPS/cloud optimizado para IA', 'Docker + orquestación', 'Self-hosted LLMs (Llama, Mistral, etc.)', 'OpenClaw setup + configuration', 'Monitoreo + alertas', 'Backup + disaster recovery'],
    examples: [
      { label: 'Startup fintech', text: 'Stack completo self-hosted en AWS con modelos fine-tuned para análisis de riesgo.' },
      { label: 'Agencia de marketing', text: 'OpenClaw agent manejando 5 clientes con n8n, GHL, y reportes automatizados.' },
    ],
    price: 'Desde $2,000 USD',
  },
  {
    id: 'training',
    icon: 'GraduationCap',
    title: 'Training & Mentoría',
    tagline: 'Aprende a construir lo que nosotros construimos — sin gatekeeping.',
    description: [
      'Cursos pre-grabados, mentoría 1-on-1, y workshops en vivo. Para developers que quieren entrar al mundo de agentes IA, y para owners que quieren entender qué están comprando.',
      'No es teoría. Cada módulo tiene proyecto práctico que termina en algo deployado y funcional. Voice agent, chatbot WhatsApp, dashboard con IA — elige tu aventura.',
      'La mentoría 1-on-1 es para casos avanzados: arquitectura de sistemas multi-agente, fine-tuning, o cuando necesitás un segundo cerebro para tu proyecto.',
    ],
    includes: ['Acceso a plataforma de cursos', 'Proyectos prácticos con deploy real', 'Comunidad de Discord/Slack', 'Sesiones de Q&A en vivo (mensuales)', 'Templates y boilerplates descargables', 'Certificado de completación'],
    examples: [
      { label: 'Developer Jr.', text: 'De cero a voice agent deployado en 4 semanas. Ahora construye agentes para clientes propios.' },
      { label: 'Dueño de agencia', text: 'Entendió el stack completo en 2 sesiones 1-on-1. Ahora vende servicios de IA con confianza.' },
    ],
    price: 'Desde $299 USD / curso',
  },
];

export default function Servicios() {
  const [active, setActive] = useState('voice');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && serviceDetails.some(s => s.id === hash)) {
      setActive(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  return (
    <div className="pt-28 pb-24">
      <Container>
        <div className="text-center mb-14">
          <p className="text-overline text-blue-400 uppercase tracking-widest text-xs font-medium mb-3">Servicios</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Todo lo que construimos</h1>
          <p className="text-navy-300 text-body-lg max-w-2xl mx-auto leading-relaxed">
            7 áreas de expertise, un solo equipo. Elegí lo que necesitás o contanos tu problema y te armamos la solución.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <nav className="lg:sticky lg:top-24 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {serviceDetails.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActive(s.id);
                      document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      active === s.id
                        ? 'bg-navy-700 text-white border border-blue-500/30'
                        : 'text-navy-400 hover:text-white hover:bg-navy-800'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4 shrink-0" />}
                    {s.title}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 space-y-16">
            {serviceDetails.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))' }}>
                      {Icon && <Icon className="w-5 h-5 text-blue-400" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{s.title}</h2>
                      <p className="text-navy-400 text-sm">{s.tagline}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {s.description.map((p, i) => (
                      <p key={i} className="text-navy-200 leading-relaxed">{p}</p>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Qué incluye */}
                    <div className="bg-navy-800 border border-navy-600 rounded-xl p-6">
                      <h3 className="text-white font-semibold mb-4">Qué incluye</h3>
                      <ul className="space-y-2.5">
                        {s.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-navy-200">
                            <span className="text-blue-400 mt-0.5">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ejemplos */}
                    <div className="bg-navy-800 border border-navy-600 rounded-xl p-6">
                      <h3 className="text-white font-semibold mb-4">Ejemplos reales</h3>
                      <div className="space-y-4">
                        {s.examples.map((ex) => (
                          <div key={ex.label}>
                            <p className="text-sm font-medium text-blue-400 mb-1">{ex.label}</p>
                            <p className="text-sm text-navy-300 leading-relaxed">{ex.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-white font-bold text-lg">{s.price}</span>
                    <Link href="/contacto"
                      className="flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-pill text-sm transition-all hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
                      Agendar para discutir <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="border-b border-navy-700 mt-12" />
                </section>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
