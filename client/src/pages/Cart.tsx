import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../components/ui/Checkbox';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import { useCart } from '../hooks/useCart';
import { useCartSelection } from '../hooks/useCartSelection';
import { calculateOrderAmount, calculateDeliveryFee } from '../utils/cartCalculations';

function Cart() {
  const navigate = useNavigate();

  const { cartProducts, isLoading, error, handleQuantityChange, deleteCartItem } = useCart();
  const { checkedIds, handleAllCheck, handleItemCheck } = useCartSelection(cartProducts, isLoading);

  const allChecked = cartProducts.length > 0 && checkedIds.size === cartProducts.length;

  return (
    <PageContainer>
      <Banner>
        <h1 id="banner-logo">SHOP</h1>
      </Banner>
      <CartTitle>
        <h1 id="cart-title">장바구니</h1>
        {cartProducts.length > 0 && (
          <p id="cart-description">현재 {cartProducts.length}종류의 상품이 담겨있습니다.</p>
        )}
      </CartTitle>
      {isLoading ? (
        <LoadingContainer>
          <Spinner data-testid="spinner" />
        </LoadingContainer>
      ) : error ? (
        <ErrorContainer>
          <p>{error}</p>
        </ErrorContainer>
      ) : cartProducts.length > 0 ? (
        <CartList>
          <Checkbox checked={allChecked} onChange={handleAllCheck} label="전체선택" />
          {cartProducts.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              checked={checkedIds.has(item.id)}
              onCheck={(checked) => handleItemCheck(item.id, checked)}
              onDelete={() => deleteCartItem(item.id)}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </CartList>
      ) : (
        <EmptyCart>
          <p>장바구니에 담은 상품이 없습니다.</p>
        </EmptyCart>
      )}
      <OrderSummary
        orderAmount={calculateOrderAmount(cartProducts, checkedIds)}
        calculateDeliveryFee={calculateDeliveryFee}
      />
      <OrderConfirmButton
        disabled={checkedIds.size === 0}
        onClick={() => {
          const orderAmount = calculateOrderAmount(cartProducts, checkedIds);
          const totalAmount = orderAmount + calculateDeliveryFee(orderAmount);
          const checkedProducts = cartProducts.filter((p) => checkedIds.has(p.id));
          const totalQuantity = checkedProducts.reduce((sum, p) => sum + p.quantity, 0);
          navigate('/shopping-cart/confirm', {
            state: {
              totalAmount,
              productCount: checkedIds.size,
              totalQuantity,
            },
          });
        }}
      >
        주문하기
      </OrderConfirmButton>
    </PageContainer>
  );
}

export default Cart;

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 6.5rem;
  box-sizing: border-box;
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

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e0e0e0;
  border-top-color: #000000;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const ErrorContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-family: Noto Sans;
    font-size: 14px;
    color: #ff4d4f;
    text-align: center;
  }
`;

const CartList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 1.5rem 3.25rem 1.5rem;
  flex: 1;
  overflow-y: auto;
`;

const EmptyCart = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-family: Noto Sans;
    font-weight: 400;
    font-style: Regular;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;
  }
`;

const OrderConfirmButton = styled.button<{ disabled: boolean }>`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 580px;
  height: 64px;
  background-color: ${({ disabled }) => (disabled ? '#BEBEBE' : '#000000')};
  color: #ffffff;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  font-family: Noto Sans;
  font-weight: 700;
  font-style: Bold;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
`;
