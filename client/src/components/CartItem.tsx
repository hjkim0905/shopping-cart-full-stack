import styled from '@emotion/styled';
import type { CartItemType } from '../types/cartItemType';
import Checkbox from './ui/Checkbox';

function CartItem({
  item,
  checked,
  onCheck,
}: {
  item: CartItemType;
  checked: boolean;
  onCheck: (checked: boolean) => void;
}) {
  return (
    <ItemContainer>
      <CheckboxRow>
        <Checkbox checked={checked} onChange={onCheck} />
        <DeleteButton>삭제</DeleteButton>
      </CheckboxRow>
      <ProductContainer>
        <img src={item.imageUrl} />
        <div id="product-description">
          <h2 id="item-name">{item.name}</h2>
          <h2 id="item-price">{item.price}</h2>
          <div id="item-quantity-row">
            <button id="quantity-minus">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="8" fill="white" />
                <rect
                  x="0.5"
                  y="0.5"
                  width="23"
                  height="23"
                  rx="7.5"
                  stroke="black"
                  strokeOpacity="0.1"
                />
                <path
                  d="M6 12C10.6863 12 13.3137 12 18 12"
                  stroke="#363636"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <p id="item-quantity">{item.quantity}</p>
            <button id="quantity-plus">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="8" fill="white" />
                <rect
                  x="0.5"
                  y="0.5"
                  width="23"
                  height="23"
                  rx="7.5"
                  stroke="black"
                  strokeOpacity="0.1"
                />
                <path
                  d="M6 12H18M12 18V6.00003"
                  stroke="#363636"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </ProductContainer>
    </ItemContainer>
  );
}

export default CartItem;

const ItemContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 1.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #0000001a;
`;

const CheckboxRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  box-sizing: border-box;
  padding: 0.28125rem 0.53125rem 0.28125rem 0.53125rem;
  border-radius: 4px;
  border: 1px solid #0000001a;
  background-color: white;
  cursor: pointer;

  font-family: Noto Sans;
  font-weight: 500;
  font-style: Display Medium;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0%;
  vertical-align: middle;
`;

const ProductContainer = styled.div`
  padding-top: 0.75rem;
  display: flex;
  flex-direction: row;

  img {
    width: 7rem;
    height: 7rem;
    border-radius: 5px;
  }

  #product-description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1.25rem;
  }

  #item-name {
    font-family: Noto Sans;
    font-weight: 500;
    font-style: Display Medium;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0%;
    vertical-align: middle;
    margin-bottom: 0.25rem;
  }

  #item-price {
    font-family: Noto Sans KR;
    font-weight: 700;
    font-style: Bold;
    font-size: 24px;
    line-height: 100%;
    letter-spacing: 0%;
    vertical-align: middle;
    margin-bottom: 1.5rem;
  }

  #item-quantity-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;

    button {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }

  #item-quantity {
    font-family: Noto Sans;
    font-weight: 500;
    font-style: Display Medium;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0%;
    vertical-align: middle;
  }
`;
