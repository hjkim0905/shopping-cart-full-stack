import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Cart from '../pages/Cart';
import { server } from './mocks/server';
import { errorHandlers } from './mocks/handlers';
import { http, HttpResponse } from 'msw';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});
afterAll(() => server.close());

const renderCart = () =>
  render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>,
  );

const BASE_URL = 'https://shopping-cart-full-stack-production-9304.up.railway.app';

describe('Cart', () => {
  test('로딩 중 스피너를 표시한다', () => {
    renderCart();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('상품 목록을 불러온 후 표시한다', async () => {
    renderCart();

    await waitFor(() => {
      expect(screen.getByText('나이키 퍼시픽 주니어')).toBeInTheDocument();
      expect(screen.getByText('나이키 에어맥스 95')).toBeInTheDocument();
    });
  });

  test('API 실패 시 에러 메시지를 표시한다', async () => {
    server.use(errorHandlers.getCartError);
    renderCart();

    await waitFor(() => {
      expect(screen.getByText('장바구니 목록을 불러오지 못했습니다.')).toBeInTheDocument();
    });
  });

  test('진입 시 전체선택이 기본값이다', async () => {
    renderCart();

    await waitFor(() => {
      expect(screen.getByText('나이키 퍼시픽 주니어')).toBeInTheDocument();
    });

    expect(screen.getByText('전체선택')).toBeInTheDocument();
  });

  test('전체선택 해제 시 주문하기 버튼이 비활성화된다', async () => {
    renderCart();

    await waitFor(() => {
      expect(screen.getByText('나이키 퍼시픽 주니어')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText('전체선택'));

    expect(screen.getByText('주문하기')).toBeDisabled();
  });

  test('장바구니가 비어있으면 빈 상태 메시지를 표시한다', async () => {
    server.use(
      http.get(`${BASE_URL}/cart`, () => HttpResponse.json([])),
    );
    renderCart();

    await waitFor(() => {
      expect(screen.getByText('장바구니에 담은 상품이 없습니다.')).toBeInTheDocument();
    });
  });
});
