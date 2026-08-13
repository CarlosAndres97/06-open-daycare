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

## Project Structure
- `app/` - Next.js App Router pages and layouts
- `referencias/` - Screen mockups and design references
- Entry point: `app/page.tsx`

## Notes
- No test framework configured yet
- No database or API layer visible in current state

## Spec Driven Development -Skills
- /spec Usaremos esta habilidad para crear las especificaciones.
- /spec-impl Usaremos esta skill para hacer las implementaciones.


## Reglas de codigo
- Usar codigo limpio - nombres de variables, funciones y demas en ingles
