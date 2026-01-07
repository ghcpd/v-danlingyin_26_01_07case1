# API Documentation Audit - Citation Evidence

## Issue #1: quantity parameter requirement

### Documentation States:
**File:** README.md  
**Section:** Parameters table  
**Content:**
```
| quantity | number | no | Number of items (0–10) |
```
**Interpretation:** The "Required" column shows "no", indicating quantity is optional.

### Code Implementation:
**File:** api.ts  
**Lines:** 3-5  
**Content:**
```typescript
export interface CreateOrderInput {
  productId: string;
  quantity: number;
  couponCode?: string;
}
```
**Evidence:** `quantity: number;` does not have the optional modifier `?`, making it a required field.

### Mismatch:
Documentation claims quantity is optional, but the TypeScript interface requires it without the `?` modifier. This will cause runtime type errors.

---

## Issue #2: quantity range constraint

### Documentation States:
**File:** README.md  
**Section:** Parameters table  
**Content:**
```
| quantity | number | no | Number of items (0–10) |
```
**Interpretation:** quantity accepts values from 0 to 10 (inclusive).

### Code Implementation:
**File:** api.ts  
**Lines:** 18-20  
**Content:**
```typescript
if (input.quantity < 1 || input.quantity > 5) {
  throw new Error("Invalid quantity");
}
```
**Evidence:** The function explicitly validates that quantity must be between 1 and 5 (inclusive) and throws an error otherwise.

### Mismatch:
Documentation allows range 0–10, but code enforces 1–5. Using values 0, 6, 7, 8, 9, or 10 will throw an error despite documentation claiming they're valid.

---

## Issue #3: couponCode parameter requirement

### Documentation States:
**File:** README.md  
**Section:** Parameters table  
**Content:**
```
| couponCode | string | yes | Discount coupon code |
```
**Interpretation:** The "Required" column shows "yes", indicating couponCode is mandatory.

### Code Implementation:
**File:** api.ts  
**Lines:** 3-6  
**Content:**
```typescript
export interface CreateOrderInput {
  productId: string;
  quantity: number;
  couponCode?: string;
}
```
**Evidence:** `couponCode?: string;` has the optional modifier `?`, making it an optional field.

### Mismatch:
Documentation claims couponCode is required, but the interface marks it as optional. Developers may unnecessarily provide this field thinking it's mandatory.

---

## Issue #4: Return type structure

### Documentation States:
**File:** README.md  
**Section:** Returns  
**Content:**
```ts
{
  success: boolean;
  orderId?: string;
}
```
**Interpretation:** Function returns an object with a mandatory boolean `success` field and optional string `orderId` field.

### Code Implementation:
**File:** api.ts  
**Lines:** 8-11, 22-25  
**Content:**
```typescript
export interface OrderResult {
  orderId: string;
  totalPrice: number;
}

// Function return:
return {
  orderId: "ORD-001",
  totalPrice: input.quantity * 100
};
```
**Evidence:** The actual return type has required fields `orderId` (string) and `totalPrice` (number). No `success` field exists.

### Mismatch:
The documented return type is completely different from the actual implementation. Code attempting to access `.success` will get `undefined`, and accessing `.totalPrice` will fail in TypeScript compilation if using documented types.

---

## Issue #5: Missing error documentation

### Documentation States:
**File:** README.md  
**Section:** (None - error handling not documented)  
**Content:** No "Errors", "Throws", or "Exceptions" section present in the documentation.

### Code Implementation:
**File:** api.ts  
**Lines:** 13-15 (JSDoc), 18-20 (code)  
**Content:**
```typescript
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
  // ...
}
```
**Evidence:** The JSDoc comment and implementation both show the function throws an Error with message "Invalid quantity" under specific conditions.

### Mismatch:
Documentation provides no information about error conditions. Developers won't know the function can throw exceptions and won't implement proper error handling (try-catch blocks).

---

## Summary of Evidence

All five issues represent significant discrepancies between documented and actual API behavior:

- **Issues #1, #2, #3:** Parameter definitions are incorrect or misleading
- **Issue #4:** Return type is completely wrong
- **Issue #5:** Critical error behavior is undocumented

Each issue has been verified with:
1. Exact file locations and line numbers
2. Direct quotes from both documentation and code
3. Clear explanation of why they conflict
