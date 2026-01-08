# Copilot Instructions

## Architecture Overview

This is a Next.js 16 application following **Screaming Architecture** principles - the folder structure communicates the business domain, not technical frameworks.

**Tech Stack:**
- **Next.js 16** with App Router and React 19 Compiler enabled
- **Tailwind CSS v4** with HeroUI v3 (beta) component library
- **PostgreSQL** database with Prisma ORM
- **JWT authentication** using jose library with argon2 password hashing
- **React Query** for server state management
- **Deployed on Vercel**

## Project Structure (Screaming Architecture)

The codebase is organized by business features, not technical layers:

```
src/
├── app/           # Next.js App Router (routes, layouts, API routes)
├── auth/          # Authentication feature (actions, components, lib)
├── user/          # User management feature (actions, mocks)
└── core/          # Shared infrastructure
    ├── components/    # Reusable UI components
    ├── layout/        # Layout wrappers
    ├── lib/           # Core utilities (prisma, env, react-query)
    ├── provider/      # React context providers
    └── utils/         # Helper functions
```

## Key Conventions

### Server Actions Pattern
- All server actions MUST start with `"use server"` directive
- Actions are co-located with features in `[feature]/action/` directories
- Example: [src/auth/actions/login.action.ts](src/auth/actions/login.action.ts), [src/user/action/create.ts](src/user/action/create.ts)
- Actions return simple values (avoid complex serialization)

### Prisma Configuration
- **Custom generator output**: Prisma client is generated to [src/core/lib/prisma/generated](src/core/lib/prisma/generated) (NOT default location)
- Always import from `@/core/lib/prisma` which exports the configured client
- Database configuration is in [prisma.config.ts](prisma.config.ts) (custom Prisma Config pattern)
- Use `getDataWithPagination` utility from [src/core/utils/getDataWithPagination.ts](src/core/utils/getDataWithPagination.ts) for paginated queries

### Authentication Flow
- JWT tokens stored in httpOnly cookies named "sid"
- Session validation via `getSession()` from [src/auth/lib/jose.ts](src/auth/lib/jose.ts)
- Protected routes use `protectedRoute()` helper which auto-redirects to `/login`
- Passwords hashed with argon2 (never bcrypt)

### Styling & Components
- Tailwind CSS v4 (NOT v3) - uses `@import` syntax in [src/app/globals.css](src/app/globals.css)
- HeroUI v3 beta components - check official docs for v3-specific API changes
- Icons via `@iconify/tailwind4` plugin
- No separate tailwind.config file - configuration in [postcss.config.mjs](postcss.config.mjs)

### React Query Setup
- Pre-configured with sensible defaults in [src/core/lib/reactQuery.tsx](src/core/lib/reactQuery.tsx):
  - 5min staleTime
  - 10min gcTime
  - No refetch on window focus
  - DevTools enabled in development

## Development Workflows

### Environment Setup
1. Copy `.env.copy` to `.env` and configure DATABASE_URL and JWT_SECRET
2. Install dependencies: `npm install` (or yarn/pnpm/bun)
3. Run migrations: `npm run prisma migrate dev`
4. Generate test data: `npm run generateData` (uses [scripts/generateData.ts](scripts/generateData.ts))
5. Start dev server: `npm run dev`

### Database Changes
- Edit [prisma/schema.prisma](prisma/schema.prisma)
- Run `npm run prisma migrate dev --name <description>`
- Prisma Client auto-regenerates to [src/core/lib/prisma/generated](src/core/lib/prisma/generated)

### Adding New Features
1. Create feature directory under `src/` (e.g., `src/orders/`)
2. Organize with subdirectories: `action/`, `components/`, `lib/`
3. Keep feature-specific logic isolated; use `core/` only for shared utilities
4. API routes go in `src/app/api/[feature]/`
5. **Screaming Architecture**: Name folders after business concepts (orders, products, invoices), NOT technical layers (controllers, services)

## Deployment (Vercel)

### Production Build
- Build command: `npm run build` (configured in Vercel automatically)
- Output directory: `.next` (default Next.js output)
- Node.js version: 20.x (specified in package.json engines if needed)

### Environment Variables
Configure in Vercel dashboard or via `vercel env`:
- `DATABASE_URL`: PostgreSQL connection string (use Vercel Postgres or external provider)
- `JWT_SECRET`: Secure random string for JWT signing

### Database Considerations
- For production, use Vercel Postgres, Neon, Supabase, or similar PostgreSQL service
- Run migrations after deployment: `npx prisma migrate deploy` (not migrate dev)
- Consider using Prisma Data Proxy for serverless edge compatibility if needed

### Vercel-Specific Notes
- Serverless functions have 10s timeout on Hobby plan, 60s on Pro
- Custom Prisma output path works seamlessly with Vercel's build system
- React Query DevTools automatically disabled in production builds

## Important Notes

- **Path aliases**: `@/*` maps to `src/*`
- **React Compiler**: Enabled in next.config.ts (avoid manual memoization)
- **Environment variables**: Server-only vars in `src/core/lib/env.ts`, client-safe in `src/core/lib/env.public.ts`
- **No Provider required**: HeroUI v3 works without wrapping providers (unlike v2)
