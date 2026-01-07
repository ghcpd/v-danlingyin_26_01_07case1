# Citations — createOrder

This file shows side-by-side excerpts from the original documentation and the source code, with a short explanation for each mismatch.

---

## 1) Parameter: `quantity` (High)

Documentation (README_backup.md):

| quantity | number | no | Number of items (0–10) |

Code (api.ts):
- `CreateOrderInput` declares `quantity: number;` (lines 3–7)
- `createOrder` validates and throws when quantity is out of range:
  - `if (input.quantity < 1 || input.quantity > 5) {` (lines 20–23)

Explanation:
- The docs mark `quantity` as optional and allow 0–10, but the code requires `quantity` and enforces the range 1–5. Calling with 0 or >5 will throw an error at runtime.

---

## 2) Parameter: `couponCode` (Medium)

Documentation (README_backup.md):

| couponCode | string | yes | Discount coupon code |

Code (api.ts):
- `CreateOrderInput` declares `couponCode?: string;` (line 6)

Explanation:
- The docs state `couponCode` is required; the implementation makes it optional. This is misleading but not a runtime error.

---

## 3) Returns (High)

Documentation (README_backup.md):

```ts
{
  success: boolean;
  orderId?: string;
}
```

Code (api.ts):
- `OrderResult` interface: `orderId: string; totalPrice: number;` (lines 9–12)
- `createOrder` return value: `{ orderId: "ORD-001", totalPrice: input.quantity * 100 }` (lines 25–28)

Explanation:
- The documented shape (`success` boolean and optional `orderId`) does not match the actual return value (`orderId` and `totalPrice`). Integrations relying on `success` will break.

---

## 4) Errors / Validation (High)

Documentation (README_backup.md):
- No errors or exceptions are documented for invalid parameter values.

Code (api.ts):
- Validation throws `new Error("Invalid quantity")` when `quantity < 1` or `quantity > 5` (lines 20–23)

Explanation:
- The docs must state that the function throws `Error("Invalid quantity")` for out-of-range quantities so callers can handle it.

---

## 5) Implementation details about return values (Low)

Documentation (README_backup.md):
- The original Returns section does not describe `orderId` or `totalPrice`.

Code (api.ts):
- The function returns a fixed `orderId` of `"ORD-001"` and computes `totalPrice` as `input.quantity * 100` (lines 25–28).

Explanation:
- It's helpful (but not strictly required) to document that `orderId` is currently a fixed value and how `totalPrice` is calculated.
