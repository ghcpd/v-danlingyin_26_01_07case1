# API Documentation vs Implementation Citations

Below are side-by-side comparisons with exact citations from the repository.

1) Parameter: `quantity`

-- Documented API contract (`README_backup.md`):

  - `README_backup.md` line 12: `| quantity | number | no | Number of items (0–10) |`

- Actual implementation (api.ts):

  - api.ts lines 3-6:
    ```ts
    export interface CreateOrderInput {
      productId: string;
      quantity: number;
      couponCode?: string;
    }
    ```
  - api.ts lines 16-18 (doc comment): `Throws error if quantitys - quantity < 1 - quantity > 5`
  - api.ts lines 21-23 (runtime check):
    ```ts
    if (input.quantity < 1 || input.quantity > 5) {
      throw new Error("Invalid quantity");
    }
    ```

Explanation: The documentation marks `quantity` as optional and allows 0–10, but the code requires `quantity` and enforces 1–5 (throws otherwise). This can cause runtime errors or integration failures.

2) Parameter: `couponCode`

-- Documented API contract (`README_backup.md`):

  - `README_backup.md` line 13: `| couponCode | string | yes | Discount coupon code |`

- Actual implementation (api.ts):

  - api.ts line 6: `couponCode?: string;`

Explanation: Documentation claims `couponCode` is required, but the code defines it as optional. Clients may send or omit it incorrectly based on this mismatch.

3) Returns

-- Documented API contract (`README_backup.md`):

  - `README_backup.md` lines 17-21:
    ```ts
    {
      success: boolean;
      orderId?: string;
    }
    ```

- Actual implementation (api.ts):

  - api.ts lines 9-11 (interface):
    ```ts
    export interface OrderResult {
      orderId: string;
      totalPrice: number;
    }
    ```
  - api.ts lines 25-28 (return value):
    ```ts
    return {
      orderId: "ORD-001",
      totalPrice: input.quantity * 100
    };
    ```

Explanation: The documentation lists a `success` boolean and an optional `orderId`; the implementation returns a required `orderId` and a `totalPrice` numeric field.

4) Errors (missing)

-- Documented API contract (`README_backup.md`): no explicit `Errors` section or mention of thrown exceptions for invalid `quantity`.

- Actual implementation (api.ts):

  - api.ts lines 16-18 (doc comment) and 21-23 (throw): function throws on invalid quantity.

Explanation: The documentation doesn't mention that the function throws an error for invalid quantity values, which is important for callers to know.
