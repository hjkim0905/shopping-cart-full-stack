import type { CartItemType } from '../types/cartItemType';

const baseUrl = 'https://shopping-cart-full-stack-production-9304.up.railway.app/';

export const getCartProducts = async (): Promise<CartItemType[]> => {
  const response = await fetch(`${baseUrl}/cart`);

  if (!response.ok) throw new Error('장바구니 목록을 불러오지 못했습니다.');

  return await response.json();
};
