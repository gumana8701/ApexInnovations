'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Container } from '../shared/Container';

export const LeadCapture = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="py-24 lg:py-32 border-t border-navy-700/50">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-overline text-blue-400 uppercase tracking-widest text-xs font-medium mb-4">Recurso gratis</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Querés entender todo esto sin que te vendamos algo?
          </h2>
          <p className="text-navy-300 text-body-lg mb-8 leading-relaxed">
            Guía gratis: <strong className="text-white">&ldquo;El stack IA para negocios LATAM en 2026&rdquo;</strong> — 12 páginas, sin fluff, sin relleno.
          </p>

          {status === 'success' ? (
            <div className="flex flex-col items-center gap-3 text-green-400">
              <CheckCircle className="w-10 h-10" />
              <p className="font-semibold">¡Listo! Revisá tu correo en los próximos minutos.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 bg-navy-800 border border-navy-600 rounded-md px-4 py-3 text-white placeholder-navy-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 text-sm"
              />
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="bg-navy-800 border border-navy-600 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
              >
                <option value="">Mi rol</option>
                <option value="owner">Dueño de negocio</option>
                <option value="agency">Agencia</option>
                <option value="developer">Desarrollador</option>
                <option value="other">Otro</option>
              </select>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 text-white font-semibold px-5 py-3 rounded-pill text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60 whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
              >
                {status === 'loading' ? 'Enviando...' : <><ArrowRight className="w-4 h-4" /> Enviármela</>}
              </button>
            </form>
          )}
          {status === 'error' && <p className="text-red-400 text-sm mt-3">Algo salió mal. Intentá de nuevo.</p>}
        </div>
      </Container>
    </section>
  );
};
