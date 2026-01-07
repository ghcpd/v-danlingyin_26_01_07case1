Order API

## createOrder

Creates a new order.

### Signature

`createOrder(input: CreateOrderInput): OrderResult`

### Parameters

| Name | Type | Required | Description |
|-----|------|----------|-------------|
| `productId` | `string` | **yes** | Product identifier |
| `quantity` | `number` | **yes** | Number of items. Must be an integer >= 1 and <= 5 (code enforces 1–5). |
| `couponCode` | `string` | **no** | Discount coupon code (optional). |

### Returns

```ts
{
  orderId: string;
  totalPrice: number; // computed as quantity * 100
}
```

### Errors

- Throws `Error("Invalid quantity")` when `quantity < 1` or `quantity > 5`.

> Note: This is a code-level function (not an HTTP endpoint); any HTTP status mapping is out of scope for the implementation here.
