# Verification Report — {SPEC_NAME}

**Date:** {DATE}
**Branch:** {BRANCH}
**Status:** {STATUS ✅ Verified | ❌ Failed}

## Summary

- Total criteria: {TOTAL}
- Passed: {PASSED}
- Failed: {FAILED}
- Auto-corrected: {CORRECTED}

## Results

| # | Criterion | Type | Status | Notes |
|---|-----------|------|--------|-------|
| 1 | {CRITERION_TEXT} | {TYPE} | {STATUS} | {NOTES} |
| 2 | ... | ... | ... | ... |

## Screenshots

All screenshots were saved to `.playwright-mcp/verification-{slug}/`:

- `{criterion-slug}.png` — {description}
- `{criterion-slug}-mobile.png` — {description}

## Auto-corrections

The following criteria required auto-correction:

1. **{CRITERION}** — {description of fix}
   - File: `{file}`
   - Change: `{before} → {after}`

## Next steps

{IF ALL PASSED}
- Passing criteria were marked as `[x]` in the spec's Acceptance Criteria checklist.
- The `**Status:**` field was NOT modified. Update it manually if desired (e.g. to `Implemented (Verified)`).
- Ready to merge this branch.
{ELSE}
- Passing criteria were marked as `[x]`; failed ones remain `[ ]`.
- The `**Status:**` field was NOT modified.
- Review the failed criteria above.
- Apply the suggested fixes manually.
- Re-run `/spec-verify {slug}` to confirm.
{/IF}
