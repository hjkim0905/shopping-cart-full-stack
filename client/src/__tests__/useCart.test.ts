import { act, renderHook, waitFor } from '@testing-library/react';
import { useCart } from '../hooks/useCart';
import { server } from './mocks/server';
import { mockCartItems, errorHandlers } from './mocks/handlers';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useCart', () => {
  test('마운트 시 장바구니 상품을 불러온다', async () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.cartProducts).toEqual(mockCartItems);
    expect(result.current.error).toBeNull();
  });

  test('API 실패 시 error 상태를 설정한다', async () => {
    server.use(errorHandlers.getCartError);

    const { result } = renderHook(() => useCart());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('장바구니 목록을 불러오지 못했습니다.');
    expect(result.current.cartProducts).toEqual([]);
  });

  test('수량 변경 시 즉시 UI에 반영된다 (낙관적 업데이트)', async () => {
    const { result } = renderHook(() => useCart());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.handleQuantityChange(1, 5);
    });

    expect(result.current.cartProducts.find((p) => p.id === 1)?.quantity).toBe(5);
  });

  test('수량 변경 API 실패 시 이전 상태로 롤백된다', async () => {
    const { result } = renderHook(() => useCart());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    server.use(errorHandlers.updateCartError);

    const originalQuantity = result.current.cartProducts.find((p) => p.id === 1)?.quantity;
    await result.current.handleQuantityChange(1, 5);

    await waitFor(() => {
      expect(result.current.cartProducts.find((p) => p.id === 1)?.quantity).toBe(originalQuantity);
    });
  });

  test('수량이 1 미만이면 변경하지 않는다', async () => {
    const { result } = renderHook(() => useCart());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const originalQuantity = result.current.cartProducts.find((p) => p.id === 1)?.quantity;
    await result.current.handleQuantityChange(1, 0);

    expect(result.current.cartProducts.find((p) => p.id === 1)?.quantity).toBe(originalQuantity);
  });

  test('수량이 99 초과이면 변경하지 않는다', async () => {
    const { result } = renderHook(() => useCart());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const originalQuantity = result.current.cartProducts.find((p) => p.id === 1)?.quantity;
    await result.current.handleQuantityChange(1, 100);

    expect(result.current.cartProducts.find((p) => p.id === 1)?.quantity).toBe(originalQuantity);
  });

  test('삭제 후 목록에서 제거된다', async () => {
    const { result } = renderHook(() => useCart());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.deleteCartItem(1);
    });

    expect(result.current.cartProducts.find((p) => p.id === 1)).toBeUndefined();
    expect(result.current.cartProducts).toHaveLength(1);
  });
});
