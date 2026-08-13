---
name: spec-verifier
description: Verifies an implemented spec against its Acceptance Criteria. Runs build/lint, opens the page with Playwright to take screenshots and check console, uses Context7 to confirm Next.js best practices, and auto-corrects when a criterion fixes itself. Updates the spec's status to "Verified" when all criteria pass.
argument-hint: <NN-spec-name>
allowed-tools: Read, Glob, Grep, Edit, Write, AskUserQuestion, Bash(npm run build:*), Bash(npm run lint:*), Bash(npm run dev:*), Bash(git status:*), Bash(ls:*), Bash(rm:*), Bash(mkdir:*)
---

# /spec-verify — Verifier of implemented specs

## Session context

Current branch:
!`git branch --show-current`

Specs available in this folder:
!`ls specs/ 2>/dev/null || echo "The specs/ folder does not exist"`

Working tree status:
!`git status --short`

---

## Instructions

Follow these five phases in strict order. **Do not advance to the next phase if the previous one did not complete correctly.**

---

### Phase 1 — Identify the spec

The received argument is: `$ARGUMENTS`

If `$ARGUMENTS` is empty:

- List the files available in `specs/` (you already have them above).
- Ask the user to specify the exact name of the spec.
- Stop and wait for an answer. Do not continue.

If `$ARGUMENTS` has a value:

- Look for the file in `specs/`. The user may have written the full name (`01-home-feed-implementation`), only the number (`01`), or only the slug (`home-feed-implementation`). Try to find the correct file in any of those cases.
- If you do not find the file, show the available specs and ask the user to correct the name.
- If you do find it, continue to Phase 2.

---

### Phase 2 — Validate the spec's state

Read the spec file you located in Phase 1 using the Read tool.

In the file's contents, look for the line that contains the spec's state. The header label is typically `**Status:**` (English) or `**Estado:**` (Spanish), but it may use any language. Match by position (status line near the top of the spec) and by the surrounding state machine, not by the exact label.

**Absolute rule:** You can only continue if the state **means "Implemented" or "In Review"** — regardless of the language used.

Treat any of the following as **eligible to verify**:

- English: `Implemented`, `In Review`, `Implemented (Verified)`, `Complete`
- Spanish: `Implementado`, `En revisión`, `En Revisión`, `Completo`
- Portuguese: `Implementado`, `Em revisão`
- …or any other language's equivalent that clearly means the spec is ready to be verified

**Stop** (do not verify) if the state means:

- `Draft` / `Borrador` — the spec was never implemented
- `Approved` / `Aprobado` — the spec is signed off but nothing was built yet
- `Verified` / `Verificado` — already verified, no need to re-run
- `Obsolete` / `Obsoleto` — the spec is no longer relevant

If you are unsure whether a value means "implemented", **do not assume**. Stop and ask the user to clarify.

**Standard error message when the state does not allow verification:**

```
I cannot verify this spec.

Current state: [STATE FOUND]
I only verify specs whose state means "Implemented" or "In Review"
(e.g. `Implemented`, `En revisión`, or the equivalent in another language).

To continue you have two options:
  1. If the spec is already implemented, open it and change the state
     to "Implemented" (or the equivalent term your team uses) manually.
  2. If the spec still needs to be implemented, use /spec-impl [name].
```

After confirming the state, extract:
- The **objective** (line after `**Objective:**` / `**Objetivo:**`).
- The **Acceptance Criteria** section (the checklist).
- The **File Structure** section (if present) — useful for structural checks.

Move to Phase 3.

---

### Phase 3 — Plan the verification

Before running anything, classify each acceptance criterion into one of these types:

| Type | Detection heuristic | Tool |
|------|---------------------|------|
| `build` | Contains `npm run build` | Bash |
| `lint` | Contains `npm run lint` | Bash |
| `runtime` | Contains `npm run dev`, `renderiza`, `console`, `warnings` | Bash + Playwright |
| `visual` | Contains `1280px`, `375px`, `768px`, `side-by-side`, `referencias/`, `mock`, `screenshot`, color codes (#xxxxxx), `Responsive` | Playwright |
| `code` | Mentions Next.js APIs: `next/font`, `next/image`, `next/link`, `metadata`, `use client`, `use server`, etc. | Context7 + Read |
| `structure` | Contains `File Structure`, `Structure`, `coincide con`, `solo contiene`, file paths | Glob + Read |
| `manual` | Anything else that cannot be auto-checked (e.g. "links no navegan", "computed style of `<h1>`") | Playwright + JS evaluate |

For each criterion, write down:
- The exact expected behavior
- The tool/check you will run
- The expected pass condition

Create the verification log artifact before starting:

```
mkdir -p .playwright-mcp/verification-{spec-slug}
```

Where `{spec-slug}` is the spec file name without the `.md` extension.

Print the plan to the user:

```
Verification plan for specs/{spec-name}.md

  [build]   npm run build exits 0
  [lint]    npm run lint exits 0
  [runtime] `/` loads with no console errors
  [visual]  /  at 1280px matches referencias/pantallas/feed.dc.html
  [code]    next/font/google used per Next.js 16 docs
  [structure] app/ contains only page.tsx, layout.tsx, globals.css
  ...

Starting verification. Screenshots will be saved to .playwright-mcp/verification-{slug}/.
```

---

### Phase 4 — Run the verification

Execute each check one by one. After each check, append the result to the verification log.

#### 4.1 Build & lint

```bash
npm run build
npm run lint
```

If either fails:

- **Try to auto-correct** if the issue is obvious (e.g. a missing import, a typo, a dependency missing).
- Re-run the failed command.
- If you cannot fix it within 2 attempts, mark the criterion as ❌ and continue.

#### 4.2 Runtime check

Start the dev server in the background:

```bash
npm run dev
```

Wait for the server to be ready (poll `http://localhost:3000` until it returns 200).

Then use Playwright to navigate to `/` and check the console for errors. With the Playwright MCP, use `browser_navigate` to open `http://localhost:3000`, then `browser_console_messages` with `level: "error"` to list errors.

If console errors are present:

- **Try to auto-correct** (e.g. hydration mismatch → add `"use client"`, missing key → add `key` prop).
- Restart the dev server and re-check.
- If unfixable, mark as ❌ and continue.

#### 4.3 Visual checks

For each criterion marked as `visual`:

1. Open the page with Playwright at the required viewport (use `browser_resize` first).
2. Take a screenshot with `browser_take_screenshot` and save it to `.playwright-mcp/verification-{slug}/{criterion-slug}.png`.
3. If the criterion references a mock in `referencias/`, open that file with the Read tool, then take a screenshot of it for comparison.
4. Compare the two screenshots using the model's vision capability. Decide:
   - ✅ Pass — sections, order, texts, colors match within ~1–2px tolerance.
   - ❌ Fail — significant differences.

If the visual fails:

- Identify the differences (e.g. "wrong color on CTA button", "missing sidebar").
- **Try to auto-correct** by editing the component file.
- Reload the page and re-screenshot.
- If unfixable after 2 attempts, mark as ❌.

For responsive checks (e.g. `< 768px`):

- Use `browser_resize` to set the viewport to `375×667`.
- Re-screenshot and compare.
- Verify the hamburger button is visible and the sidebar is hidden (use `browser_evaluate` to check `getComputedStyle`).

#### 4.4 Code checks (Next.js best practices via Context7)

For each criterion marked as `code`:

1. Resolve the library ID for Next.js using Context7:
   ```
   resolve-library-id: "Next.js" + "next/font/google usage"
   ```
2. Query the docs for the relevant API:
   ```
   query-docs: "next/font/google Fredoka Nunito import display swap"
   ```
3. Read the relevant source file and compare it to the docs.
4. If the implementation diverges from the docs:
   - **Try to auto-correct** by editing the file.
   - Re-run the build to confirm.
   - If unfixable after 2 attempts, mark as ❌.

Common Next.js APIs to check:

- `next/font/google` — fonts loaded with `display: 'swap'`, subsets declared, CSS variables exposed
- `next/image` — `width`/`height` or `fill`, `alt` required, `priority` for LCP
- `next/link` — used for internal navigation
- `metadata` API — exported from `layout.tsx` or `page.tsx`, not a `<head>` JSX
- `use client` directive — only at the top of files that need it
- `'use server'` directive — only at the top of server actions

#### 4.5 Structure checks

For each criterion marked as `structure`:

1. Use Glob to verify the file/directory exists.
2. Read the spec's `## File Structure` section and the actual structure on disk.
3. Compare them. If they diverge:
   - Check if the spec is wrong (mention as observation).
   - Check if the implementation is wrong (auto-correct by moving/creating files).
   - If unfixable, mark as ❌.

#### 4.6 Manual checks

For criteria that don't fit any of the above (e.g. "computed style of `<h1>` shows Fredoka", "links no navegan"), use `browser_evaluate` to run JavaScript in the page:

```js
() => {
  const h1 = document.querySelector('h1');
  return window.getComputedStyle(h1).fontFamily;
}
```

For link checks, use `browser_evaluate` to inspect `href` attributes:

```js
() => {
  const links = Array.from(document.querySelectorAll('a[href]'));
  return links.map(l => l.getAttribute('href'));
}
```

If a manual check fails, apply the same auto-correct → re-verify → mark ❌ loop.

---

### Phase 5 — Report and update the spec checklist

After all checks have run, stop the dev server if you started it.

Generate a verification report with this format:

```
Verification report for specs/{spec-name}.md

Criterio                                               | Type     | Status
-------------------------------------------------------|----------|--------
`npm run build` sin errores.                           | build    | ✅
`npm run lint` sin errores.                            | lint     | ✅
`npm run dev` renderiza `/` sin warnings.             | runtime  | ✅
Side-by-side a 1280px entre `/` y referencias.         | visual   | ✅
Badges en orden: LOGRO, ACTIVIDAD, ANUNCIO.            | visual   | ✅
Todos los links tienen `href="#"`.                     | manual   | ✅
Tipografías: Fredoka en h1, Nunito en body.           | manual   | ✅
A < 768px: drawer hamburguesa funciona.                | visual   | ✅
Background `#F6ECDF`, cards `#FFFDF9`.                 | manual   | ✅
`app/` solo contiene rutas y configs.                  | structure| ✅
Estructura final coincide con §3.                      | structure| ✅

Passed: 11/11
Screenshots: .playwright-mcp/verification-{slug}/
```

**What this skill modifies in the spec file:**

- ✅ It marks each passing acceptance criterion as checked (`[x]`) in the `## Acceptance Criteria` section of the spec.
- ❌ It does NOT change the `**Status:**` field — leave it exactly as the user wrote it. The user is responsible for updating the spec's state manually (e.g. from `Implemented` to `Implemented (Verified)`).

How to mark criteria as checked:

1. Read the spec's `## Acceptance Criteria` section.
2. For each criterion that passed, replace `[ ]` with `[x]` at the start of the line.
3. For criteria that failed, leave them as `[ ]` so the user can see what still needs work.
4. (Optional) Append a `## Verification Report` section at the bottom of the spec with the date and the report table above.

Use the Edit tool to make these changes. Show the diff to the user.

If some criteria fail:

- Print which criteria failed.
- List the auto-corrections you attempted.
- Suggest next steps (e.g. "review the diff", "re-run /spec-verify after manual fixes").
- Only mark the passing criteria as `[x]`; leave failed ones unchecked.

---

### Phase 6 — Cleanup

After reporting, stop the dev server if you started it:

```bash
# Find and kill the dev server process
# (user should run Ctrl+C or pkill -f "next dev")
```

Note in the final message: "The dev server is still running. Stop it manually if you want to free port 3000."

---

## Summary of expected behavior

```
/spec-verify 01-home-feed-implementation

  Phase 1  →  Finds specs/01-home-feed-implementation.md
  Phase 2  →  Reads the state → "Implemented" → ✅ continues
  Phase 3  →  Classifies 11 criteria into 6 types, prints the plan
  Phase 4  →  Runs build/lint, Playwright visual + console, Context7 for code,
              and structural checks. Auto-corrects where possible.
  Phase 5  →  Reports 11/11 passed. Marks passing criteria as `[x]` in the
              Acceptance Criteria checklist. Does NOT touch the `**Status:**`
              field — the user updates that manually.
```

```
/spec-verify 02-powerups  (state: Draft / Borrador)

  Phase 1  →  Finds specs/02-powerups.md
  Phase 2  →  Reads the state → "Draft" → ❌ stops
              Shows the standard error message
              Does not run any checks
```

---

## Notes on vision-based comparison

When comparing screenshots with the model's vision:

- Tolerance is **~1–2px** for spacing and font rendering differences.
- Color tolerance is **±2** per RGB channel (Tailwind 4 token differences, antialiasing).
- Layout sections must appear in the **same order** with the **same hierarchy**.
- Texts must match **exactly** (including accents, capitalization).
- If a difference is below tolerance, mark as ✅ and note it in the report.
- If a difference is above tolerance, mark as ❌ and describe it.
