# SPEC 03 — Login & Active Account

**Status:** Approved
**Date:** 2026-08-16
**Depends on:** SPEC 01
**Author:** opencode
**Objective:** Implementar las pantallas estáticas de autenticación en `/login` y `/active-account` replicando `referencias/pantallas/login.dc.html` y `referencias/pantallas/activar-cuenta.dc.html`, con formularios controlados (useState), validación inline y loader simulado, sin backend ni sesión real.

## 1. Scope

**In scope**

- Ruta `/login` (`app/login/page.tsx`) — pantalla de inicio de sesión, dos columnas en desktop, apilada en mobile.
- Ruta `/active-account` (`app/active-account/page.tsx`) — pantalla de activación de cuenta por invitación, una sola columna centrada.
- Componentes nuevos en `components/auth/`:
  - `BrandPanel` (panel naranja con logo, headline y footer de la guardería).
  - `LoginForm` (email + password + forgot password + submit).
  - `ActivateForm` (código de invitación + email + password + checkbox de autorización + submit).
- Inputs controlados con `useState` en ambos forms (email, password, código, autorización).
- Validación inline por campo: email formato, password ≥ 6 chars, código = 5 chars.
- Estado de submit: `idle` → `loading` (simulado 800 ms) → `router.push("/")`.
- Tokens nuevos en `app/globals.css`: `--color-warning-100`, `--color-warning-700`, `--color-success-500`.
- Nuevo ícono `IconCheck` en `components/shared/Icons.tsx`.
- Sin sidebar / drawer: las dos pantallas son standalone (no usan chrome).
- Mobile: `/login` apila BrandPanel (versión compacta) arriba y LoginForm debajo.
- Tailwind 4 con tokens semánticos; copy en español literal al mock.

**Out of scope**

- Auth real con backend, JWT, cookies, server sessions, middleware.
- Persistencia de sesión (no localStorage, no cookies).
- Pantalla / flujo de "olvidaste tu contraseña" (sólo el link visible, no navega).
- Pantalla de error / 404 / 500.
- Pantalla específica para familia (`familia-feed.dc.html` de la referencia); activar cuenta redirige a `/` (feed staff existente).
- Animaciones más allá de `transition: 150ms` en submit y `focus:border` en inputs.
- i18n, dark mode.
- Listas de invitaciones pre-pobladas desde backend; los datos vienen hardcoded en los componentes.

## 2. Data Model

Sin archivo de mock. Los datos se hardcodean dentro de cada componente.

Constantes en `components/auth/LoginForm.tsx`:

```ts
const DEFAULT_EMAIL = "caro@opendaycare.com";
```

Estado del form (declarado local con `useState`):

```ts
type LoginFormState = {
  email: string;
  password: string;
  errors: { email?: string; password?: string };
  submitting: boolean;
};
```

Constantes en `components/auth/ActivateForm.tsx`:

```ts
const DEFAULT_CODE = "7K4P9";
const DEFAULT_EMAIL = "lucia.fernandez@gmail.com";
const DEFAULT_PASSWORD = "contraseña";
const DEFAULT_AUTHORIZED = true;

const INVITED_CHILD = {
  name: "Mateo",
  room: "Sala Soles",
  initial: "M",
  avatarColor: "bg-sky-300",
  avatarTextColor: "text-sky-900",
};
```

Estado del form (declarado local con `useState`):

```ts
type ActivateFormState = {
  code: string;
  email: string;
  password: string;
  authorized: boolean;
  errors: { code?: string; email?: string; password?: string; authorized?: string };
  submitting: boolean;
};
```

Sin persistencia. Los `DEFAULT_*` son sólo valores iniciales; el usuario puede editarlos.

## 3. File Structure

```
app/
├── globals.css                          # MOD: +tokens warning-100/700, success-500
├── layout.tsx                           # sin cambios
├── login/
│   └── page.tsx                         # NUEVO: monta BrandPanel + LoginForm
└── active-account/
    └── page.tsx                         # NUEVO: monta ActivateForm

components/
├── shared/
│   └── Icons.tsx                        # MOD: +IconCheck
└── auth/                                # NUEVO: namespace auth
    ├── BrandPanel.tsx                   # NUEVO: panel naranja reutilizable
    ├── LoginForm.tsx                    # NUEVO: client component, useState
    └── ActivateForm.tsx                 # NUEVO: client component, useState
```

Convenciones heredadas:

- `app/` solo contiene rutas y configs.
- `components/shared/` reusable cross-page.
- `components/auth/` plano (un nivel), paralelo a `home/` y `children/`.
- Forms como Client Components (`"use client"`); `page.tsx` como Server Components sin estado.

## 4. Implementation Plan

Cada paso deja el sistema construible.

1. **Tokens en `app/globals.css`** — sumar dentro de `@theme`:
   - `--color-warning-100: #FBF1D6` y `--color-warning-700: #8A7234` (caja y texto del checkbox de autorización).
   - `--color-success-500: #5FB97E` (fondo del check verde).
2. **Icon en `components/shared/Icons.tsx`** — agregar `IconCheck` (checkmark: `<polyline points="20 6 9 17 4 12" />` con `strokeWidth={3}`).
3. **`BrandPanel` en `components/auth/BrandPanel.tsx`** — props `{ compact?: boolean; className?: string }`:
   - Wrapper `relative overflow-hidden bg-gradient-to-br from-coral-300 via-coral-400 to-coral-600 text-white flex flex-col justify-between`.
   - Padding `p-14` en desktop, `py-8 px-6` cuando `compact`.
   - Dos blobs decorativos `absolute rounded-full bg-white/12` (420×420 top-right) y `bg-white/10` (300×300 bottom-left) en desktop; ocultos (`hidden`) cuando `compact`.
   - Header: cuadrado `w-[46px] h-[46px] rounded-[14px] bg-white/22 flex items-center justify-center` con `IconSun` 26×26 `strokeWidth={2.2}`; texto "OpenDayCare" (`font-fredoka font-semibold text-[21px] tracking-[0.5px]`).
   - Headline: h1 "El día de cada niño, compartido con su familia." (`font-fredoka font-semibold text-[42px] leading-[1.12]`, en `compact` se reduce a `text-[28px]`); subtítulo `text-[17px] leading-[1.6] max-w-[430px] text-white/92`.
   - Footer: "🌿 Guardería Sala Soles" (`text-[14px] text-white/90`, en `compact` `text-[13px]`).
4. **`LoginForm` en `components/auth/LoginForm.tsx`** — Client Component con `useState<LoginFormState>`:
   - Container `w-full max-w-[392px]`.
   - h2 "Iniciar sesión" (`font-fredoka font-semibold text-[30px] text-ink-900 mb-1.5`); subtítulo "Ingresá para ver el día de hoy." (`text-ink-300 text-[15px] mb-7`).
   - Sin el bloque "INGRESO COMO" ni los botones Personal/Familia (decisión del usuario).
   - Label "EMAIL" (`text-ink-300 text-[12px] font-extrabold tracking-[0.7px] mb-2`); input controlado `value=email`, `onChange`, `type="email"`, default `DEFAULT_EMAIL`, estilo `w-full py-3.5 px-4 rounded-[14px] border-[1.5px] border-beige-200 bg-white text-[15px] text-ink-900 focus:border-coral-400 outline-none`; debajo mensaje de error `text-coral-700 text-[12.5px] mt-1` cuando `errors.email`.
   - Label "CONTRASEÑA" + input `type="password"` placeholder `••••••••`; mismo estilo y error.
   - Link "¿Olvidaste tu contraseña?" alineado a la derecha (`text-coral-900 text-[13.5px] font-extrabold cursor-pointer`, `href="#"`, no navega).
   - Submit button (`<button type="submit">`) `w-full py-[15px] rounded-[15px] bg-gradient-to-b from-coral-500 to-coral-600 text-white font-extrabold text-[16px] shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)] disabled:bg-coral-700/80 disabled:cursor-not-allowed`; texto "Iniciar sesión" o "Ingresando…" cuando `submitting`.
   - Footer "¿Te invitó la guardería? Activá tu cuenta" (`text-ink-300 text-[14.5px] mt-6 text-center`); link `text-coral-900 font-extrabold` con `href="/active-account"`.
   - Handler `handleSubmit`: `e.preventDefault()`; valida email con `/^.+@.+\..+$/` y password `length >= 6`; si hay errores los setea y `return`; si todo OK: `setSubmitting(true)` → `setTimeout(800ms)` → `router.push("/")`.
5. **`ActivateForm` en `components/auth/ActivateForm.tsx`** — Client Component con `useState<ActivateFormState>`:
   - Container `w-full max-w-[440px]`.
   - Logo superior: cuadrado `w-[58px] h-[58px] rounded-[18px] bg-gradient-to-br from-coral-300 to-coral-400 flex items-center justify-center mb-5.5 shadow-[0_12px_26px_-10px_rgba(238,129,100,0.65)]` con `IconSun` blanco 30×30 `strokeWidth={2.2}`.
   - h1 "Bienvenida a OpenDayCare" (`font-fredoka font-semibold text-[32px] leading-[1.15] text-ink-900`); subtítulo `text-ink-300 text-[15.5px] leading-[1.55] mb-6`.
   - Card invitación: `bg-cream-soft border border-beige-200 rounded-2xl p-3.5 flex items-center gap-3.5 mb-5.5`; `<Avatar color={INVITED_CHILD.avatarColor} className={INVITED_CHILD.avatarTextColor} initial={INVITED_CHILD.initial} size={44} />` + columna con label "Te invitaron a seguir a" (`text-ink-300 text-[13px]`) + nombre "Mateo · Sala Soles" (`font-fredoka font-semibold text-[17px] text-ink-900`).
   - Label "CÓDIGO DE INVITACIÓN" + input controlado `value=code`, default `DEFAULT_CODE`, estilo estándar + `font-family: var(--font-fredoka); letter-spacing: 3px; font-weight: 700; font-size: 18px`; valida `length === 5`.
   - Label "EMAIL" + input email (default `DEFAULT_EMAIL`); valida formato.
   - Label "CREAR CONTRASEÑA" + input password (default `DEFAULT_PASSWORD`); valida `length >= 6`.
   - Checkbox autorización: `<label>` `bg-warning-100 rounded-2xl p-3.5 flex items-start gap-3 cursor-pointer mb-6`; slot circular `bg-success-500 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5` con `IconCheck` 15×15 `strokeWidth={3}` blanco; texto "Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app." (`text-warning-700 text-[14px] leading-[1.45]`); `<input type="checkbox" className="sr-only">` controlado que `toggle` cambia `authorized`; el slot visual alterna `bg-success-500` con `IconCheck` cuando `authorized` o `bg-beige-200` vacío cuando `!authorized`; valida `true`.
   - Submit button "Activar mi cuenta" (mismo estilo coral que login); texto "Activar mi cuenta" o "Activando…".
   - Footer "¿Ya tenés cuenta? Iniciar sesión" (`text-ink-300 text-[14.5px] mt-5.5 text-center`); link `text-coral-900 font-extrabold` con `href="/login"`.
   - Handler `handleSubmit`: valida 4 campos; si OK: `setSubmitting(true)` → `setTimeout(800ms)` → `router.push("/")`.
6. **`app/login/page.tsx`** — Server Component; container `min-h-screen bg-cream flex flex-col lg:grid lg:grid-cols-[1.05fr_1fr]`:
   - `<BrandPanel className="hidden lg:flex" />` — sólo desktop.
   - `<main className="flex-1 flex items-center justify-center p-10">` con `<LoginForm />`.
   - En mobile: `<BrandPanel compact className="flex lg:hidden" />` antes del `<main>`.
7. **`app/active-account/page.tsx`** — Server Component; container `min-h-screen bg-cream flex items-center justify-center p-10` con `<ActivateForm />`.
8. **Lint + build + visual** — `npm run lint`, `npm run build`, abrir `/login` y `/active-account` a 1280px y 375px en Playwright; comparar con las referencias.

## 5. Acceptance Criteria

- [ ] `npm run build` sin errores.
- [ ] `npm run lint` sin errores.
- [ ] `npm run dev` renderiza `/login` y `/active-account` sin warnings ni errores en consola.
- [ ] Side-by-side a 1280px entre `/login` y `referencias/pantallas/login.dc.html`: mismas secciones, mismo orden, mismos textos, mismos colores (sin los botones Personal/Familia).
- [ ] Side-by-side a 1280px entre `/active-account` y `referencias/pantallas/activar-cuenta.dc.html`: mismas secciones, mismo orden, mismos textos, mismos colores.
- [ ] El login NO muestra los botones "Personal" ni "Familia"; el bloque "INGRESO COMO" tampoco se renderiza.
- [ ] Inputs controlados: al tipear en cualquier input, el estado de React se actualiza (visible en React DevTools).
- [ ] Validación inline: email vacío → "Ingresá tu email"; email sin `@` → "Email inválido"; password < 6 chars → "Mínimo 6 caracteres"; código ≠ 5 chars → "El código tiene 5 caracteres"; checkbox desactivado → "Necesitamos tu autorización".
- [ ] Submit inválido: no avanza, no hace `router.push`, no muestra loading.
- [ ] Submit válido: muestra "Ingresando…" / "Activando…" durante ~800 ms, luego navega a `/`.
- [ ] Checkbox autorización arranca en `true`; click alterna a `false` (slot se vacía, sin check); click otra vez a `true`.
- [ ] Links funcionan: "¿Olvidaste tu contraseña?" → `#`; "Activá tu cuenta" → `/active-account`; "Iniciar sesión" → `/login`.
- [ ] A < 768px en `/login`: brand panel colapsa a header compacto (logo + tagline corto) encima del form; en desktop el panel ocupa la columna izquierda completa.
- [ ] Tipografías: h1/h2 usa Fredoka; el resto usa Nunito.
- [ ] Background `#F6ECDF` (cream) en ambas pantallas.
- [ ] Inputs email/password tienen `bg-white` + `border-beige-200` + `rounded-[14px]` + `py-3.5 px-4`.
- [ ] Botón submit primario: gradient coral-500→coral-600 + shadow `0_10px_22px_-8px_rgba(238,129,100,0.7)` + texto blanco font-extrabold 16px.
- [ ] Estructura final coincide con el árbol descrito en §3.

## 6. Decisions Taken and Discarded

| # | Decisión | Alternativa descartada | Por qué |
|---|---|---|---|
| 1 | Rutas `/login` y `/active-account` | `/iniciar-sesion` y `/activar-cuenta` (español) | Decisión explícita del usuario. Mantiene la convención inglés en URLs de spec 01. |
| 2 | Namespace `components/auth/` | `components/account/` o `components/onboarding/` | Decisión explícita del usuario. "Auth" es el dominio estándar; "account" queda en la ruta `/active-account`. |
| 3 | Inputs controlados con `useState` y validación inline | Form inerte (specs 01/02) | Decisión explícita del usuario. Aporta feedback visual sin meter backend. |
| 4 | `setTimeout` 800 ms para simular loading | Spinner inmediato sin delay | Da tiempo a ver el estado "loading" antes del navigate; realismo sin backend. |
| 5 | Ambos forms redirigen a `/` luego de submitir | Login → `/`; Activar → `/familia-feed` (inexistente) | No existe feed de familia aún; redirect a `/` evita 404. Spec futuro creará `/familia-feed` y refactorizará. |
| 6 | Namespace `components/auth/` plano | Una sola carpeta con `LoginForm` y `ActivateForm` adentro | Solo 3 componentes; spec 01 ya eligió plano para `home/`. |
| 7 | Tokens nuevos `warning-100/700`, `success-500` | Inline styles `style={{ background: '#FBF1D6' }}` | Mantiene la sistemática de tokens semánticos del proyecto; fidelidad al mock sin perder mantenibilidad. |
| 8 | `BrandPanel` como componente reusable | Inline en `app/login/page.tsx` | Reusable en un futuro `/register` u otra pantalla de auth; sigue el patrón de `FeedHeader` en spec 01. |
| 9 | Password placeholder `••••••••` | Sin placeholder | El mock original lo tiene; fidelidad. |
| 10 | Avatar "Mateo" usando `Avatar` shared | Avatar inline | Spec 01 ya tiene `Avatar` con `color` + `initial`; reusar evita duplicación. |
| 11 | Validación inline (mensaje debajo del input) | Tooltip / toast | Tooltip se solapa con el siguiente input; toast requiere provider. Inline es lo más simple y descubrible. |
| 12 | Submit handler con `router.push("/")` desde `next/navigation` | `window.location.href = "/"` | `router.push` usa client-side navigation; más rápido y respeta `<Link>` semantics. |
| 13 | Nuevo ícono `IconCheck` (polyline) | Reutilizar otro ícono | No existe check en `Icons.tsx`; el mock lo usa explícitamente. |
| 14 | No guardar los inputs en localStorage | Persistir entre refreshes | Spec 01/02 son inertes; esta vuelta introduce estado pero no persiste (decisión de scope). |
| 15 | Checkbox autorización como `<input type="checkbox" className="sr-only">` + slot visual | Custom checkbox con valor propio | Accesibilidad por defecto (lectores de pantalla, teclado); el slot visual es puramente decorativo. |

## 7. Identified Risks

- **Drift pixel-perfect:** la referencia usa inline styles en px; mapear a utilities de Tailwind puede introducir diferencias de ~1–2px. *Mitigación:* screenshot side-by-side a 1280 px antes de mergear.
- **Mobile `/login` no explícito en la referencia:** la interpretación "apilar columnas" es asumir. *Mitigación:* screenshot a 375 px para confirmar visualmente; iterar si el panel compacto queda mal.
- **Sin token de invitación real:** cualquier usuario puede intentar `/active-account`. *Mitigación:* documentado en §6 #5; un spec futuro creará el endpoint y middleware de auth.
- **Validación sólo en cliente:** no protege de payloads malformados. *Mitigación:* sin backend, no aplica; spec futuro sumará server-side validation.
- **`setTimeout` en handler:** si el componente se unmounta antes de cumplirse, `router.push` opera sobre la página actual de todas formas. *Mitigación:* aceptar el riesgo; en este spec no hay cleanup necesario porque las dos páginas no tienen otro estado que pueda quedar inconsistente.
- **focus state de los inputs:** la referencia no define focus styling. *Mitigación:* agregar `focus:border-coral-400` para accesibilidad; no afecta fidelidad.
- **Color de fondo de login:** el HTML de la referencia usa `#FBF4EC`; el token `cream` del proyecto es `#F6ECDF`. *Mitigación:* usar `bg-cream` para coherencia con specs 01/02; documentado en §6 (decisión implícita de coherencia).
- **Hydration de inputs controlados:** si el `defaultValue` cambia entre server y client, podría haber mismatch. *Mitigación:* los `DEFAULT_*` son constantes puras; no hay acceso a `window` ni `Date`. Forms con `"use client"` no se prerenderizan con valores en SSR más allá del initial state.

## 8. Quick Definition Note

Phase 2 se resolvió en una sola tanda de 5 preguntas. Decisiones del usuario que cambiaron defaults propuestos:

- Rutas en inglés (`/login`, `/active-account`) en lugar de `/iniciar-sesion` y `/activar-cuenta`.
- Inputs controlados con `useState` (en specs 01/02 los inputs eran inertes).
- Redirigir a `/` desde `/active-account` (no existe feed de familia todavía).
- Layout mobile apilado (no esconder el brand panel).
- Namespace `components/auth/` con `LoginForm`, `ActivateForm`, `BrandPanel`.

Phase 3 se redactó en una sola pasada porque no quedaron ambigüedades tras esas respuestas.
