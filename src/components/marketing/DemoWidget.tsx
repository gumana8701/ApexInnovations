'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import Link from 'next/link';
import { Container } from '../shared/Container';

type Scenario = 'dental' | 'realEstate' | 'legal' | 'ecommerce';

const scenarios: { id: Scenario; emoji: string; label: string; intro: string }[] = [
  {
    id: 'dental',
    emoji: '🦷',
    label: 'Clínica dental',
    intro: '¡Hola! Soy Carla, asistente de Clínica Dental Sonrisa. ¿En qué puedo ayudarte? Puedo agendarte una cita, informarte sobre nuestros tratamientos o resolver tus dudas.',
  },
  {
    id: 'realEstate',
    emoji: '🏠',
    label: 'Real estate',
    intro: '¡Buenas! Soy Olivia, tu agente inmobiliaria virtual. ¿Estás buscando comprar, vender o invertir en propiedades? Cuéntame más sobre lo que necesitás.',
  },
  {
    id: 'legal',
    emoji: '⚖️',
    label: 'Bufete legal',
    intro: 'Bienvenido al bufete. Soy el asistente virtual especializado en accidentes de tráfico. ¿Tuviste un accidente? Puedo ayudarte a entender tus opciones legales de forma gratuita y confidencial.',
  },
  {
    id: 'ecommerce',
    emoji: '🛒',
    label: 'E-commerce',
    intro: '¡Hola! Estoy aquí para ayudarte con tu pedido, responder preguntas sobre productos o gestionar devoluciones. ¿Cómo puedo asistirte hoy?',
  },
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const DemoWidget = () => {
  const [scenario, setScenario] = useState<Scenario>('dental');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentScenario = scenarios.find(s => s.id === scenario)!;

  useEffect(() => {
    setMessages([{ role: 'assistant', content: currentScenario.intro }]);
    setMsgCount(0);
    setShowCTA(false);
    setInput('');
  }, [scenario, currentScenario.intro]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading || showCTA) return;
    const userMsg = input.trim();
    setInput('');
    setLoading(true);

    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    const newCount = msgCount + 1;
    setMsgCount(newCount);

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, scenario }),
      });
      const data = await res.json();
      const reply = data.content || 'Lo siento, hubo un error. Intentá de nuevo.';
      setMessages([...newMessages, { role: 'assistant', content: reply }]);

      if (newCount >= 8) {
        setTimeout(() => setShowCTA(true), 500);
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Error de conexión. Intentá de nuevo.' }]);
    }
    setLoading(false);
  }

  return (
    <section id="demo" className="py-24 lg:py-32 border-t border-navy-700/50">
      <Container>
        <div className="text-center mb-10">
          <p className="text-overline text-blue-400 uppercase tracking-widest text-xs font-medium mb-3">Demo interactivo</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Probá cómo piensa un agente</h2>
          <p className="text-navy-300 max-w-xl mx-auto text-base leading-relaxed">
            No es una grabación. Es el mismo motor que corre en los agentes que construimos para clínicas, inmobiliarias y bufetes de abogados.
          </p>
        </div>

        {/* Scenario tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setScenario(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-pill text-sm font-medium transition-all ${
                scenario === s.id
                  ? 'text-white shadow-md'
                  : 'bg-navy-800 border border-navy-600 text-navy-300 hover:text-white hover:border-navy-500'
              }`}
              style={scenario === s.id ? { background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' } : {}}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>

        {/* Chat UI */}
        <div className="max-w-2xl mx-auto bg-navy-800 border border-navy-600 rounded-xl overflow-hidden relative">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-navy-700">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>A</div>
            <div>
              <p className="text-white text-sm font-medium">Agente AppEx — {currentScenario.label}</p>
              <p className="text-green-400 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                En línea · IA activa
              </p>
            </div>
            <div className="ml-auto text-xs text-navy-400">{msgCount}/8 mensajes</div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-5 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'text-white rounded-br-sm'
                    : 'bg-navy-700 text-navy-200 rounded-bl-sm'
                }`} style={m.role === 'user' ? { background: 'linear-gradient(135deg, #2563EB, #7C3AED)' } : {}}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-navy-700 text-navy-400 px-4 py-2.5 rounded-xl rounded-bl-sm text-sm">
                  <span className="animate-pulse">Escribiendo...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* CTA overlay */}
          {showCTA && (
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(5,10,26,0.92)', backdropFilter: 'blur(4px)' }}>
              <div className="text-center p-8 max-w-sm">
                <div className="text-3xl mb-3">🎉</div>
                <h3 className="text-white font-bold text-lg mb-2">¿Te gustó cómo funciona?</h3>
                <p className="text-navy-300 text-sm mb-6 leading-relaxed">
                  Armá uno así para tu negocio. Hablamos 30 minutos y te mostramos exactamente qué haríamos.
                </p>
                <Link href="/contacto"
                  className="flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-pill text-sm w-full"
                  style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
                  Quiero uno así <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-navy-700 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder={showCTA ? 'Demo finalizado' : 'Escribí un mensaje...'}
              disabled={loading || showCTA}
              className="flex-1 bg-navy-900 border border-navy-600 rounded-md px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
            />
            <button onClick={sendMessage} disabled={loading || showCTA || !input.trim()}
              className="w-10 h-10 rounded-md flex items-center justify-center text-white disabled:opacity-40 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
