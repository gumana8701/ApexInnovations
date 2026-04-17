import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPTS: Record<string, string> = {
  dental: `Sos Carla, asistente virtual de Clínica Dental Sonrisa, una clínica moderna en Latinoamérica. Tu rol es agendar citas, informar sobre tratamientos (limpieza, blanqueamiento, ortodoncia, implantes, emergencias) y resolver dudas. Sos amable, profesional y eficiente. Respondés en español. Máximo 2-3 oraciones por respuesta. Si el paciente quiere agendar, pedí nombre, fecha preferida y tipo de consulta.`,
  realEstate: `Sos Olivia, agente inmobiliaria virtual especializada en propiedades residenciales y de inversión en USA y LATAM. Ayudás a calificar compradores/vendedores, informar sobre propiedades y agendar visitas. Sos directa, profesional y orientada a resultados. Respondés en español. Máximo 2-3 oraciones por respuesta. Calificá al lead: ¿compra, vende o invierte? ¿Cuál es su presupuesto?`,
  legal: `Sos el asistente virtual de un bufete especializado en accidentes de tráfico y personal injury en Florida y Texas. Tu rol es calificar casos (¿hubo accidente? ¿cuándo? ¿lesiones?), informar sobre el proceso legal y agendar consulta gratuita con un abogado. Sos empático y preciso. Respondés en español. Máximo 2-3 oraciones por respuesta. NO des asesoría legal, solo información general y captá los datos del caso.`,
  ecommerce: `Sos el asistente virtual de una tienda online. Ayudás con: estado de pedidos, información de productos, devoluciones y cambios, métodos de pago, y tiempos de entrega. Sos resolutivo y amable. Respondés en español. Máximo 2-3 oraciones por respuesta. Si el cliente tiene un problema con un pedido, pedí el número de orden.`,
};

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const key = ip;
  const limit = rateLimitMap.get(key);

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + 3600000 }); // 1 hour
    return true;
  }

  if (limit.count >= 10) return false;
  limit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Try again in an hour.' }, { status: 429 });
  }

  const { messages, scenario } = await req.json();
  const systemPrompt = SYSTEM_PROMPTS[scenario] || SYSTEM_PROMPTS.dental;

  if (!process.env.ANTHROPIC_API_KEY) {
    // Demo fallback without API key
    const fallbacks: Record<string, string[]> = {
      dental: ['Claro, podemos agendar una limpieza dental. ¿Cuál es tu nombre y qué día te vendría mejor?', 'Tenemos disponibilidad esta semana. ¿Preferís mañana por la mañana o por la tarde?', 'Perfecto, te anoto para el martes a las 10am. Te confirmamos por WhatsApp.'],
      realEstate: ['Entendido. ¿Estás buscando comprar o vender? También necesito saber el rango de presupuesto aproximado.', 'Tenemos propiedades en esa zona desde $150K. ¿Querés que te envíe algunas opciones?', 'Excelente perfil de comprador. ¿Podemos agendar una llamada de 20 minutos con uno de nuestros agentes?'],
      legal: ['Lo siento mucho por lo que pasaste. Para evaluar tu caso necesito saber: ¿cuándo ocurrió el accidente y sufriste lesiones?', 'Con esa información podemos evaluar si tienes un caso viable. ¿Querés que un abogado te llame hoy sin costo?', 'Perfecto. Dame tu nombre y número y te contactamos hoy mismo. La consulta es completamente gratis.'],
      ecommerce: ['Claro que sí. Para revisar tu pedido necesito el número de orden. Lo encontrás en el email de confirmación.', 'Veo que tu pedido está en camino. Llegará en 2-3 días hábiles. ¿Hay algo más en lo que pueda ayudarte?', 'Para procesar la devolución necesito que nos envíes el producto en su empaque original. ¿Querés que te envíe las instrucciones por email?'],
    };
    const options = fallbacks[scenario] || fallbacks.dental;
    const reply = options[Math.floor(Math.random() * options.length)];
    return NextResponse.json({ content: reply });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 400,
      system: systemPrompt,
      messages: messages.filter((m: { role: string }) => m.role === 'user' || m.role === 'assistant'),
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    return NextResponse.json({ content });
  } catch (e) {
    console.error('Demo API error:', e);
    return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  }
}
