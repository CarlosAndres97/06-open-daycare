# SPEC 01 — Home Feed Implementation

**Status:** Implemented
**Date:** 2026-08-13
**Depends on:** —
**Author:** opencode
**Objective:** Implementar la Home estática en `/` replicando `referencias/pantallas/feed.dc.html`, sin autenticación ni base de datos.

## 1. Scope

**In scope**
- Ruta única `/` (`app/page.tsx`).
- Render estático con 3 posts hardcoded (LOGRO, ACTIVIDAD con foto, ANUNCIO) en el orden de la referencia.
- Sidebar con logo OpenDayCare, botón "Nueva publicación", nav (Feed activo / Niños / Avisos / Mi cuenta), user card "Caro Giménez · Maestra · Soles" y botón logout.
- Header: eyebrow "GUARDERÍA · SALA SOLES", título "Buenas, Caro", subtítulo "12 niños · martes 17 jun".
- CTA tile "Compartí un momento…".
- Separador "PUBLICADO HOY".
- 3 PostCards con: avatar (color + inicial), nombre, hora, "publicado por vos", badge, "Para:…", body, photo placeholder opcional, barra de reacciones (♥ + comentarios + Editar).
- Responsive: sidebar colapsa a **drawer hamburguesa** cuando viewport < 768px; main full-width en mobile.
- Tailwind 4 con tokens de tema (`@theme`) para todos los colores de marca.
- `next/font/google` cargando Fredoka (400/500/600/700) y Nunito (400–800 + italic) como CSS variables.

**Out of scope**
- Auth / login / logout real (logout se renderiza inerte).
- BD, API routes, persistencia.
- Formularios funcionales de "Nueva publicación" o "Editar".
- Otras pantallas del sidebar (ninos, avisos, mi-cuenta, detalle-publicacion, foto, login).
- i18n, dark mode, variantes de theme.
- Animaciones más allá del slide-in del drawer.

## 2. Data Model

Estructura nueva en `data/mock.ts`:

```ts
export type PostKind = "achievement" | "activity" | "announcement";

export type Post = {
  id: string;
  kind: PostKind;
  audience: string;
  childName?: string;
  time: string;
  publishedBy: string;
  body: string;
  likes: number;
  comments: number;
  photoCaption?: string;
};

export const POSTS: Post[] = [
  // 3 entradas idénticas al mock:
  // 1) LOGRO · Mateo · 14:20 · 3 ♥ · 1 💬
  // 2) ACTIVIDAD · Mateo · 09:40 · "Foto · pintando con témperas" · 5 ♥ · 2 💬
  // 3) ANUNCIO · general · 07:50 · 8 ♥ · 0 💬
];
```

Sin persistencia. Constantes puras, consumidas por el server component de `app/page.tsx`.

## 3. File Structure

```
data/
└── mock.ts                           # POSTS + tipos

components/
├── shared/                           # reutilizables (cross-page)
│   ├── Avatar.tsx                    # círculo color + inicial/icon
│   ├── Badge.tsx                     # pill base (punto + label)
│   └── Icons.tsx                     # todos los SVG icons
└── home/                             # específicos del Home (esta página)
    ├── Sidebar.tsx                   # logo + CTA + nav + user card
    ├── MobileDrawer.tsx              # wrapper con toggle + backdrop
    ├── PostCard.tsx                  # post completo
    ├── PostBadge.tsx                 # LOGRO/ACTIVIDAD/ANUNCIO (usa shared/Badge)
    ├── FeedHeader.tsx                # eyebrow + "Buenas, Caro" + subtítulo
    └── ComposerTile.tsx              # "Compartí un momento…"

app/
├── globals.css                       # tokens @theme + scrollbar
├── layout.tsx                        # next/font + lang="es"
└── page.tsx                          # arma Sidebar + feed (única ruta)
```

Convenciones:
- `app/` solo contiene rutas y sus configs (globals.css, layout.tsx, page.tsx). Nada más.
- `data/` agrupa data estática/mock consumida por las páginas.
- `components/shared/` agrupa lo reutilizable; se importará desde futuros specs.
- `components/home/` agrupa lo específico del feed; queda plano (un nivel).
- `PostBadge` se queda en `home/` hasta que otra pantalla lo necesite — usa `shared/Badge` por dentro.

## 4. Implementation Plan

Cada paso deja el sistema construible.

1. **Tokens en `app/globals.css`** — declarar dentro de `@theme`: colores (`cream`, `coral-500/600`, `sage-500/100`, `sky-500/100`, `indigo-500/100`, `beige-100/200/300`, `ink-900/700/500/300/200`) y familias (`--font-fredoka`, `--font-nunito`). Conservar `::-webkit-scrollbar*`.
2. **Fonts en `app/layout.tsx`** — importar `Fredoka, Nunito` desde `next/font/google` con subsets `latin`, weights/italics requeridos, `display: 'swap'`; inyectar las `.variable` en `className` del `<body>`; agregar `lang="es"` al `<html>`.
3. **Mock data en `data/mock.ts`** — exportar tipos `Post`, `PostKind` y constante `POSTS` con 3 entradas idénticas al mock.
4. **Icons en `components/shared/Icons.tsx`** — exportar componentes React (uno por ícono) que rendericen el SVG inline del mock con `strokeLinecap="round"`, `strokeLinejoin="round"`, mismo viewBox 24×24. Color por prop `className` o `stroke`.
5. **`Badge` en `components/shared/Badge.tsx`** — pill base (punto + label uppercase); recibe `tone` (sage/sky/indigo) y `label`; mapea a `bg-{tone}-100` + `text-{tone}-700`.
6. **`Avatar` en `components/shared/Avatar.tsx`** — círculo color + inicial/icon; props: `color` (clase bg), `initial?` (texto), `children?` (slot para íconos).
7. **`PostBadge` en `components/home/PostBadge.tsx`** — recibe `kind`; usa `shared/Badge` con label "LOGRO" / "ACTIVIDAD" / "ANUNCIO" y tono correspondiente.
8. **`PostCard` en `components/home/PostCard.tsx`** — recibe `Post`; renderiza header (avatar/nombre/hora + badge), audience, body, photo placeholder opcional (`border-dashed`, `bg-beige-100`, ícono cámara), reactions bar (`♥` filled, icono comment, spacer, "Editar").
9. **`FeedHeader` en `components/home/FeedHeader.tsx`** — eyebrow, h1 "Buenas, Caro", subtítulo "12 niños · martes 17 jun".
10. **`ComposerTile` en `components/home/ComposerTile.tsx`** — fila con avatar "C", texto placeholder "Compartí un momento…", ícono cámara.
11. **`Sidebar` en `components/home/Sidebar.tsx`** — bloques: logo (gradient sun icon + "OpenDayCare" / "Sala Soles"), botón gradient "Nueva publicación", nav (`IconHome` Feed activo, `IconUsers` Niños, `IconBell` Avisos, `IconUser` Mi cuenta), user card (avatar "C" + Caro Giménez + IconLogout). Todos `href="#"`. Hidden `<768px`.
12. **`MobileDrawer` en `components/home/MobileDrawer.tsx`** — Client Component con `useState`; botón hamburguesa fixed `top-4 left-4 z-50` (visible `<768px`); al abrir renderiza `<Sidebar>` en `position: fixed inset-y-0 left-0 w-[248px]` con backdrop `bg-black/30` que cierra al click; transition `transform 200ms`.
13. **`app/page.tsx`** — Server Component que monta `<MobileDrawer>` + `<main>` con `<FeedHeader>`, `<ComposerTile>`, divider "PUBLICADO HOY" y `POSTS.map(p => <PostCard key={p.id} {...p} />)`.
14. **Lint + build + visual** — `npm run lint`, `npm run build`, abrir a 1280px y 375px en Playwright; comparar con el mock.

## 5. Acceptance Criteria

- [x] `npm run build` sin errores.
- [x] `npm run lint` sin errores.
- [x] `npm run dev` renderiza `/` sin warnings ni errores en consola.
- [x] Side-by-side a 1280px entre `/` y `referencias/pantallas/feed.dc.html`: mismas secciones, mismo orden, mismos textos, mismos colores.
- [x] Badges en orden: LOGRO (verde sage), ACTIVIDAD (azul sky), ANUNCIO (azul indigo).
- [x] Todos los links (sidebar, CTA tile, "Editar") tienen `href="#"` y no navegan ni producen 404.
- [x] Tipografías: computed style de `<h1>` muestra Fredoka; computed style de `<body>` muestra Nunito.
- [x] A < 768px: sidebar oculto, hamburguesa visible fixed; click abre drawer con sidebar completo; click en backdrop cierra.
- [x] Background `#F6ECDF`, cards `#FFFDF9` con borde `#ECE0D0`.
- [x] `app/` solo contiene rutas y configs (page.tsx, layout.tsx, globals.css) — sin data, sin components.
- [x] Estructura final coincide con el árbol descrito en §3.

## 6. Decisions Taken and Discarded

| # | Decisión | Alternativa descartada | Por qué |
|---|---|---|---|
| 1 | Mock en `data/mock.ts` (raíz) | Inline en `page.tsx` | Respuesta más reciente del usuario prevalece; mejor separación de responsabilidades. |
| 2 | Componentes en `components/` (raíz) con `shared/` y `home/` planos | `app/_components/` co-located | `app/` se reserva para rutas y sus configs; convención estándar de Next.js. |
| 3 | Todos los links `href="#"` | 404 nativo o stubs | Lo más simple; futuros specs crearán esas rutas. |
| 4 | Tailwind 4 + tokens semánticos | Mantener `style=""` inline | Idiomático del stack y mejor mantenibilidad. |
| 5 | `next/font/google` | `<link>` Google Fonts CDN | Sin layout shift; idiomático Next.js 16. |
| 6 | Drawer hamburguesa en mobile | Bottom tab bar o sidebar siempre visible | Mantiene el contenido del sidebar idéntico al template. |
| 7 | Copys en español literales | Traducir | El producto está en español; fidelidad con la referencia. |
| 8 | `home/` plano (sin anidar por área) | `home/sidebar/`, `home/post/`, `home/feed/` | Solo 6 componentes; over-engineering anidar. |
| 9 | `PostBadge` solo en `home/` | Subirlo a `shared/` | Específico del feed hoy; se moverá cuando otra pantalla lo necesite. |
| 10 | Sin subcarpeta por tipo (atomic design) | `atoms/molecules/organisms` | Una sola capa de UI; over-engineering para 4–5 componentes. |

## 7. Identified Risks

- **Drift pixel-perfect:** la referencia usa inline styles en px; mapear a utilities de Tailwind puede introducir diferencias de ~1–2px. *Mitigación:* screenshot side-by-side a 1280px antes de mergear.
- **Hamburguesa solapa CTA en mobile** si el main no tiene top padding suficiente. *Mitigación:* posición fija `top-4 left-4 z-50`; CTA con `pt-14` en mobile.
- **Variables de fuente en `@theme`:** Tailwind 4 puede exigir declarar `fontFamily.fredoka` / `fontFamily.nunito` en `theme.extend` en vez de CSS crudo. *Mitigación:* verificar en el paso 1; si no las toma, mover a `theme.extend.fontFamily`.
- **Subcarpetas bajo `components/` (raíz):** ya no hay riesgo de routing accidental porque nada bajo `app/` es compartido. *Mitigación:* aun así, ningún componente debe llamarse `page.tsx` para evitar que Next.js lo confunda con una ruta.
- **Hydration mismatch** si el drawer renderiza distinto en server/client. *Mitigación:* `MobileDrawer` lleva `"use client"`; el resto de la página es server component puro.

## 8. Quick Definition Note

Phase 2 se corrió en dos tandas (5 preguntas iniciales + 1 aclaración post-imagen + 2 ajustes de estructura). Phase 3 se condensó en una sola pasada porque las respuestas de las tandas siguientes cerraron las ambigüedades restantes. Sin re-preguntas adicionales.