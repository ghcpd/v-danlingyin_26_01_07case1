Order API

## createOrder

Creates a new order.

### Parameters

| Name | Type | Required | Description |
|-----|------|----------|-------------|
| productId | string | **yes** | Product identifier |
| quantity | number | **yes** | Number of items. **Must be between 1 and 5 (inclusive).** Values outside this range cause an error. |
| couponCode | string | **no** | Discount coupon code (optional) |

### Returns

```ts
{
  orderId: string;
  totalPrice: number;
}
```

### Errors

- Throws `Error("Invalid quantity")` if `quantity < 1` or `quantity > 5`.

### Notes

- `createOrder` is a synchronous function that expects a `CreateOrderInput` object and returns an `OrderResult`.

