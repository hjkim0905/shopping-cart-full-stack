import { useMemo, useState } from 'react';
import type { CartItemType } from '../types/cartItemType';

export function useCartSelection(cartProducts: CartItemType[], isLoading: boolean) {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(() => {
    const savedCheckedIds = localStorage.getItem('cart-checked');
    return savedCheckedIds ? new Set(JSON.parse(savedCheckedIds)) : new Set();
  });
  const [initialized, setInitialized] = useState(false);

  if (!isLoading && !initialized && cartProducts.length > 0) {
    if (localStorage.getItem('cart-checked') === null) {
      setCheckedIds(new Set(cartProducts.map((p) => p.id)));
    }
    setInitialized(true);
  }

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const allIds = cartProducts.map((item) => item.id);
      setCheckedIds(new Set(allIds));
      localStorage.setItem('cart-checked', JSON.stringify([...allIds]));
    } else {
      setCheckedIds(new Set());
      localStorage.removeItem('cart-checked');
    }
  };

  const handleItemCheck = (id: number, checked: boolean) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
        localStorage.setItem('cart-checked', JSON.stringify([...next]));
      } else {
        next.delete(id);
        if (next.size === 0) {
          localStorage.removeItem('cart-checked');
        } else {
          localStorage.setItem('cart-checked', JSON.stringify([...next]));
        }
      }
      return next;
    });
  };

  const validCheckedIds = useMemo(
    () => new Set([...checkedIds].filter((id) => cartProducts.some((p) => p.id === id))),
    [checkedIds, cartProducts],
  );

  return { checkedIds: validCheckedIds, handleAllCheck, handleItemCheck };
}
