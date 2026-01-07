# API Documentation Audit — README

Scope
- This audit covers the `createOrder` API documented in `README.md` and implemented in `api.ts` in the repository root.

Types of issues found
- Incorrect parameter requiredness and allowed ranges (quantity and couponCode).
- Incorrect return value contract (documented fields differ from actual return values).
- Missing error documentation (function throws on out-of-range quantity).

How citations were extracted
- File lines were read directly from `README.md` and `api.ts` and quoted with exact line references.
- For code behavior, both type declarations (`CreateOrderInput`, `OrderResult`) and runtime checks (the `if` that throws) were cited.

How to manually verify
1. Open `api.ts` and inspect:
   - `CreateOrderInput` (presence of `quantity` and `couponCode` and their optionality).
   - `OrderResult` (the fields `orderId` and `totalPrice`).
   - The runtime `if` statement that throws `Error("Invalid quantity")`.
2. Open `README.md` and compare the `Parameters` and `Returns` tables with `api.ts`.
3. If the API will be exposed via HTTP, the reviewer should add clear HTTP status mapping documentation separately (not present in these files).

Notes
- No source code was modified during this audit; only documentation files were added or updated.
