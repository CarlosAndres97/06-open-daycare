# SPEC 04 — Agregar niño modal

> **Status:** Verified
> **Depends on:** SPEC 02
> **Date:** 2026-08-16
> **Objective:** Implementar el modal de agregar niño con validación required para nombre, fecha de nacimiento y sala.

## 1. Scope

**In scope**
- Modal que se abre al hacer clic en "Agregar niño" desde `/kids`.
- Campos: nombre completo (required), fecha de nacimiento (required, date-picker nativo), sala (required, dropdown), alergias (opcional), notas médicas (opcional).
- Validación: atributos HTML5 `required` en los tres campos obligatorios.
- Backdrop oscuro semi-transparente que cierra el modal al hacer clic fuera.
- Botón "Guardar" sin funcionalidad (placeholder `href="#"`).

**Out of scope**
- Persistencia de datos.
- Guardado real del niño.
- Validación adicional más allá de `required`.
- Redirección tras guardar.

## 2. Data Model

Este spec no introduce nuevas estructuras de datos. El modal es puramente UI.

## 3. Implementation Plan

1. **Crear `components/children/AddChildModal.tsx`** — Client component que acepta `isOpen: boolean` y `onClose: () => void`. Renderiza el backdrop y el modal con los campos del diseño de referencia.

2. **En `app/kids/page.tsx`** — Importar `AddChildModal` y controlar su estado con `useState`. Reemplazar el `href="#"` del botón "Agregar niño" por un `onClick` que abra el modal.

3. **Estilos del modal** — Fondo `#F6ECDF`, card `#FBF4EC` con borde `#ECE0D0`, shadow, border-radius 24px. El header tiene "Cancelar" (link), "Agregar niño" (título), "Guardar" (link coral). Los inputs tienen `required`.

4. **Date-picker** — Usar `<input type="date">` nativo con el estilo del diseño.

5. **Dropdown de sala** — `<select>` con opciones hardcodeadas (por ahora solo "Soles"). Estilizar para que parezca el diseño de referencia (con ícono chevron).

6. **Cerrar al hacer clic fuera** — El backdrop tiene `onClick={onClose}`; el contenido del modal tiene `e.stopPropagation()` para evitar cierre al hacer clic dentro.

## 4. Acceptance Criteria

- [x] `npm run build` sin errores.
- [x] `npm run lint` sin errores.
- [x] Al hacer clic en "Agregar niño" en `/kids`, se abre el modal.
- [x] El modal tiene backdrop oscuro que cierra al hacer clic fuera.
- [x] Los campos nombre, fecha de nacimiento y sala tienen el atributo `required`.
- [x] El date-picker usa `<input type="date">`.
- [x] El dropdown de sala es un `<select>` estilizado.
- [x] Los campos opcionales (alergias, notas médicas) no tienen `required`.
- [x] El botón "Guardar" es un link con `href="#"` (sin funcionalidad).
- [x] El diseño visual coincide con `referencias/pantallas/agregar-nino.dc.html`.

## 5. Decisions Taken and Discarded

| # | Decisión | Alternativa descartada | Por qué |
|---|---|---|---|
| 1 | `<input type="date">` nativo | Date-picker personalizado (calendar popup) | El usuario decidió nativo; menos código y más accesible. |
| 2 | Atributo `required` HTML5 | Validación personalizada con estados de error | El usuario decidió solo `required`; más simple. |
| 3 | Backdrop cierra al hacer clic fuera | Solo cerrar con botón "Cancelar" | El usuario confirmó que sí. |
| 4 | Sala hardcodeada ("Soles") | Datos de salas desde mock/config | Por ahora solo hardcodeado; futuro spec podría expandir. |

## 7. Verification Report

| Criterio                                               | Type     | Status |
|---------------------------------------------------------|----------|--------|
| `npm run build` sin errores.                           | build    | ✅     |
| `npm run lint` sin errores.                            | lint     | ✅     |
| Al hacer clic en "Agregar niño" en `/kids`, se abre el modal. | runtime | ✅     |
| El modal tiene backdrop oscuro que cierra al hacer clic fuera. | runtime | ✅     |
| Los campos nombre, fecha de nacimiento y sala tienen el atributo `required`. | code | ✅     |
| El date-picker usa `<input type="date">`.             | code     | ✅     |
| El dropdown de sala es un `<select>` estilizado.       | code     | ✅     |
| Los campos opcionales (alergias, notas médicas) no tienen `required`. | code | ✅     |
| El botón "Guardar" es un link con `href="#"`.          | manual  | ✅     |
| El diseño visual coincide con referencia.              | visual  | ✅     |

Passed: 10/10
Screenshots: .playwright-mcp/verification-04-agregar-nino-modal/

## 6. What is **not** in this spec

- Guardado real del niño en base de datos.
- Validación de formato de fecha o nombre.
- Navegación tras guardar.
- Múltiples salas configurables.
- Resto de acciones del sidebar (avisos, mi-cuenta, crear-publicacion).
