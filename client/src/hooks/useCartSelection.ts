import { useMemo, useState } from 'react';
import type { CartItemType } from '../types/cartItemType';

const STORAGE_KEY = 'cart-checked';

function loadCheckedIds(): number[] | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved !== null ? JSON.parse(saved) : null;
}

function saveCheckedIds(ids: Set<number>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function useCartSelection(cartProducts: CartItemType[], isLoading: boolean) {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(() => {
    const saved = loadCheckedIds();
    return saved !== null ? new Set(saved) : new Set();
  });
  const [initialized, setInitialized] = useState(false);

  if (!isLoading && !initialized && cartProducts.length > 0) {
    if (loadCheckedIds() === null) {
      setCheckedIds(new Set(cartProducts.map((p) => p.id)));
    }
    setInitialized(true);
  }

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(cartProducts.map((item) => item.id));
      setCheckedIds(allIds);
      saveCheckedIds(allIds);
    } else {
      setCheckedIds(new Set());
      saveCheckedIds(new Set());
    }
  };

  const handleItemCheck = (id: number, checked: boolean) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      saveCheckedIds(next);
      return next;
    });
  };

  const validCheckedIds = useMemo(
    () => new Set([...checkedIds].filter((id) => cartProducts.some((p) => p.id === id))),
    [checkedIds, cartProducts],
  );

  return { checkedIds: validCheckedIds, handleAllCheck, handleItemCheck };
}
