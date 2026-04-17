# AppEx Platform — Build Brief for OpenClaw
## Design System + Technical Spec + Content

> Documento ejecutable. OpenClaw (o cualquier agente de código) debería poder construir la Fase 1 completa siguiendo este documento sin supervisión.
> Versión: 1.0 · Abril 2026
> Owner: Guillermo Umaña

---

## 0. Cómo usar este documento

Este brief está estructurado para que un coding agent lo procese de arriba abajo:

1. **Sección 1–3:** Contexto e identidad. Leer una vez.
2. **Sección 4:** Design System. Implementar como `globals.css` + `tailwind.config.ts`.
3. **Sección 5:** Estructura de repo. Crear en orden.
4. **Sección 6:** Páginas con copy exacto. Implementar sección por sección.
5. **Sección 7:** Componentes reutilizables. Construir en orden de dependencia.
6. **Sección 8:** Integraciones (Supabase, Claude API, Stripe). Conectar al final.
7. **Sección 9:** Checklist de validación antes de deploy.

---

## 1. Contexto del proyecto

**Qué es:** Plataforma híbrida de servicios IA. Combina tres modelos de negocio:
- Agencia (servicios custom)
- Self-service (agentes IA configurables)
- Academia (cursos + comunidad)

**Fase a construir ahora:** Fase 1 (MVP). Solo marketing site + demo interactivo + captura de leads. NO construir self-service aún.

**Stack obligatorio:**
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- shadcn/ui components
- Supabase (auth + db, pero en Fase 1 solo captura de email)
- Anthropic SDK (para demo interactivo)
- Resend (emails transaccionales)
- Vercel (deploy)

**Lo que NO hay que hacer en Fase 1:**
- Autenticación de usuarios
- Dashboard
- Stripe
- Agent configurator
- Blog con CMS (los posts van como .mdx en el repo)

---

## 2. Identidad de marca (nombre provisional)

**Working name:** AppEx (sujeto a confirmación del owner antes de comprar dominio).

**Alternativas a considerar:** Agentik, Forja AI, Tallr, Nexly, Buildflow.

**Tono de voz:**
- Directo, sin corporativeses
- Bilingüe (español primero, inglés como toggle)
- Técnicamente creíble (sabe de qué habla)
- Confiado pero sin fanfarria
- Un punto de humor seco cuando cabe

**Positioning statement (una línea):**
> "Agentes IA, integraciones y automatización — hechos a medida, o listos para que los armes tú mismo en 5 minutos."

---

## 3. Logo (v1 simplificado)

Hasta que haya un logo final, usar **wordmark puro** estilizado:

- Texto "AppEx" (o nombre final) en font PP Mori Bold / Satoshi Bold
- Primera letra en color del gradient principal
- Resto del texto en white (contexto dark) o navy-800 (contexto light)
- Sin icono hasta v2

Instrucciones para generar SVG inline (React component):
```tsx
export const Logo = ({ className = "h-8" }) => (
  <svg viewBox="0 0 140 40" className={className} fill="none">
    <text x="0" y="28" fontFamily="'PP Mori', 'Satoshi', sans-serif"
          fontWeight="700" fontSize="28">
      <tspan fill="url(#brandGradient)">A</tspan>
      <tspan fill="currentColor">ppEx</tspan>
    </text>
    <defs>
      <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
  </svg>
);
```

---

## 4. Design System (tokens completos)

### 4.1 Paleta de colores

Inspirada en el kit que teníamos pero **shifteada a teal-magenta** para diferenciación.

```css
:root {
  /* Neutrals — Navy scale */
  --white: #FFFFFF;
  --navy-50:  #F5F7FB;
  --navy-100: #E5EAF3;
  --navy-200: #C4CDE0;
  --navy-300: #8E9CBC;
  --navy-400: #5E6D93;
  --navy-500: #2D3963;
  --navy-600: #1E2849;
  --navy-700: #131B36;
  --navy-800: #0A1122;
  --navy-900: #050A1A;

  /* Accents — Electric Blue (primary) */
  --blue-400: #60A5FA;
  --blue-500: #3B82F6;
  --blue-600: #2563EB;
  --blue-700: #1D4ED8;

  /* Accents — Violet (secondary) */
  --violet-400: #A78BFA;
  --violet-500: #8B5CF6;
  --violet-600: #7C3AED;
  --violet-700: #6D28D9;

  /* Gradients */
  --gradient-brand: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
  --gradient-brand-dark: linear-gradient(135deg, #1D4ED8 0%, #6D28D9 100%);
  --gradient-brand-hover: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
  --gradient-surface-dark: linear-gradient(180deg, #0A1122 0%, #050A1A 100%);

  /* Semantic */
  --success: #22C55E;
  --warning: #F59E0B;
  --error:   #EF4444;
  --info:    #3B82F6;
}
```

### 4.2 Tipografía

```css
--font-heading: 'Satoshi', 'PP Mori', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

Cargar vía `next/font`:
- Satoshi Variable (400, 500, 700, 900) para headings
- Inter Variable (400, 500, 600) para body
- JetBrains Mono (400, 700) para code blocks

Escala tipográfica:

| Token | Tamaño | Uso |
|---|---|---|
| display | 64px / 1.1 / -0.02em | Hero H1 |
| h1 | 48px / 1.15 / -0.02em | Página H1 |
| h2 | 36px / 1.2 / -0.015em | Section heading |
| h3 | 24px / 1.3 | Subsection |
| h4 | 20px / 1.4 | Card heading |
| body-lg | 18px / 1.6 | Hero subtext |
| body | 16px / 1.6 | Párrafos |
| body-sm | 14px / 1.5 | Captions |
| overline | 12px / 1 / 0.08em uppercase | Eyebrow labels |

### 4.3 Espaciado (8pt grid)

```
0.5 = 4px  |  1 = 8px   |  1.5 = 12px  |  2 = 16px
3 = 24px   |  4 = 32px  |  6 = 48px    |  8 = 64px
12 = 96px  | 16 = 128px | 24 = 192px
```

Section padding vertical:
- Mobile: `py-16` (64px)
- Tablet: `py-20` (80px)
- Desktop: `py-32` (128px)

### 4.4 Border radius

```
--radius-sm: 6px
--radius-md: 10px
--radius-lg: 16px
--radius-xl: 24px
--radius-pill: 9999px
```

Default para cards: `--radius-lg`. Para botones: `--radius-pill`. Para inputs: `--radius-md`.

### 4.5 Sombras

```css
--shadow-sm: 0 1px 2px rgba(5, 10, 26, 0.3);
--shadow-md: 0 4px 12px rgba(5, 10, 26, 0.35);
--shadow-lg: 0 16px 40px rgba(5, 10, 26, 0.45);
--shadow-glow: 0 0 60px rgba(124, 58, 237, 0.25);
```

### 4.6 Botones (5 variantes)

Todas pill-shaped (`--radius-pill`), padding `px-6 py-3`, font weight 600.

1. **Primary (filled gradient)**
```css
background: var(--gradient-brand);
color: white;
transition: transform 200ms, box-shadow 200ms;
&:hover { transform: translateY(-1px); box-shadow: var(--shadow-glow); }
```

2. **Primary with arrow** — igual + icon `ArrowRight` a la derecha.

3. **Outline**
```css
background: transparent;
border: 1.5px solid var(--navy-300);
color: var(--white);
&:hover { border-color: var(--blue-500); color: var(--blue-400); }
```

4. **Outline with arrow** — igual + `ArrowRight`.

5. **Ghost link** — solo texto + `ArrowRight`, sin background ni borde.

### 4.7 Cards

```css
.card {
  background: var(--navy-800);
  border: 1px solid var(--navy-600);
  border-radius: var(--radius-lg);
  padding: 24px;
  transition: border-color 200ms, transform 200ms;
}
.card:hover {
  border-color: var(--blue-500);
  transform: translateY(-2px);
}
```

Variante con gradient border (para featured cards):
```css
.card-featured {
  position: relative;
  background: var(--navy-800);
}
.card-featured::before {
  content: "";
  position: absolute; inset: -1px;
  background: var(--gradient-brand);
  border-radius: inherit;
  z-index: -1;
}
```

### 4.8 Inputs

```css
.input {
  background: var(--navy-800);
  border: 1px solid var(--navy-600);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  color: var(--white);
  font-size: 16px;
}
.input:focus {
  outline: none;
  border-color: var(--blue-500);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}
```

### 4.9 Modo — dark-first

**El sitio es dark-mode por default.** Contexto principal: fondo `--navy-900`, texto `--white`. No implementar toggle light/dark en Fase 1.

---

## 5. Estructura del Repositorio

```
appex-platform/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fonts, metadata)
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Tokens + base styles
│   │   ├── servicios/
│   │   │   └── page.tsx        # Service catalog
│   │   ├── demo/
│   │   │   └── page.tsx        # Full-page demo (opcional)
│   │   ├── sobre-nosotros/
│   │   │   └── page.tsx
│   │   ├── contacto/
│   │   │   └── page.tsx
│   │   └── api/
│   │       ├── demo/route.ts   # Proxy a Claude API
│   │       └── capture/route.ts # Email capture → Supabase
│   ├── components/
│   │   ├── ui/                 # shadcn primitives
│   │   ├── marketing/
│   │   │   ├── Hero.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── DemoWidget.tsx
│   │   │   ├── SocialProof.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── Footer.tsx
│   │   └── shared/
│   │       ├── Logo.tsx
│   │       ├── Navbar.tsx
│   │       └── Container.tsx
│   ├── lib/
│   │   ├── anthropic.ts        # Claude client
│   │   ├── supabase.ts         # Supabase client
│   │   └── utils.ts
│   └── content/
│       └── services.ts         # Data source para ServicesGrid
├── public/
│   ├── og-image.png
│   └── favicon.ico
├── tailwind.config.ts
├── next.config.mjs
├── package.json
└── .env.local.example
```

---

## 6. Homepage — sección por sección (con copy exacto)

### 6.1 Navbar (sticky top)
- Logo izquierda
- Links centro: "Servicios", "Cómo funciona", "Academia", "Casos"
- Botón derecha: "Agendar llamada" (outline with arrow)
- Mobile: hamburger → drawer

Altura 72px. Background `rgba(5, 10, 26, 0.8)` con `backdrop-blur-lg` al hacer scroll.

### 6.2 Hero section

```
[Eyebrow overline] PLATAFORMA DE AGENTES IA

[H1 display]
Agentes IA que cierran ventas,
agendan citas y atienden clientes.
[con gradient en "Agentes IA"]

[Body-lg subtext]
Los construimos nosotros, o los armás vos en 5 minutos
con plantillas probadas en 100+ negocios de LATAM y USA.

[CTA Primary] Probá un agente ahora →
[CTA Outline] Ver servicios

[Subtle trust line]
WhatsApp · Voz · Web · Instagram · Integrado con GHL, Retell, n8n
```

**Visual:** Lado derecho, mockup de un iPhone mostrando una conversación de WhatsApp con un agente, o video loop de 10s de una llamada con voice agent. Si no hay asset, usar un animated gradient orb con partículas (SVG animado).

### 6.3 Demo interactivo (feature principal)

Título: **"Probá cómo piensa un agente"**
Subtexto: *"No es una grabación. Es el mismo motor que corre en los agentes que construimos para clínicas, inmobiliarias y bufetes de abogados."*

Selector de escenario (tabs):
- 🏥 Clínica dental
- 🏠 Real estate
- ⚖️ Bufete de abogados
- 🛒 E-commerce

Bajo las tabs, un chat UI ancho completo (max-w-3xl centrado):
- Mensaje inicial del agente (pre-cargado según tab)
- Input del usuario
- Máximo 8 mensajes por sesión antes de cortar
- Al llegar al límite, overlay: "¿Te gustó? Armá uno así para tu negocio → [CTA]"

**Implementación backend (`/api/demo/route.ts`):**
```typescript
import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPTS = {
  dental: `Sos Carla, asistente virtual de Clínica Dental Sonrisa...`,
  realEstate: `Sos Olivia, agente inmobiliaria virtual...`,
  legal: `Sos asistente de bufete especializado en accidentes...`,
  ecommerce: `Sos asistente de tienda online...`
};

export async function POST(req: Request) {
  const { messages, scenario } = await req.json();
  const client = new Anthropic();
  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 400,
    system: SYSTEM_PROMPTS[scenario],
    messages
  });
  return Response.json({ content: response.content[0].text });
}
```

### 6.4 Services Grid

Título: **"7 áreas de trabajo, 1 solo equipo"**
Subtexto: *"De un voice agent standalone a una plataforma completa con CRM, automatizaciones y dashboards. Elegí lo que necesitás — o dejanos armarte todo."*

Grid 3 columnas desktop / 2 tablet / 1 mobile. 7 cards:

1. **Voice Agents** — Vapi, Retell, SimpleTalk. Llamadas inbound y outbound con IA.
2. **Chat & WhatsApp** — Agentes multi-canal que atienden 24/7 con contexto real.
3. **Integraciones & APIs** — Salesforce, HubSpot, GHL, Shopify. Webhooks, middleware, custom.
4. **GoHighLevel** — Setup, white-label, dashboards custom, migraciones.
5. **Development** — Apps web, dashboards, backends con Next.js, Supabase.
6. **Infraestructura IA** — OpenClaw, NemoClaw, VPS, Docker, self-hosted models.
7. **Training & Mentoría** — Cursos pre-grabados, mentoría 1-on-1, workshops.

Cada card:
- Icon arriba (usar Lucide icons: `Phone`, `MessageSquare`, `Workflow`, `Layers`, `Code2`, `Server`, `GraduationCap`)
- Título
- Descripción 2 líneas
- Link "Ver detalle →" (en Fase 1 manda a `/servicios#voice-agents` ancla)

### 6.5 Cómo funciona (3 pasos)

Título: **"Dos caminos, cero fricción"**

Split en 2 columnas:

**Columna A — "Lo hacemos nosotros"**
1. Agendás una llamada de 30 min
2. Definimos scope + presupuesto
3. Entregamos en 2-4 semanas con soporte incluido
CTA: *Agendar llamada →*

**Columna B — "Lo armás vos" (badge: "PRONTO")**
1. Elegís una plantilla probada
2. Configurás en un wizard de 5 pasos
3. Activamos tu agente en 5 minutos
CTA: *Sumate al waitlist →*

### 6.6 Casos / Social proof

Título: **"Construido con clientes reales en producción"**

Grid de 3 stat cards:

```
100+              4 países              24/7
Agentes           Argentina, Colombia    Operando sin
desplegados       Panamá, México         descanso
```

Debajo: carrusel horizontal con 3-4 mini case studies anonimizados:

1. **Clínica dental en Medellín** — "De 3 horas a 3 minutos de respuesta en WhatsApp. 40% más citas agendadas en 60 días."
2. **Bufete personal injury en Florida** — "Sistema multi-agente calificando 800+ leads/mes. 3x tasa de calificación."
3. **Real estate investor en Texas** — "Outbound voice agents calificando sellers. $18K en deals cerrados primer mes."

(Todos reales — Satori, Trinity Offers, Allied Development — sin nombrar clientes.)

### 6.7 Captura de email (lead magnet)

Título: **"¿Querés entender todo esto sin vendernos algo?"**
Subtexto: *"Guía gratis: 'El stack IA para negocios LATAM en 2026' — 12 páginas, sin fluff, sin relleno."*

Form inline:
- Input email
- Select: rol (Dueño de negocio, Agencia, Desarrollador, Otro)
- Botón primary: "Enviármela"

**Backend (`/api/capture/route.ts`):**
- Valida email
- Inserta en Supabase table `leads` (email, role, source, created_at)
- Dispara email vía Resend con PDF adjunto
- Retorna success JSON

### 6.8 CTA final

Sobre fondo con `--gradient-brand` sutil (opacidad 0.1):

```
[H2]
¿Listo para dejar de atender
mensajes a las 11 de la noche?

[Body]
Agendá una llamada de 30 minutos.
Si no te sirve, te devolvemos tus 30 minutos con intereses (un consejo útil).

[CTA Primary] Agendar llamada →
```

### 6.9 Footer

4 columnas en desktop:

1. **AppEx** — Logo + tagline + copyright
2. **Servicios** — links a cada categoría
3. **Recursos** — Blog (soon), Academia (soon), Casos de uso
4. **Contacto** — Email, WhatsApp, LinkedIn, Calendly

Bottom bar: "© 2026 AppEx · Privacy · Terms · Hecho desde 🇸🇻"

---

## 7. Otras páginas (Fase 1)

### 7.1 `/servicios` — Service Catalog

Layout de 2 columnas: sidebar izquierda con las 7 categorías (sticky), contenido derecha con sección por categoría.

Cada sección:
- H2 con categoría
- Descripción larga (3-5 párrafos)
- "Qué incluye" — lista de 5-8 items
- "Ejemplos reales" — 2 mini-cases
- "Precio base" — rango
- CTA: *Agendar para discutir →*

### 7.2 `/sobre-nosotros`

- Historia corta (1 párrafo de origen)
- Equipo (foto + rol) — Guillermo + colaboradores si aplica
- Valores (3-4 principios, NO bullet genéricos, sino posiciones reales)
- Stack técnico (visual grid de logos de herramientas)
- Timezone / disponibilidad

### 7.3 `/contacto`

Dos opciones lado a lado:
- **Agendar llamada** — Calendly embed
- **Mandar un mensaje** — form simple (nombre, email, mensaje) → email a Guillermo vía Resend

---

## 8. Integraciones de Fase 1

### 8.1 Supabase

Una sola tabla por ahora:

```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamp with time zone default now()
);

create index idx_leads_email on leads(email);
create index idx_leads_created_at on leads(created_at desc);
```

### 8.2 Anthropic Claude API

- SDK: `@anthropic-ai/sdk`
- Model: `claude-sonnet-4-5`
- Max tokens: 400 por respuesta del demo
- Streaming: NO en Fase 1 (más simple, suficiente)
- Rate limit: implementar rate limit por IP (10 requests/hora) con middleware

### 8.3 Resend

- Envío de PDF lead magnet al suscribir
- Notification a Guillermo cuando llega un form de contacto
- Setup dominio para SPF/DKIM

### 8.4 Calendly

- Embed inline (script de Calendly)
- URL placeholder: `https://calendly.com/guillermo-appex/30min`

### 8.5 Analytics

- Vercel Analytics (flag en `next.config.mjs`)
- Adicional: Plausible (`plausible.io`) embebido en layout

---

## 9. Checklist pre-deploy

```
[ ] Lighthouse score >= 90 en Performance, Accessibility, Best Practices, SEO
[ ] Meta tags OG + Twitter en layout.tsx
[ ] favicon.ico + apple-touch-icon.png
[ ] robots.txt permitiendo todo
[ ] sitemap.xml automático (next-sitemap)
[ ] 404 page custom
[ ] 500 page custom
[ ] Formulario de captura testeado end-to-end
[ ] Demo interactivo probado con los 4 escenarios
[ ] Mobile responsive verificado (320px, 375px, 768px, 1024px, 1440px)
[ ] Dark mode consistente en todas las páginas
[ ] Typography render correcto con next/font
[ ] No hay imports sin usar
[ ] No hay console.log en código final
[ ] ENV vars documentadas en .env.local.example
[ ] README.md con instrucciones de setup local
```

---

## 10. Orden de construcción recomendado (12-18 horas de trabajo)

**Sesión 1 (2-3 hrs):** Setup inicial
- `npx create-next-app@latest appex-platform --typescript --tailwind --app`
- Config Tailwind con los tokens
- `globals.css` con CSS variables
- Instalar shadcn/ui, Lucide, Anthropic SDK, Supabase client
- Structure de carpetas
- Components base: Logo, Container, Navbar, Footer

**Sesión 2 (3-4 hrs):** Homepage estática
- Hero
- Services Grid
- Cómo funciona
- Social proof
- CTA final
- Footer

Sin backend todavía. Todo con data dummy.

**Sesión 3 (3-4 hrs):** Demo interactivo
- UI del chat
- Selector de escenarios
- API route `/api/demo`
- System prompts para los 4 escenarios
- Rate limiting
- Estado (messages, loading, error)

**Sesión 4 (2-3 hrs):** Captura de leads
- Form UI
- API route `/api/capture`
- Supabase table y client
- Resend integration + PDF lead magnet (el PDF lo da Guillermo)

**Sesión 5 (2-3 hrs):** Páginas secundarias
- `/servicios`
- `/sobre-nosotros`
- `/contacto` con Calendly embed

**Sesión 6 (1-2 hrs):** Polish + deploy
- Checklist sección 9
- Conectar dominio
- Deploy a Vercel
- Verificación en producción

---

## 11. Variables de entorno necesarias

```
# .env.local.example

# Anthropic
ANTHROPIC_API_KEY=sk-ant-xxxxxx

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxxx

# Resend
RESEND_API_KEY=re_xxxxxx
RESEND_FROM_EMAIL=hola@appex.xxx

# Site
NEXT_PUBLIC_SITE_URL=https://appex.xxx
```

---

## 12. Decisiones pendientes antes de empezar

OpenClaw no puede empezar hasta que Guillermo confirme:

1. **Nombre definitivo** (AppEx / Agentik / Forja / Tallr / Nexly / otro)
2. **Dominio comprado** (necesito saber la URL para metadata)
3. **Decisión sobre brand kit** (shift paleta o usar ORA tal cual)
4. **Email de contacto** (hola@dominio / guillermo@dominio)
5. **Calendly URL** real
6. **Lead magnet PDF** (el contenido, no solo el concepto)
7. **Fotos/assets propios** o usar ilustraciones generadas

Hasta tener estas 7, OpenClaw puede:
- Hacer todo el setup técnico (Sesión 1)
- Construir homepage con placeholders (Sesión 2)
- Construir demo con los 4 escenarios (Sesión 3)

Pero NO puede deployar a producción hasta tener dominio y decisiones finales.

---

**Fin del brief — v1.0**
