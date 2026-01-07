// api.ts

export interface CreateOrderInput {
  productId: string;
  quantity: number;
  couponCode?: string;
}

export interface OrderResult {
  orderId: string;
  totalPrice: number;
}

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

  return {
    orderId: "ORD-001",
    totalPrice: input.quantity * 100
  };
}
