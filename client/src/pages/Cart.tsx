import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useCart } from '../hooks/useCart';
import CartContent from '../components/CartContent';

function Cart() {
  const { cartProducts, isLoading, error, handleQuantityChange, deleteCartItem } = useCart();

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
        <CartContent
          cartProducts={cartProducts}
          handleQuantityChange={handleQuantityChange}
          deleteCartItem={deleteCartItem}
        />
      ) : (
        <EmptyCart>
          <p>장바구니에 담은 상품이 없습니다.</p>
        </EmptyCart>
      )}
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

