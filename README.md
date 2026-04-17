# AppEx Platform

Plataforma híbrida de servicios IA — agencia + self-service + academia.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Supabase** (lead capture)
- **Anthropic SDK** (demo interactivo con Claude)
- **Vercel** (deploy)

## Setup local

```bash
cp .env.local.example .env.local
# Editar .env.local con tus keys

npm install
npm run dev
```

## Estructura

```
src/
├── app/
│   ├── page.tsx            # Homepage
│   ├── servicios/          # Service catalog
│   ├── sobre-nosotros/     # About page
│   ├── contacto/           # Contact + Calendly
│   └── api/
│       ├── demo/           # Claude proxy (4 scenarios)
│       └── capture/        # Email → Supabase
├── components/
│   ├── marketing/          # Hero, Demo, Services, etc.
│   └── shared/             # Navbar, Footer, Logo
└── content/
    └── services.ts         # Service data
```

## Deploy

Push a `main` → Vercel auto-deploy.
