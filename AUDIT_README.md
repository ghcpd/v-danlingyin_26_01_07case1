# API Documentation Audit — README

## Scope
- Files reviewed: `README.md` (original preserved as `README_backup.md`) and `api.ts`.
- API inspected: `createOrder` (implementation-level function in `api.ts`).

## Summary of issue types found
- Incorrect parameter definitions (required vs optional, allowed ranges)
- Incorrect return value contract (missing/extra fields)
- Missing error documentation and HTTP-status guidance

## How citations were produced
- Exact documentation snippets were copied from `README_backup.md` to preserve the original wording.
- Corresponding code lines were cited from `api.ts` with explicit line numbers (interfaces, guards, return statement).
- All findings are reproducible by opening the two files and comparing the quoted line ranges.

## How to verify manually (quick steps)
1. Open `README_backup.md` and `api.ts` in the repository root.
2. For each parameter row in the README, confirm the presence/absence of `?` in the `CreateOrderInput` interface and any runtime guards in `createOrder`.
3. For the return contract, compare the `OrderResult` interface and the object returned in `createOrder`.
4. Run a minimal call to `createOrder` to observe thrown errors and returned shape (example in `README.md`).

## Recommended next actions (minimal-safe changes)
- Update `README.md` to match the implementation (already applied in this audit).
- Decide whether `quantity` should accept fractional values; if not, add validation to the implementation and update docs.
- If the function is exposed over HTTP, add explicit status-code mappings for known errors (e.g., invalid input -> 400).

## Contacts
- Auditor: automated audit (see `report.json` and `citations.md` for details)

