# API Documentation Audit - Citation Evidence

## Issue #1: Incorrect Parameter Range (quantity)

### Documentation States:
```
File: README.md (Line 10)
| quantity | number | no | Number of items (0–10) |
```

The documentation indicates:
- `quantity` is **optional** ("no" in Required column)
- Valid range: **0 to 10**

### Code Actually Does:
```typescript
File: api.ts (Lines 20-21)
if (input.quantity < 1 || input.quantity > 5) {
  throw new Error("Invalid quantity");
}
```

The code enforces:
- `quantity` **must be** 1 or greater (rejects < 1)
- `quantity` **must be** 5 or less (rejects > 5)
- Valid range: **1 to 5**

### Mismatch Analysis:
❌ **Upper bound mismatch**: Docs say 0–10, code rejects anything > 5
❌ **Lower bound mismatch**: Docs allow 0, code rejects < 1
⚠️ **Requirement mismatch**: Docs mark as optional, but code will error if quantity is not in valid range (implies it's required)

---

## Issue #2: Incorrect Parameter Requirement (couponCode)

### Documentation States:
```
File: README.md (Line 11)
| couponCode | string | yes | Discount coupon code |
```

The documentation indicates:
- `couponCode` is **required** ("yes" in Required column)

### Code Actually Does:
```typescript
File: api.ts (Line 5)
export interface CreateOrderInput {
  productId: string;
  quantity: number;
  couponCode?: string;  // <-- Optional marker (?)
}
```

The code defines:
- `couponCode` is **optional** (marked with `?`)
- Callers can omit this field without error

### Mismatch Analysis:
❌ **Requirement mismatch**: Docs say required, code makes it optional with no validation that enforces presence

---

## Issue #3: Incorrect Return Type Structure

### Documentation States:
```typescript
File: README.md (Lines 16-19)
{
  success: boolean;
  orderId?: string;
}
```

The documentation promises:
- A `success` boolean field (required)
- An optional `orderId` string field

### Code Actually Does:
```typescript
File: api.ts (Lines 8-10)
export interface OrderResult {
  orderId: string;
  totalPrice: number;
}

File: api.ts (Lines 22-25)
return {
  orderId: "ORD-001",
  totalPrice: input.quantity * 100
};
```

The code returns:
- `orderId` is **always present** (not optional, no `?` marker)
- `totalPrice` is **always present** (number type)
- **No** `success` field at all

### Mismatch Analysis:
❌ **Field mismatch**: `success` field promised but not returned
❌ **Missing field**: `totalPrice` field returned but not documented
❌ **Optional vs. required**: `orderId` shown as optional (`?`) but always included

---

## Issue #4: Missing Return Field (totalPrice)

### Documentation States:
```
File: README.md (Lines 16-19)
Return value contains: { success: boolean; orderId?: string; }
```

The documentation **does not mention** a `totalPrice` field.

### Code Actually Does:
```typescript
File: api.ts (Lines 22-25)
return {
  orderId: "ORD-001",
  totalPrice: input.quantity * 100  // <-- Missing from docs!
};
```

The code **always returns** `totalPrice` calculated as `quantity * 100`.

### Mismatch Analysis:
❌ **Missing documentation**: The `totalPrice` field is undocumented but actively returned to callers
⚠️ **Integration risk**: Clients expecting only `{ success, orderId }` will miss the `totalPrice` field

---

## Issue #5: Missing Error/Exception Documentation

### Documentation States:
```
File: README.md
[No "Errors" or "Exceptions" section exists]
```

The documentation **does not mention** any error conditions.

### Code Actually Does:
```typescript
File: api.ts (Lines 17-19, 20-21)
/**
 * Creates a new order.
 * Throws error if quantitys
 * - quantity < 1
 * - quantity > 5
 */
export function createOrder(input: CreateOrderInput): OrderResult {
  if (input.quantity < 1 || input.quantity > 5) {
    throw new Error("Invalid quantity");
  }
```

The code **throws an Error** when:
- `quantity` is less than 1
- `quantity` is greater than 5

### Mismatch Analysis:
❌ **No error documentation**: The API throws exceptions but no "Errors" or "Exceptions" section exists in README
⚠️ **Integration risk**: Clients unaware of error conditions may not implement proper error handling

---

## Summary of Evidence

| Issue | Doc File | Code File | Evidence Type | Severity |
|-------|----------|-----------|---------------|----------|
| #1 | README.md:10 | api.ts:20-21 | Constraint mismatch | High |
| #2 | README.md:11 | api.ts:5 | Parameter requirement | High |
| #3 | README.md:16-19 | api.ts:8-10, 22-25 | Return structure | High |
| #4 | README.md:16-19 | api.ts:22-25 | Missing field | High |
| #5 | README.md (missing section) | api.ts:17-21 | Missing documentation | High |

