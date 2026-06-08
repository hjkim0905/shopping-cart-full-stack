import { useEffect, useState } from 'react';
import type { CartItemType } from '../types/cartItemType';
import { deleteCartProduct, getCartProducts, updateCartProduct } from '../api/api';

export function useCart() {
  const [cartProducts, setCartProducts] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const data = await getCartProducts();
        setCartProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '장바구니를 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (productId: number, newQuantity: number): Promise<void> => {
    const item = cartProducts.find((product) => product.id === productId);
    if (!item || newQuantity < 1 || newQuantity > 99) return;

    const previous = [...cartProducts];
    const updated = { ...item, quantity: newQuantity };
    setCartProducts((prev) =>
      prev.map((product) => (product.id === productId ? updated : product)),
    );

    try {
      await updateCartProduct(updated);
    } catch {
      setCartProducts(previous);
      alert('수량 변경에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const deleteCartItem = async (productId: number): Promise<void> => {
    try {
      await deleteCartProduct(productId);
      setCartProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch {
      alert('상품 삭제에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return { cartProducts, isLoading, error, handleQuantityChange, deleteCartItem };
}
