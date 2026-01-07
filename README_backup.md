 Order API

## createOrder

Creates a new order.

### Parameters

| Name | Type | Required | Description |
|-----|------|----------|-------------|
| productId | string | yes | Product identifier |
| quantity | number | no | Number of items (0–10) |
| couponCode | string | yes | Discount coupon code |

### Returns

```ts
{
  success: boolean;
  orderId?: string;
}