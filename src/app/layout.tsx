import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AppEx — Agentes IA para tu negocio',
  description: 'Agentes IA que cierran ventas, agendan citas y atienden clientes. Construidos a medida o listos en 5 minutos.',
  keywords: ['agentes IA', 'automatización', 'WhatsApp bot', 'voice agent', 'GoHighLevel', 'LATAM'],
  openGraph: {
    title: 'AppEx — Agentes IA para tu negocio',
    description: 'Agentes IA que cierran ventas, agendan citas y atienden clientes.',
    type: 'website',
    locale: 'es_419',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AppEx — Agentes IA para tu negocio',
    description: 'Agentes IA que cierran ventas, agendan citas y atienden clientes.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} antialiased bg-navy-900 text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
