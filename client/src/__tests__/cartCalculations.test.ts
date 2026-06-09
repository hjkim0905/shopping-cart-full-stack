import { calculateOrderAmount, calculateDeliveryFee } from '../utils/cartCalculations';
import type { CartItemType } from '../types/cartItemType';

const items: CartItemType[] = [
  { id: 1, name: '상품A', price: 30000, quantity: 2, imageUrl: '' },
  { id: 2, name: '상품B', price: 20000, quantity: 1, imageUrl: '' },
  { id: 3, name: '상품C', price: 10000, quantity: 3, imageUrl: '' },
];

describe('calculateOrderAmount', () => {
  test('선택된 상품들의 합산 금액을 계산한다', () => {
    const checkedIds = new Set([1, 2]);
    // id1: 30000 * 2 = 60000, id2: 20000 * 1 = 20000
    expect(calculateOrderAmount(items, checkedIds)).toBe(80000);
  });

  test('선택된 상품이 없으면 0을 반환한다', () => {
    expect(calculateOrderAmount(items, new Set())).toBe(0);
  });

  test('전체 상품이 선택되면 전체 합산 금액을 반환한다', () => {
    const checkedIds = new Set([1, 2, 3]);
    // 60000 + 20000 + 30000 = 110000
    expect(calculateOrderAmount(items, checkedIds)).toBe(110000);
  });

  test('수량이 반영된 금액을 계산한다', () => {
    const checkedIds = new Set([3]);
    // id3: 10000 * 3 = 30000
    expect(calculateOrderAmount(items, checkedIds)).toBe(30000);
  });
});

describe('calculateDeliveryFee', () => {
  test('주문 금액이 0원이면 배송비 무료', () => {
    expect(calculateDeliveryFee(0)).toBe(0);
  });

  test('주문 금액이 10만원 미만이면 배송비 3000원', () => {
    expect(calculateDeliveryFee(50000)).toBe(3000);
    expect(calculateDeliveryFee(99999)).toBe(3000);
  });

  test('주문 금액이 10만원 이상이면 배송비 무료', () => {
    expect(calculateDeliveryFee(100000)).toBe(0);
    expect(calculateDeliveryFee(150000)).toBe(0);
  });
});
