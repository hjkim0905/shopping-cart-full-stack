import type { CartItemType } from '../types/cartItemType';

const BASE_URL = 'https://shopping-cart-full-stack-production-9304.up.railway.app';

export const getCartProducts = async (): Promise<CartItemType[]> => {
  const response = await fetch(`${BASE_URL}/cart`);
  if (!response.ok) throw new Error('장바구니 목록을 불러오지 못했습니다.');
  return response.json();
};

export const updateCartProduct = async (item: CartItemType): Promise<void> => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error('장바구니 상품의 수량을 수정하지 못했습니다.');
};

export const deleteCartProduct = async (productId: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('장바구니 상품을 삭제하지 못했습니다.');
};
