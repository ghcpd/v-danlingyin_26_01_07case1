 Order API

## createOrder

Creates a new order.

### Parameters

| Name | Type | Required | Description |
|-----|------|----------|-------------|
| productId | string | yes | Product identifier |
| quantity | number | yes | Number of items (1–5) |
| couponCode | string | no | Discount coupon code |

### Returns

```ts
{
  orderId: string;
  totalPrice: number;
}
```

### Errors

Throws an error with message `"Invalid quantity"` if:
- `quantity < 1`
- `quantity > 5`
