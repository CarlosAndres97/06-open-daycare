<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands
- `npm run dev` - Start dev server (http://localhost:3000)
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack
- Next.js 16.2.11 (App Router)
- React 19.2.4
- Tailwind CSS 4
- TypeScript with strict mode
- ESLint flat config

## MCPs
- **Playwright**: Screenshots must go in `.playwright-mcp/` folder
- **Context7**: Use for current Next.js/React/Tailwind documentation
- **Supabase**: Use para interactuar con el proyecto Supabase (migrations, queries, RLS, edge functions, logs, advisors). Antes de cambios de schema, usar `list_tables`; para debug, `get_logs` + `get_advisors`. En entorno local usar Supabase CLI; en remoto usar las tools MCP directamente (los cambios vía `apply_migration` van directo al proyecto remoto).

### Database migration policy
Toda manipulación de la base de datos (DDL + DML persistente: `CREATE`/`ALTER`/`DROP` de tablas, columnas, índices, policies, triggers, functions, y seeds/INSERTs que deben quedar en el remoto) **debe** ir dentro de una migración. En remoto usar siempre `supabase_apply_migration` con un nombre `snake_case` descriptivo (`create_<tabla>`, `add_<columna>_to_<tabla>`, `enable_rls_<tabla>`, etc.) — la SQL queda registrada en el changelog de Supabase y constituye el historial. `supabase_execute_sql` queda reservado para verificación, queries de diagnóstico y SELECTs; **no** para DDL/DML persistente. Una migración por spec, alineada con su plan de implementación.

## Spec Driven Development -Skills
- /spec Usaremos esta habilidad para crear las especificaciones.
- /spec-impl Usaremos esta skill para hacer las implementaciones.
- /spec-verifier Usaremos esta skill para verificar los criterios de aceptación de un spec implementado. El agente corre los checks (build/lint/runtime/visual/structure/manual) y marca los criterios aprobados con `[x]` en `## Acceptance Criteria`. **No modifica el `**Status:**` del spec** — eso lo hacés a mano.

## Supabase Skills
- **supabase**: Cargar SIEMPRE que la tarea involucre Supabase (Database, Auth, Edge Functions, Realtime, Storage, Vectors, Cron, Queues; supabase-js y @supabase/ssr en Next.js/React/SvelteKit/Astro/Remix; auth/sesiones/JWT/cookies/RLS; CLI o MCP; schema, migraciones, seguridad; debugging con logs).
- **supabase-postgres-best-practices**: Cargar ANTES de escribir o cambiar cualquier cosa que viva en Postgres (crear/alterar tablas y columnas, diseño de schema, migraciones, RLS policies e indexes, triggers, functions, queues/cron, pgvector, restore/import, o diagnóstico de queries lentas/RLS/timeouts/locks/bloat). Aplica también a cambios mínimos (una columna, una query).

## Project Structure
- `app/` - Next.js App Router pages and layouts
- `referencias/` - Screen mockups and design references
- Entry point: `app/page.tsx`

## Notes
- No test framework configured yet
- No database or API layer visible in current state

## Reglas de codigo
- Usar codigo limpio - nombres de variables, funciones y demas en ingles
