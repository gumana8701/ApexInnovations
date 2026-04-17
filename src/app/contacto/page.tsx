'use client';

import { useState } from 'react';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import { Container } from '@/components/shared/Container';

export default function Contacto() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    // TODO: connect to Resend
    await new Promise(r => setTimeout(r, 1000));
    setStatus('success');
  }

  return (
    <div className="pt-28 pb-24">
      <Container>
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Hablemos</h1>
          <p className="text-navy-300 text-body-lg max-w-lg mx-auto">
            Agendá 30 minutos o mandá un mensaje. Si no hay fit, igual te damos un consejo útil.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Calendly */}
          <div className="bg-navy-800 border border-navy-600 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Agendar llamada</h2>
                <p className="text-navy-400 text-sm">30 minutos · Gratis · Sin compromiso</p>
              </div>
            </div>
            <div className="bg-navy-900 rounded-lg p-6 text-center">
              <p className="text-navy-300 text-sm mb-4">Cargando calendario...</p>
              <a href="https://calendly.com/guillermo-appex/30min" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-pill text-sm"
                style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
                Abrir Calendly <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-navy-800 border border-navy-600 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-navy-700">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Mandar un mensaje</h2>
                <p className="text-navy-400 text-sm">Respondemos en menos de 24h</p>
              </div>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8">
                <p className="text-green-400 font-semibold text-lg">✅ Mensaje recibido</p>
                <p className="text-navy-300 text-sm mt-2">Te respondemos pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Tu nombre" required value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-navy-900 border border-navy-600 rounded-md px-4 py-3 text-white placeholder-navy-500 focus:outline-none focus:border-blue-500 text-sm" />
                <input type="email" placeholder="tu@email.com" required value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-navy-900 border border-navy-600 rounded-md px-4 py-3 text-white placeholder-navy-500 focus:outline-none focus:border-blue-500 text-sm" />
                <textarea placeholder="¿En qué podemos ayudarte?" required value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full bg-navy-900 border border-navy-600 rounded-md px-4 py-3 text-white placeholder-navy-500 focus:outline-none focus:border-blue-500 text-sm resize-none" />
                <button type="submit" disabled={status === 'loading'}
                  className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-pill text-sm disabled:opacity-60 transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
                  {status === 'loading' ? 'Enviando...' : <><ArrowRight className="w-4 h-4" /> Enviar mensaje</>}
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-navy-700 flex items-center gap-2 text-navy-400 text-sm">
              <MessageCircle className="w-4 h-4 text-green-400" />
              <span>O escribí directo por </span>
              <a href="https://wa.me/50378888120" className="text-green-400 hover:text-green-300 font-medium">WhatsApp →</a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
