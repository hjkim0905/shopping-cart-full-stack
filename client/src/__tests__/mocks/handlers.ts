import { http, HttpResponse } from 'msw';
import type { CartItemType } from '../../types/cartItemType';

const BASE_URL = 'https://shopping-cart-full-stack-production-9304.up.railway.app';

export const mockCartItems: CartItemType[] = [
  { id: 1, name: '나이키 퍼시픽 주니어', price: 50000, quantity: 2, imageUrl: 'https://example.com/1.png' },
  { id: 2, name: '나이키 에어맥스 95', price: 70000, quantity: 1, imageUrl: 'https://example.com/2.png' },
];

export const handlers = [
  http.get(`${BASE_URL}/cart`, () => {
    return HttpResponse.json(mockCartItems);
  }),

  http.put(`${BASE_URL}/cart`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.delete(`${BASE_URL}/cart/:id`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

export const errorHandlers = {
  getCartError: http.get(`${BASE_URL}/cart`, () => {
    return HttpResponse.json({ errorMessage: '서버 오류' }, { status: 500 });
  }),

  updateCartError: http.put(`${BASE_URL}/cart`, () => {
    return HttpResponse.json({ errorMessage: '수정 실패' }, { status: 500 });
  }),

  deleteCartError: http.delete(`${BASE_URL}/cart/:id`, () => {
    return HttpResponse.json({ errorMessage: '삭제 실패' }, { status: 500 });
  }),
};
