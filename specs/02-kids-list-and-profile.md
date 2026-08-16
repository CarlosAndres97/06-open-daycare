# SPEC 02 — Kids List and Profile UI

**Status:** Approved
**Date:** 2026-08-15
**Depends on:** SPEC 01
**Author:** opencode
**Objective:** Implementar las pantallas estáticas de gestión de niños (lista en `/kids` y perfil en `/kids/[id]`) replicando `referencias/pantallas/ninos.dc.html` y `referencias/pantallas/perfil-nino.dc.html`, sin lógica de negocio ni persistencia.

## 1. Scope

**In scope**
- Ruta `/kids` (`app/kids/page.tsx`) — lista de 8 niños con búsqueda visual, agrupados por sala.
- Ruta `/kids/[id]` (`app/kids/[id]/page.tsx`) — perfil del niño con hero, alerta de alergias, info card, acción primaria y lista de padres vinculados.
- Refactor `components/home/Sidebar.tsx` para aceptar prop `activeKey` y soportar el item "Niños" activo en las nuevas rutas.
- `MobileDrawer` reusado en las dos rutas, igual que en `/`.
- Componentes nuevos en `components/children/`:
  - `ChildrenHeader` (eyebrow "GESTIÓN" + h1 "Niños" + CTA "Agregar niño")
  - `ChildrenSearch` (input inerte)
  - `ChildCard` (card de la grilla)
  - `ChildProfileHero` (header del perfil)
  - `AllergyAlert` (caja peach)
  - `ChildInfoCard` (tabla de info)
  - `ParentList` (card de padres)
  - `ParentListItem` (item con badge de estado)
  - `LinkParentRow` (cta "Vincular otro padre")
- Nuevos tonos en `components/shared/Badge.tsx`: `coral-soft`, `pink`, `yellow`.
- Nuevos íconos en `components/shared/Icons.tsx`: `IconSearch`, `IconChevronLeft`, `IconChevronRight`, `IconAlert`.
- Nuevos tokens de color en `app/globals.css` para los tres tonos nuevos.
- Mock data hardcoded dentro de cada `page.tsx` (sin archivo `data/children.ts`).
- Tailwind 4 con tokens semánticos; copy en español literal al mock.

**Out of scope**
- Auth, login, logout real.
- BD, API routes, persistencia.
- Formularios funcionales (buscar, agregar, editar, vincular).
- Otras rutas del sidebar (avisos, mi-cuenta, crear-publicacion).
- Acciones "Agregar niño", "Editar", "Vincular", "Resumen del día" — `href="#"` (placeholders).
- i18n, dark mode.
- Animaciones más allá del slide-in del drawer.

## 2. Data Model

Sin archivo de mock separado. Los datos viven dentro de cada `page.tsx` como objetos literales.

Tipos (declarados localmente en cada archivo):

```ts
type ChildBadge =
  | { kind: "allergy"; label: string }
  | { kind: "link"; label: "VINCULAR" };

type Child = {
  id: string;
  name: string;
  initial: string;
  avatarColor: string;      // bg class, p. ej. "bg-sky-300"
  avatarTextColor: string;  // text class, p. ej. "text-sky-900"
  age: number;
  parentsLinked: number | "none";
  badge?: ChildBadge;
};

type Parent = {
  id: string;
  name: string;
  initial: string;
  avatarColor: string;
  role: "Mamá" | "Papá" | "Tutor";
  status: "active" | "pending";
};
```

Constantes en `app/kids/page.tsx`:
- `CHILDREN: Child[]` con 8 entradas idénticas al mock (Mateo, Sofía, Benjamín, Valentina, Tomás, Emma, Lucas, Olivia).
- Tres niños con badges: Mateo (MANÍ), Valentina (VINCULAR), Tomás (LACTOSA); los demás muestran chevron.
- Los `parentsLinked` siguen el texto español del mock: `"2 padres vinculados"`, `"1 padre vinculado"`, `"sin padres vinculados"`.

Constantes en `app/kids/[id]/page.tsx`:
- `PROFILE: Child` con los datos del niño activo (Mateo).
- `ALLERGY: string` con el texto `"Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila."`.
- `PROFILE_INFO: { birthDate, classroom, joinedAt }` con strings `"12 mar 2022"`, `"Soles"`, `"feb 2025"`.
- `PARENTS: Parent[]` con 2 entradas (Lucía ACTIVA, Diego PENDIENTE).

Sin persistencia. Datos consumidos por los server components de cada `page.tsx`.

## 3. File Structure

```
app/
├── globals.css                          # MOD: +tokens coral-soft-100/700, pink-100/700, yellow-100/700
├── layout.tsx                           # sin cambios
├── page.tsx                             # MOD: pasa activeKey="feed" a Sidebar
└── kids/
    ├── page.tsx                         # NUEVO: lista
    └── [id]/
        └── page.tsx                     # NUEVO: perfil

components/
├── shared/
│   ├── Avatar.tsx                       # sin cambios
│   ├── Badge.tsx                        # MOD: +tones coral-soft, pink, yellow
│   └── Icons.tsx                        # MOD: +IconSearch, IconChevronLeft, IconChevronRight, IconAlert
├── home/
│   ├── Sidebar.tsx                      # MOD: prop activeKey
│   ├── MobileDrawer.tsx                 # sin cambios
│   └── ... (resto sin cambios)
└── children/                            # NUEVO: namespace dominio niños
    ├── ChildrenHeader.tsx
    ├── ChildrenSearch.tsx
    ├── ChildCard.tsx
    ├── ChildProfileHero.tsx
    ├── AllergyAlert.tsx
    ├── ChildInfoCard.tsx
    ├── ParentList.tsx
    ├── ParentListItem.tsx
    └── LinkParentRow.tsx
```

Convenciones heredadas de spec 01:
- `app/` solo rutas y configs.
- `components/shared/` reusable cross-page.
- `components/children/` plano (sin anidar por componente), paralelo a `home/`.
- Mock data hardcoded en `page.tsx` (decisión explícita del usuario; no se crea `data/children.ts`).

## 4. Implementation Plan

Cada paso deja el sistema construible.

1. **Tokens en `app/globals.css`** — sumar dentro de `@theme`:
   - `--color-coral-soft-100: #FBD8CC` y `--color-coral-soft-700: #D9684A` (peach).
   - `--color-pink-100: #F9D2DE` y `--color-pink-700: #C56486`.
   - `--color-yellow-100: #F7E7A6` y `--color-yellow-700: #9A7B1E`.
2. **Icons en `components/shared/Icons.tsx`** — agregar:
   - `IconSearch` (magnifying glass: circle + line).
   - `IconChevronLeft` (path `m15 18-6-6 6-6`).
   - `IconChevronRight` (path `m9 18 6-6-6-6`).
   - `IconAlert` (triangle warning con `!` y `.`).
3. **`Badge` en `components/shared/Badge.tsx`** — extender `Tone` con `coral-soft`, `pink`, `yellow` y mapear a `bg-{tone}-100` + `text-{tone}-700`.
4. **Refactor `Sidebar`** — aceptar prop `activeKey: "feed" | "ninos" | "avisos" | "mi-cuenta"` con default `"feed"`; reemplazar el `active: true` hardcoded por `active: key === activeKey`.
5. **`app/page.tsx`** — pasar `activeKey="feed"` a Sidebar (mantiene el comportamiento anterior).
6. **`ChildrenHeader`** — fila flex con eyebrow "GESTIÓN" (`text-coral-700 text-[12.5px] font-extrabold tracking-[0.8px]`), h1 "Niños" (`font-fredoka font-semibold text-[30px]`), CTA "Agregar niño" (gradient coral + `IconPlus`) con `href="#"`.
7. **`ChildrenSearch`** — input con `IconSearch` 18×18 a la izquierda (`stroke-ink-100`), placeholder "Buscar niño…", contenedor `bg-cream-soft border border-beige-200 rounded-[14px] py-3 px-4`.
8. **`ChildCard`** — props `child: Child`; renderiza `<Avatar>` + `name` (`font-fredoka font-semibold text-[16px]`) + descripción `"X años · Y padres vinculados"` + slot condicional (`<Badge tone="coral-soft" label="MANÍ" />` para allergy, badge pink para link, `IconChevronRight` por defecto). Hover: `border-color: #F2A78E; transform: translateY(-2px); transition: .15s` (variantes `hover:` de Tailwind).
9. **`app/kids/page.tsx`** — Server Component; arma `<MobileDrawer>` + `<Sidebar activeKey="ninos" />` + `<main>` con `max-w-[880px]`, orden: `ChildrenHeader` → `ChildrenSearch` → divider "SALA SOLES · 8 niños" (`beige-100` eyebrow + `ink-200` count + `beige-400` line) → grilla `grid-cols-2 gap-3.5` con `CHILDREN.map(c => <ChildCard key={c.id} child={c} />)`. Cada card es `<a href="/kids/{c.id}">`.
10. **`ChildProfileHero`** — props `child: Child`; avatar 84×84 (`bg-sky-300` colour map), h1 (`font-fredoka font-semibold text-[28px]`), subtítulo `"X años · Sala Soles"`, botón "Editar" (`border border-beige-200 bg-cream-soft text-ink-500 px-4 py-2 rounded-xl`) `href="#"`.
11. **`AllergyAlert`** — props `text: string`; caja `bg-beige-100 rounded-2xl p-4` con icono `<div class="w-10 h-10 rounded-[11px] bg-coral-400 flex items-center justify-center"><IconAlert class="text-white" /></div>` + label "Alergias y notas" (`text-coral-700 font-extrabold`) + descripción (`text-coral-700/80`).
12. **`ChildInfoCard`** — props `info: { birthDate, classroom, joinedAt }`; card `bg-cream-soft border border-beige-200 rounded-2xl overflow-hidden` con tres filas separadas por `border-b border-beige-500` (la última sin borde); cada fila es `flex justify-between py-4 px-[18px]` con label `text-ink-300` + value `text-ink-900 font-extrabold`.
13. **`ParentListItem`** — props `parent: Parent`; `<Avatar size={40}>` + nombre + `"role · status label"` + `<Badge>` condicional (`sage` "ACTIVA" para active, `yellow` "PENDIENTE" para pending).
14. **`LinkParentRow`** — slot circular `border border-dashed border-beige-300` 40×40 + `IconPlus` `text-ink-100` + texto "Vincular otro padre" `text-coral-900 font-extrabold text-[14.5px]`. Es `<a href="#">`.
15. **`ParentList`** — props `parents: Parent[]`; card `bg-cream-soft border border-beige-200 rounded-2xl p-4` con eyebrow "PADRES VINCULADOS" (`text-ink-400 text-[12.5px] font-extrabold tracking-[0.8px]`) + columna `flex flex-col gap-3.5` con `parents.map(p => <ParentListItem key={p.id} parent={p} />)` + `<LinkParentRow>` al final.
16. **`app/kids/[id]/page.tsx`** — Server Component; usa `<MobileDrawer>` + `<Sidebar activeKey="ninos" />`; arma `<main>` `max-w-[820px]` con back link "Volver a Niños" (`href="/kids"`) + grid `flex flex-wrap gap-6 items-start` con columna izquierda (`flex-1 min-w-[300px] flex-col gap-4`): `<ChildProfileHero>` → `<AllergyAlert>` → `<ChildInfoCard>`; columna derecha (`w-[300px] flex-none flex-col gap-3.5`): botón "Resumen del día" (`bg-ink-900 text-white rounded-2xl py-3 w-full font-extrabold text-[15px] flex items-center justify-center gap-2` con `IconSun`) `href="#"` + `<ParentList>`.
17. **Lint + build + visual** — `npm run lint`, `npm run build`, abrir `/kids` y `/kids/mateo` a 1280px y 375px en Playwright; comparar con las referencias.

## 5. Acceptance Criteria

- [ ] `npm run build` sin errores.
- [ ] `npm run lint` sin errores.
- [ ] `npm run dev` renderiza `/kids` y `/kids/mateo` sin warnings ni errores en consola.
- [ ] Sidebar muestra item "Niños" activo (`bg-beige-100 text-coral-700 font-extrabold`) en `/kids` y `/kids/[id]`.
- [ ] Sidebar muestra item "Feed" activo en `/` (sin regresión).
- [ ] Side-by-side a 1280px entre `/kids` y `referencias/pantallas/ninos.dc.html`: mismas secciones, mismo orden, mismos textos, mismos colores.
- [ ] Side-by-side a 1280px entre `/kids/mateo` y `referencias/pantallas/perfil-nino.dc.html`: mismas secciones, mismo orden, mismos textos, mismos colores.
- [ ] Los 8 niños renderizan con sus avatares (color + inicial), edad, contador de padres y badges correctos (Mateo MANÍ, Valentina VINCULAR, Tomás LACTOSA; los demás chevron).
- [ ] `ChildCard` hover (`hover:`): `border-color: #F2A78E` + `translateY(-2px)`.
- [ ] Search input es visual (`<input>` sin handler), no filtra la lista al tipear.
- [ ] Back link "Volver a Niños" navega a `/kids`.
- [ ] Badges del perfil: Lucía badge "ACTIVA" (sage), Diego badge "PENDIENTE" (yellow).
- [ ] Todos los links a rutas inexistentes (`Agregar niño`, `Editar`, `Resumen del día`, `Vincular otro padre`) tienen `href="#"` y no navegan ni 404.
- [ ] A < 768px: sidebar oculto, hamburguesa visible, drawer funciona idéntico a `/`.
- [ ] Tipografías: h1 usa Fredoka; el resto usa Nunito.
- [ ] Background `#F6ECDF`, cards `#FFFDF9` con borde `#ECE0D0`.
- [ ] Estructura final coincide con el árbol descrito en §3.
- [ ] No se introdujo `data/children.ts`; los datos viven dentro de cada `page.tsx`.

## 6. Decisions Taken and Discarded

| # | Decisión | Alternativa descartada | Por qué |
|---|---|---|---|
| 1 | Rutas `/kids` y `/kids/[id]` (inglés) | `/ninos` y `/ninos/perfil/[id]` (español) | Decisión explícita del usuario. Se conserva en inglés solo en la URL; componentes, copys y tokens siguen en español. |
| 2 | Mock data hardcoded en cada `page.tsx` | Archivo `data/children.ts` | Decisión explícita del usuario. Trade-off: menos archivos vs menor reutilización; aceptable para esta pantalla inerte. |
| 3 | Carpeta `components/children/` (español) | `components/kids/` (paralelo a la URL) | El dominio del producto es "Niños"; los nombres de carpetas de componentes siguen el español, no las URLs. |
| 4 | `Sidebar` acepta prop `activeKey` con default `"feed"` | `usePathname()` o Sidebar duplicado | Más simple que client component; sin duplicación. Default preserva el comportamiento actual de `/`. |
| 5 | Nuevo namespace `components/children/` plano | Subcarpeta por componente, atomic design | Solo 9 componentes; spec 01 ya eligió plano para `home/`. |
| 6 | Buscar inerte (sin `useState`) | Client component con filtro live | El usuario confirmó solo visual; consistente con el resto de la página. |
| 7 | Nuevos tonos `coral-soft`, `pink`, `yellow` en `Badge` compartido | Crear componente `ChildBadge` aparte | La abstracción Badge ya existe y es genérica; extender tonos es < 5 líneas. |
| 8 | `ChildCard` recibe `Child` y decide el badge internamente | Variantes por badge con kind propio | Mantiene una sola API; el componente decide qué renderizar según `badge.kind`. |
| 9 | Acciones (`Agregar`, `Editar`, `Vincular`, `Resumen del día`) con `href="#"` | Stubs de ruta, router inerte | Mismo patrón de spec 01; futuros specs las harán reales. |
| 10 | Botón "Volver a Niños" usa `href="/kids"` | `href="#"` | Es una navegación real entre nuestras propias páginas; no es un placeholder. |
| 11 | `parentsLinked` como `number \| "none"` para forzar copy explícito | `number` + ternario en el componente | Mantiene el texto del mock literal ("sin padres vinculados") en la data, no en la UI. |
| 12 | Los colores de avatares y badges nuevos viven en `@theme` con nombres únicos | Usar coral-100 existente con `text-coral-700` | Evita colisión semántica con la escala coral ya usada para el CTA y las nav activas. |

## 7. Identified Risks

- **Drift pixel-perfect:** la referencia usa inline styles en px; mapear a utilities de Tailwind 4 puede introducir diferencias de ~1–2px. *Mitigación:* screenshot side-by-side a 1280px antes de mergear.
- **Inconsistencia URL↔dominio:** `/kids` (inglés) convive con `components/children/` (español) y copy en español. *Mitigación:* documentado en §6; futuros specs deben respetar el mismo split.
- **Hover state requiere atención especial:** `ChildCard` depende de pseudo-clase `:hover`. *Mitigación:* usar `hover:border-coral-soft-300` o un `<style>` con la regla exacta; verificar el render en el paso 8.
- **Hydration mismatch del drawer:** `MobileDrawer` lo cubre con `"use client"`; las dos páginas nuevas deben mantenerse como Server Component para evitar drift. *Mitigación:* ningún `page.tsx` lleva `"use client"`; `MobileDrawer` corre del lado cliente.
- **Colisión de tokens en `@theme`:** sumar `coral-soft-*` adyacente a la escala coral exige nombres únicos. *Mitigación:* nombrado explícito (`coral-soft-100`, `coral-soft-700`, `pink-100`, `pink-700`, `yellow-100`, `yellow-700`) sin tocar la escala coral.
- **`app/kids/[id]/page.tsx` con datos estáticos:** cualquier `:id` que no sea `mateo` renderiza el mismo perfil. *Mitigación:* documentado en §5; el spec valida con `mateo`; futuros specs hidratarán el `:id` con la data del mock.
- **Botón "Resumen del día" sin ruta:** es `href="#"` aunque parece acción real. *Mitigación:* decisión explícita de §6 #9; un spec futuro creará `/kids/[id]/resumen`.

## 8. Quick Definition Note

Phase 2 se resolvió en una sola tanda de 4 preguntas. Decisiones del usuario que cambiaron defaults propuestos:
- Rutas en inglés (`/kids`) en lugar de `/ninos`.
- Mock data hardcoded en `page.tsx` en lugar de `data/children.ts`.

Phase 3 se redactó en una sola pasada porque no quedaron ambigüedades tras esas respuestas.
