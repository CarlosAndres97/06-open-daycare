# SPEC 07 — Tabla `daycares` (entidad raíz)

> **Status:** Approved
> **Depends on:** —
> **Date:** 2026-08-23
> **Objective:** Crear la tabla `public.daycares` en el proyecto Supabase remoto siguiendo el diccionario de `07-DB-Schema`, con RLS activado (policy permisiva temporal) y una fila seed de desarrollo.

## 1. Scope

**In scope**

- Tabla `public.daycares` con columnas `id uuid PK`, `name text`, `created_at timestamptz`, según `07-DB-Schema/opendaycare-database-schema.md` §1.
- `id` con default `gen_random_uuid()`. `created_at` con default `now()`.
- RLS activado (`enable row level security`) en `public.daycares`.
- Una policy `SELECT` permisiva (`using (true)`) para roles `anon` y `authenticated`, marcada como temporal hasta que exista la tabla `users`.
- Seed de 1 fila: `('Guardería Sala Soles')`.
- Aplicación directa al remoto vía MCP `apply_migration` (sin archivos locales).
- Verificación con `list_tables verbose`, `execute_sql` y `get_advisors (security)`.
- Confirmación de que `npm run build` y `npm run lint` siguen verdes (este spec no toca código de app).

**Out of scope (para futuros specs)**

- Tablas `users`, `rooms`, `children`, etc. (cada una en su propio spec).
- Reemplazo de la policy permisiva por policies restrictivas que filtren por membresía (depende del spec de `users`).
- Triggers, índices adicionales (no se justifican en una tabla con PK y sin FKs todavía), ni funciones.
- UI / código de aplicación que consuma `daycares`.
- Configuración de Storage, Auth providers, Realtime, Edge Functions.

## 2. Data model

Este spec **introduce** la primera tabla del modelo. Estructura física en Postgres:

```sql
create table public.daycares (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.daycares enable row level security;

create policy "daycares_select_all_temp"
  on public.daycares
  for select
  to anon, authenticated
  using (true);

insert into public.daycares (name)
  values ('Guardería Sala Soles');
```

Convención aplicada (de la nota al inicio del schema de referencia): PK `uuid` con `gen_random_uuid()`, timestamps `timestamptz`, nombres en inglés, sin `updated_at` (la tabla no lo declara en el spec original).

## 3. Implementation plan

Cada paso deja el sistema en estado verificable.

1. Cargar la skill `supabase-postgres-best-practices` y la skill `supabase` (requeridas por AGENTS.md para cualquier cambio en Postgres).
2. Llamar `supabase_list_tables schemas=["public"] verbose=true` para confirmar el estado inicial (la tabla `daycares` **no debe** existir).
3. Llamar `supabase_apply_migration` con nombre `create_daycares_table` y la SQL completa del §2 (tabla + RLS + policy + seed).
4. Llamar `supabase_list_tables schemas=["public"] verbose=true` y validar:
   - Tabla `public.daycares` presente.
   - Columnas y tipos exactos: `id uuid PK default gen_random_uuid()`, `name text not null`, `created_at timestamptz not null default now()`.
5. Llamar `supabase_execute_sql` con `select id, name, created_at from public.daycares` para confirmar la fila seed (`name = 'Guardería Sala Soles'`).
6. Llamar `supabase_execute_sql` para confirmar que `pg_class.relrowsecurity = true` en `daycares` y que existe la policy `daycares_select_all_temp` con `cmd = 'r'` y `roles` incluyendo `anon` y `authenticated`.
7. Llamar `supabase_get_advisors type="security"` y `type="performance"` y verificar que no aparecen issues nuevos sobre `public.daycares`.
8. Correr `npm run build` y `npm run lint` para confirmar que el spec no rompió nada en el repo (no toca código de app, pero valida la salud general).

## 4. Acceptance criteria

- [ ] `public.daycares` existe en el remoto.
- [ ] La tabla tiene exactamente 3 columnas: `id uuid`, `name text`, `created_at timestamptz`.
- [ ] `id` es PK con default `gen_random_uuid()`.
- [ ] `created_at` tiene default `now()` y es `not null`.
- [ ] RLS está activado (`relrowsecurity = true`) en `public.daycares`.
- [ ] Existe una policy `SELECT` que cubre roles `anon` y `authenticated` con `using (true)`.
- [ ] Hay exactamente 1 fila seed con `name = 'Guardería Sala Soles'`.
- [ ] `get_advisors (security)` no reporta issues nuevos referidos a `daycares`.
- [ ] `get_advisors (performance)` no reporta issues nuevos referidos a `daycares`.
- [ ] `npm run build` finaliza sin errores.
- [ ] `npm run lint` finaliza sin errores.

## 5. Decisions

- **Yes:** aplicar con MCP `apply_migration` directo al remoto. Es el flujo oficial para entorno remoto según AGENTS.md; la SQL queda registrada en el changelog de Supabase.
- **No:** Supabase CLI + `supabase/migrations/*.sql` versionados en el repo. Overhead innecesario para una sola tabla sin historial reversible; reintroducirlo cuando aparezcan migraciones que queramos revisar en PR (probablemente al llegar a `users`).
- **No:** archivos SQL locales + `apply_migration`. Doble fuente de verdad y sin CLI no hay forma real de versionarlos.
- **Yes:** policy permisiva `SELECT USING (true)` ahora. La UI necesita poder leer nombres de guarderías para mostrar contexto (header "GUARDERÍA · SALA SOLES"); sin policy, RLS activado bloquea todo.
- **No:** policies restrictivas. Sin `users` no podemos filtrar por pertenencia; bloquear todo rompe el desarrollo.
- **No:** policy `INSERT`/`UPDATE`/`DELETE` por ahora. La tabla se llena vía seed en este spec; mutaciones reales dependen de `users` y del flujo de onboarding.
- **Yes:** seed de "Guardería Sala Soles". Permite al spec-verifier validar sin pedirle al dev un INSERT manual; referencia explícita del schema de origen.
- **No:** `GRANT` explícito a `anon`/`authenticated`. La configuración del proyecto Supabase ya los gestiona; lo confirmamos con `get_advisors`.
- **No:** índice extra sobre `name`. La tabla arranca con 1 fila y no tiene queries por `name` todavía. Si crece, se justifica.

## 6. Risks

| Riesgo | Mitigación |
| --- | --- |
| La policy permisiva expone nombres de guarderías a `anon`. | Marcada como `_temp` en el nombre; debe reemplazarse cuando exista la tabla `users` y sepamos el modelo de membresía. Documentado explícitamente en Scope/Decisions. |
| `apply_migration` escribe directo al remoto y queda registrado en el changelog, no se puede deshacer desde este spec. | La operación es aditiva (CREATE TABLE + INSERT) y reversible manualmente con `DROP TABLE public.daycares`. No hay datos de producción. |
| El proyecto Supabase podría tener `public` no expuesto al Data API; si llega a serlo más adelante, la policy actual sería insuficiente para otros roles. | Verificable con `get_advisors` tras aplicar; cualquier issue aparece como linter advisory. |

## What is **not** in this spec

- Ninguna otra tabla del modelo (`users`, `rooms`, `children`, etc.) — cada una en su propio spec, en orden.
- Policies restrictivas de RLS para `daycares` — dependen de la tabla `users`.
- Triggers, funciones, ni índices adicionales.
- Cualquier cambio en código de aplicación (`app/`, `components/`, `data/`).
- Storage buckets, Auth providers, Realtime channels, Edge Functions, Vectors, Cron, Queues.
- Configuración local de Supabase CLI (`supabase init`, `config.toml`, `supabase/migrations/`).
