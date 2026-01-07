# API Documentation Audit — createOrder

Scope
- Files reviewed: `README.md` (original preserved as `README_backup.md`) and `api.ts`.
- Function audited: `createOrder` (TypeScript implementation in `api.ts`).

Summary of issues found
- Missing / incorrect parameter constraints (quantity documented as optional and 0–10, actual: required and 1–5).
- Incorrect `couponCode` required flag (doc says required; code marks it optional).
- Incorrect return shape (docs list `{ success: boolean }`, code returns `{ orderId, totalPrice }`).
- Missing error documentation for invalid `quantity` (implementation throws `Error("Invalid quantity")`).
- Minor: docs do not state that `orderId` is a fixed string and how `totalPrice` is computed.

How citations were extracted
- The original documentation was copied to `README_backup.md` and quoted directly from that file.
- Code citations reference exact line ranges in `api.ts` (interfaces, validation check, and return statement).
- See `citations.md` for side-by-side excerpts and explanations.

How to manually verify
1. Open `api.ts` and inspect:
   - `CreateOrderInput` (lines ~3–7) for parameter types
   - `createOrder` validation and `throw` (lines ~20–23)
   - `OrderResult` and the `return` object (lines ~9–12 and ~25–28)
2. Open `README_backup.md` to view the original documentation lines quoted in this audit.
3. Confirm that `README.md` now reflects the implementation exactly.

If you want, I can run a quick unit test stub to demonstrate the thrown error and return value — I will not modify source code.