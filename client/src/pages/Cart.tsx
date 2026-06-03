import { useState } from 'react';
import styled from '@emotion/styled';
import Checkbox from '../components/ui/Checkbox';
import type { CartItemType } from '../types/cartItemType';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';

const MockData: CartItemType[] = [
  {
    id: 1,
    imageUrl:
      'https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8802aadd-4172-40d1-a6ce-83018ee6b6a7/NIKE+PACIFIC+%28GS%29.png',
    name: '나이키 퍼시픽 주니어',
    quantity: 2,
    price: 50000,
  },
  {
    id: 2,
    imageUrl:
      'https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a2b045e0-f73d-45e4-bac8-8510270fde8f/AIR+MAX+95+BB+LTR+%28GS%29.png',
    name: '나이키 에어맥스 95',
    quantity: 1,
    price: 70000,
  },
];

function Cart() {
  const [allChecked, setAllChecked] = useState(false);

  return (
    <PageContainer>
      <Banner>
        <h1 id="banner-logo">SHOP</h1>
      </Banner>
      <CartTitle>
        <h1 id="cart-title">장바구니</h1>
        <p id="cart-description">현재 2종류의 상품이 담겨있습니다.</p>
      </CartTitle>
      <CartList>
        <Checkbox checked={allChecked} onChange={setAllChecked} label="전체선택" />
        {MockData.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </CartList>
      <OrderSummary />
    </PageContainer>
  );
}

export default Cart;

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Banner = styled.div`
  background-color: #000000;
  width: 100%;
  height: 64px;
  box-sizing: border-box;
  padding-left: 1.5rem;
  display: flex;
  align-items: center;

  #banner-logo {
    font-family: Noto Sans;
    font-weight: 800;
    font-style: ExtraBold;
    font-size: 20px;
    line-height: 16px;
    letter-spacing: 0%;
    vertical-align: middle;
    color: #ffffff;
  }
`;

const CartTitle = styled.div`
  box-sizing: border-box;
  padding: 2.25rem 1.5rem 2.25rem 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  #cart-title {
    font-family: Noto Sans KR;
    font-weight: 700;
    font-style: Bold;
    font-size: 24px;
    line-height: 100%;
    letter-spacing: 0%;
    vertical-align: middle;
  }

  #cart-description {
    font-family: Noto Sans;
    font-weight: 500;
    font-style: Display Medium;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0%;
  }
`;

const CartList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 1.5rem 3.25rem 1.5rem;
  background-color: yellow;
`;
