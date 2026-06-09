import type { CartItemType } from '../types/cartItemType';

export const calculateOrderAmount = (cartProducts: CartItemType[], checkedIds: Set<number>): number =>
  cartProducts
    .filter((product) => checkedIds.has(product.id))
    .reduce((sum, product) => sum + product.price * product.quantity, 0);

export const calculateDeliveryFee = (orderAmount: number): number => {
  if (orderAmount >= 100000 || orderAmount === 0) return 0;
  return 3000;
};
