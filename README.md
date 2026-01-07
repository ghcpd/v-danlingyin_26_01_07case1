Order API

## createOrder

Creates a new order (implementation-level function).

### Signature
`createOrder(input: CreateOrderInput): OrderResult`

### Parameters

| Name | Type | Required | Description |
|------|------|:--------:|-------------|
| `productId` | `string` | yes | Product identifier
| `quantity` | `number` | **yes** | Number of items; **must be >= 1 and <= 5**. (Implementation does **not** enforce integer — fractional values are accepted and used as-is in pricing calculation.)
| `couponCode` | `string` | no | Optional discount coupon code

### Returns

```ts
{
  orderId: string;
  totalPrice: number;
}
```

### Errors

- Throws `Error("Invalid quantity")` when `quantity < 1 || quantity > 5`.

### Implementation notes

- The implementation requires `quantity` (it is **not** optional in the TypeScript type).
- `totalPrice` is computed as `quantity * 100`.

### Example

Request:

```ts
{ productId: "sku-123", quantity: 2, couponCode: "SUMMER" }
```

Response (example):

```ts
{ orderId: "ORD-001", totalPrice: 200 }
```

> If this function is surfaced as an HTTP endpoint, callers should map the invalid-quantity error to a 400 Bad Request response (recommendation only).