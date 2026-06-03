import styled from '@emotion/styled';
import type { CartItemType } from '../types/cartItemType';

function CartItem({ item }: { item: CartItemType }) {
  return <ItemContainer>{item.imageUrl}</ItemContainer>;
}

export default CartItem;

const ItemContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 1.5rem;
  border-top: 1px solid #0000001a;
`;
