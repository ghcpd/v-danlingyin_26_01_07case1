# API Documentation vs Implementation — Citations

## Issue 1 — `quantity` required & allowed range mismatch (High)

Documented contract (README_backup.md):

- Parameters table row for `quantity` (line 12):

  | quantity | number | no | Number of items (0–10) |

Actual implementation (api.ts):

- `CreateOrderInput` (lines 3-6):

  export interface CreateOrderInput {
    productId: string;
    quantity: number;
    couponCode?: string;
  }

- Input validation and error (lines 20-23):

  if (input.quantity < 1 || input.quantity > 5) {
    throw new Error("Invalid quantity");
  }

Explanation:
- Documentation claims `quantity` is optional and allows 0–10. The code requires `quantity` (non-optional) and enforces the range 1–5, throwing an error for values outside this range. This can cause runtime errors if callers follow the documented 0–10 range or omit `quantity`.

---

## Issue 2 — `couponCode` required flag mismatch (High)

Documented contract (README_backup.md):

- Parameters table row for `couponCode` (line 13):

  | couponCode | string | yes | Discount coupon code |

Actual implementation (api.ts):

- `CreateOrderInput` (line 6):

  couponCode?: string;

Explanation:
- Documentation marks `couponCode` as required (`yes`), but the implementation marks it optional with `?`. The docs should reflect that `couponCode` is optional.

---

## Issue 3 — Return value mismatch (High)

Documented contract (README_backup.md):

- Returns snippet (lines 18-20):

  {
    success: boolean;
    orderId?: string;
  }

Actual implementation (api.ts):

- `OrderResult` interface (lines 9-12):

  export interface OrderResult {
    orderId: string;
    totalPrice: number;
  }

- Return statement (lines 25-28):

  return {
    orderId: "ORD-001",
    totalPrice: input.quantity * 100
  };

Explanation:
- The documented return type references a `success` boolean and optional `orderId`, whereas the implementation returns `orderId` (required) and `totalPrice`. Documentation must be updated to show `orderId: string` and `totalPrice: number`.

---

## Issue 4 — Missing exceptions/errors (High)

Documented contract (README_backup.md):

- No Errors/Exceptions section is present (no mention of thrown errors).

Actual implementation (api.ts):

- Error thrown when quantity out of range (lines 20-23):

  if (input.quantity < 1 || input.quantity > 5) {
    throw new Error("Invalid quantity");
  }

Explanation:
- Because the implementation throws an error for invalid `quantity`, the documentation should clearly state this behavior so integrators can handle the exception appropriately.
