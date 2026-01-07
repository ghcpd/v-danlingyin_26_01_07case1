# Citations — Documentation vs Implementation (createOrder)

## 1) Parameter: `quantity` ⚠️

Documentation (original):
- File: `README_backup.md` — Parameters table row for `quantity` (line 12)
  > `| quantity | number | no | Number of items (0–10) |`

Implementation (exact lines):
- File: `api.ts` —
  - `export interface CreateOrderInput {` (line 3)
  - `  quantity: number;` (line 5)
  - Guard: `if (input.quantity < 1 || input.quantity > 5) { throw new Error("Invalid quantity") }` (lines 21-23)

Explanation:
- Doc: marks `quantity` as optional and allows 0–10.
- Code: `quantity` is required (no `?`) and rejects values <1 or >5 (allowed range 1–5). Fractional values are not checked and will be accepted by the implementation.

Impact: High — callers who omit `quantity` or pass 0 or >5 will encounter runtime errors or unexpected behavior.

---

## 2) Parameter: `couponCode` ⚠️

Documentation (original):
- File: `README_backup.md` — Parameters table row for `couponCode` (line 13)
  > `| couponCode | string | yes | Discount coupon code |`

Implementation (exact lines):
- File: `api.ts` — `couponCode?: string` in `CreateOrderInput` (line 6)

Explanation:
- Doc: marks `couponCode` as required.
- Code: marks `couponCode` optional (`?`).

Impact: High — integrators may fail client-side validation if they rely on the doc.

---

## 3) Return value structure ❌

Documentation (original):
- File: `README_backup.md` — Returns block (lines 17-21)
  > ```ts
  > { success: boolean; orderId?: string; }
  > ```

Implementation (exact lines):
- File: `api.ts` — `export interface OrderResult {` (line 9)
  - `orderId: string;` (line 10)
  - `totalPrice: number;` (line 11)
- Concrete return in `createOrder` (lines 25-27):
  > `{ orderId: "ORD-001", totalPrice: input.quantity * 100 }`

Explanation:
- Doc claims a `success` boolean and makes `orderId` optional.
- Code returns no `success` property, always returns `orderId` (string) and **also** returns `totalPrice` (number).

Impact: High — consumers expecting `success` or an optional `orderId` will mis-handle responses and miss pricing data.

---

## 4) Errors / HTTP mapping (missing) ⚠️

Documentation (original):
- File: `README_backup.md` — (no Errors section; no mention of exceptions for invalid parameters)

Implementation (exact lines):
- File: `api.ts` — guard that throws on invalid quantity (lines 21-23):
  > `throw new Error("Invalid quantity")`

Explanation:
- Doc omits the runtime exception that occurs for out-of-range `quantity` values and does not advise how to map it to HTTP status codes.

Impact: Medium — causes runtime failures and unclear integration behavior; mapping to an HTTP status code is undefined (recommend 400 Bad Request when surfaced over HTTP).

---

## How I extracted citations
- Documentation quotes were taken from `README_backup.md` (exact table rows and returns block).
- Code quotes reference exact line numbers in `api.ts` (interface properties, guard, and return object).

