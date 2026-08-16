# SPEC 05 — Vincular padre modal

> **Status:** Approved
> **Depends on:** SPEC 02
> **Date:** 2026-08-16
> **Objective:** Implementar el modal de vincular padre/madre/tutor a un niño desde su perfil.

## 1. Scope

**In scope**
- Modal que se abre al hacer clic en "Vincular padre" desde el perfil del niño (SPEC 02).
- Campos: nombre del padre/madre (input texto), email (input email), parentesco (3 botones: Mamá, Papá, Tutor/a).
- Información de invitación: código hardcodeado "7K4P9" con fecha de vencimiento.
- Botón "Enviar invitación" sin funcionalidad (placeholder).
- Backdrop oscuro semi-transparente que cierra el modal al hacer clic fuera.

**Out of scope**
- Envío real de email.
- Generación dinámica del código de invitación.
- Validación de email.
- Persistencia de datos.
- Guardado real del vínculo.

## 2. Data Model

Este spec no introduce nuevas estructuras de datos. El modal es puramente UI.

## 3. Implementation Plan

1. **Crear `components/children/LinkParentModal.tsx`** — Client component que acepta `isOpen: boolean`, `onClose: () => void`, y opcionalmente `childName: string` para mostrar el nombre del niño. Renderiza el backdrop y el modal con los campos del diseño de referencia.

2. **En `app/kids/[id]/page.tsx` (SPEC 02)** — Importar `LinkParentModal` y controlar su estado. Agregar botón "Vincular padre" en el perfil que abra el modal.

3. **Estilos del modal** — Fondo página `#F6ECDF`, card `#FBF4EC` con borde `#ECE0D0`, shadow, border-radius 24px. Header con botón cerrar (X), título "Vincular padre" y subtítulo con nombre del niño. Los inputs tienen estilo del diseño.

4. **Botones de parentesco** — 3 botones mutually exclusive (solo uno seleccionado). Por ahora ninguno seleccionado por defecto.

5. **Código de invitación** — Mostrar "7K4P9" hardcodeado con "Vence en 7 días".

6. **Cerrar al hacer clic fuera** — El backdrop tiene `onClick={onClose}`; el contenido del modal tiene `e.stopPropagation()`.

## 4. Acceptance Criteria

- [ ] `npm run build` sin errores.
- [ ] `npm run lint` sin errores.
- [ ] Al hacer clic en "Vincular padre" desde el perfil, se abre el modal.
- [ ] El modal tiene backdrop oscuro que cierra al hacer clic fuera.
- [ ] Los campos nombre y email son inputs de texto/email.
- [ ] Los 3 botones de parentesco (Mamá, Papá, Tutor/a) son visibles.
- [ ] El código de invitación muestra "7K4P9" y "Vence en 7 días".
- [ ] El botón "Enviar invitación" no hace nada (placeholder).
- [ ] El diseño visual coincide con `referencias/pantallas/vincular-padre.dc.html`.

## 5. Decisions Taken and Discarded

| # | Decisión | Alternativa descartada | Por qué |
|---|---|---|---|
| 1 | Botones de parentesco sin estado inicial | Uno seleccionado por defecto | Más simple; futuro spec puede agregar lógica. |
| 2 | Código hardcodeado | Generación dinámica | El usuario confirmó hardcodeado. |
| 3 | Botón sin acción | Toast/mensaje | El usuario confirmó "por ahora nada". |
| 4 | Modal desde perfil | Página separada | El usuario confirmó que es modal. |

## 6. What is not in this spec

- Envío real de correo electrónico.
- Generación dinámica del código.
- Validación de email o required.
- Persistencia del vínculo.
- Múltiples padres por niño.
- Resto de funcionalidades del perfil del niño.
