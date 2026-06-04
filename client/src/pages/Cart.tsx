import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Checkbox from '../components/ui/Checkbox';
import type { CartItemType } from '../types/cartItemType';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import { deleteCartProduct, getCartProducts, updateCartProduct } from '../api/api';

function Cart() {
  const [cartProducts, setCartProducts] = useState<CartItemType[]>([]);
  const [checkedIds, setCheckedIds] = useState<Set<number>>(() => {
    const savedCheckedIds = localStorage.getItem('cart-checked');
    return savedCheckedIds ? new Set(JSON.parse(savedCheckedIds)) : new Set();
  });

  useEffect(() => {
    const fetchCart = async (): Promise<void> => {
      try {
        const responseData = await getCartProducts();
        setCartProducts(responseData);

        if (localStorage.getItem('cart-checked') === null) {
          setCheckedIds(new Set(responseData.map((item) => item.id)));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    const item = cartProducts.find((product) => product.id === productId);
    if (!item) return;

    const previous = [...cartProducts];

    if (newQuantity < 1 || newQuantity > 99) return;
    const updated = { ...item, quantity: newQuantity };
    setCartProducts((prev) =>
      prev.map((product) => (product.id === productId ? updated : product)),
    );

    try {
      await updateCartProduct(updated);
    } catch (error) {
      setCartProducts(previous);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const deleteCartItem = async (productId: number): Promise<void> => {
    try {
      await deleteCartProduct(productId);
      setCartProducts((prev) => prev.filter((product) => product.id !== productId));

      setCheckedIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        localStorage.setItem('cart-checked', JSON.stringify([...next]));
        return next;
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const allChecked = cartProducts.length > 0 && checkedIds.size === cartProducts.length;

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

  const calculateOrderAmount = (cartProducts: CartItemType[], checkedIds: Set<number>): number => {
    return cartProducts
      .filter((product) => checkedIds.has(product.id))
      .reduce((sum, product) => sum + product.price * product.quantity, 0);
  };

  const calculateDeliveryFee = (orderAmount: number): number => {
    if (orderAmount >= 100000 || orderAmount === 0) return 0;
    else return 3000;
  };

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
      {cartProducts.length > 0 ? (
        <CartList>
          <Checkbox checked={allChecked} onChange={handleAllCheck} label="전체선택" />
          {cartProducts.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              checked={checkedIds.has(item.id)}
              onCheck={(checked) => handleItemCheck(item.id, checked)}
              handleDelete={() => deleteCartItem(item.id)}
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
      <OrderConfirmButton disabled={checkedIds.size === 0}>주문하기</OrderConfirmButton>
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
