Order API

## createOrder

Creates a new order.

### Parameters

| Name | Type | Required | Description |
|-----|------|----------|-------------|
| `productId` | `string` | **yes** | Product identifier (provided to the function but not validated)
| `quantity` | `number` | **yes** | Number of items — **must be between 1 and 5**. Values outside this range cause an error.
| `couponCode` | `string` | **no** | Discount coupon code (optional)

### Errors

- Throws `Error("Invalid quantity")` when `quantity < 1` or `quantity > 5`.

### Returns

```ts
{
  orderId: string;
  totalPrice: number;
}
```

Notes:

- The implementation currently returns a fixed `orderId` of `"ORD-001"`.
- `totalPrice` is computed as `quantity * 100`.
