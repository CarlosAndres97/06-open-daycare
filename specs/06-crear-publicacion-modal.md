# SPEC 06 — Crear publicación modal

> **Status:** Implemented
> **Depends on:** SPEC 01
> **Date:** 2026-08-16
> **Objective:** Implementar el modal de crear una nueva publicación.

## 1. Scope

**In scope**
- Modal que se abre al hacer clic en el botón de crear publicación (desde el feed, SPEC 01).
- Selector de destinatarios: 3 niños hardcodeados (Mateo, Sofía, Benjamín) + "Toda la sala". Solo uno seleccionado por defecto (Mateo).
- Selector de tipo de publicación: 7 opciones (Comida, Siesta, Actividad, Logro, Ánimo, Foto, Anuncio). Solo uno seleccionado por defecto (Actividad).
- Campo de descripción con placeholder y texto de ejemplo hardcodeado.
- Sección de fotos con un thumbnail placeholder y un botón "Agregar".
- Botones "Cancelar" y "Publicar" en el header (sin acción real).
- Backdrop oscuro semi-transparente que cierra el modal al hacer clic fuera.
- Diseño visual basado en la referencia `referencias/pantallas/crear-publicacion.dc.html`.

**Out of scope**
- Persistencia de la publicación.
- Subida o manejo real de imágenes.
- Integración con datos de niños reales (vienen de un estado local hardcodeado).
- Envío de notificaciones a los destinatarios.
- Previsualización de la publicación antes de publicar.

## 2. Data Model

Este spec no introduce nuevas estructuras de datos persistentes. El modal es puramente UI.

```tsx
// Datos hardcodeados locales
const kids = [
  { id: '1', name: 'Mateo', initials: 'M', avatarBg: '#A9D9E8', avatarColor: '#1F7A93' },
  { id: '2', name: 'Sofía', initials: 'S', avatarBg: '#F4B8CC', avatarColor: '#C44A7A' },
  { id: '3', name: 'Benjamín', initials: 'B', avatarBg: '#B9DEC4', avatarColor: '#3E8B62' },
];

const postTypes = [
  { label: 'Comida', bg: '#9A7B1E', color: '#fff' },
  { label: 'Siesta', bg: '#E7DCF6', color: '#7B5FC0' },
  { label: 'Actividad', bg: '#2E89A6', color: '#fff' },
  { label: 'Logro', bg: '#CFEBD8', color: '#3E9B6C' },
  { label: 'Ánimo', bg: '#F9D2DE', color: '#C56486' },
  { label: 'Foto', bg: '#FBD8CC', color: '#D9684A' },
  { label: 'Anuncio', bg: '#CCD8F4', color: '#4E72C8' },
];

const state = {
  selectedKid: '1',
  selectedType: 'Actividad',
  description: 'Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón.',
};
```

## 3. Implementation Plan

1. **Crear `components/publications/CreatePostModal.tsx`** — Client component que acepta `isOpen: boolean` y `onClose: () => void`. Renderiza backdrop + modal con header, cuerpo y todos los elementos del diseño de referencia.

2. **Botón de apertura en `app/page.tsx` (SPEC 01)** — Agregar estado `isCreateModalOpen` y un botón flotante o en el nav que abra el modal.

3. **Header del modal** — Título "Nueva publicación", botón "Cancelar" (enlaza/vuelve al feed), botón "Publicar" (sin acción).

4. **Selector de destinatarios (PARA)** — 3 botones de niños + "Toda la sala". Solo uno seleccionado a la vez. Estilo pill con avatar circular para cada niño.

5. **Selector de tipo (TIPO)** — 7 botones pill. Solo uno seleccionado a la vez. Colores específicos por tipo según el diseño.

6. **Campo de descripción (DESCRIPCIÓN)** — Textarea con placeholder "Contá cómo le fue hoy…" y texto de ejemplo hardcodeado.

7. **Sección de fotos (FOTOS)** — Un thumbnail placeholder con icono SVG y un botón "Agregar" con icono +.

8. **Cerrar al hacer clic fuera** — El backdrop tiene `onClick={onClose}`; el contenido del modal tiene `e.stopPropagation()`.

## 4. Acceptance Criteria

- [ ] `npm run build` sin errores.
- [ ] `npm run lint` sin errores.
- [ ] El botón de crear publicación abre el modal.
- [ ] El modal tiene backdrop oscuro que cierra al hacer clic fuera.
- [ ] Los 3 niños (Mateo, Sofía, Benjamín) + "Toda la sala" son visibles como botones.
- [ ] Solo un destinatario está seleccionado a la vez (Mateo por defecto).
- [ ] Los 7 tipos de publicación son visibles con sus colores.
- [ ] Solo un tipo está seleccionado a la vez (Actividad por defecto).
- [ ] El textarea de descripción tiene texto de ejemplo.
- [ ] La sección de fotos muestra un thumbnail placeholder y un botón "Agregar".
- [ ] Los botones "Cancelar" y "Publicar" no hacen nada (placeholders).
- [ ] El diseño visual coincide con `referencias/pantallas/crear-publicacion.dc.html`.

## 5. Decisions Taken and Discarded

| # | Decisión | Alternativa descartada | Por qué |
|---|---|---|---|
| 1 | Niños hardcodeados | Traer de API o estado global | El usuario confirmó hardcodeado. |
| 2 | Tipos como botones visuales | Dropdown o select | Diseño de referencia usa botones. |
| 3 | Botones sin acción | Toast o log en consola | Sin persistencia, solo UI. |
| 4 | Thumbnail placeholder | Upload real de imagen | El usuario confirmó placeholder. |
| 5 | Modal sobre el feed | Página separada | El usuario confirmó modal. |
| 6 | Default: Mateo + Actividad | Ninguno seleccionado | Selección inicial para mostrar la UI. |

## 6. What is not in this spec

- Persistencia o guardado de la publicación.
- Subida o previsualización real de imágenes.
- Integración con datos de niños desde una API.
- Notificaciones a los destinatarios.
- Flujo de previsualización antes de publicar.
- Edición o eliminación de publicaciones.
- Múltiples fotos o galería de imágenes.
