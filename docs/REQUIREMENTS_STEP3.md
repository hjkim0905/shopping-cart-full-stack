# 요구사항 명세서

```
selectedItemIds: [1, 2, 3, ...], // 장바구니 선택된 id 배열
coupons: [], // 쿠폰 id 배열
isRemoteArea: false // 제주 및 도서산간지역 체크 유무
```

```
orderAmount: ..., // 주문금액
couponDiscount: ..., // 쿠폰할인금액
deliveryFee: ..., // 배송비
totalPrice: ..., // 총 결제금액
appliedCoupons: [...], // 적용된 쿠폰 id 배열
```

## 주문 확인 전 (장바구니 페이지)

- 첫페이지 진입시/장바구니에서 주문할 상품 선택 및 수량 변경 시
  - FE -> BE로
    ```
    requestBody: {
    selectedItemIds: [1, 2, 3, ...],
    coupons: [],
    isRemoteArea: false
    }
    ```
  - selectecdItemIds에 있는 id(CartItem 테이블의 primary key)를 대조해서 CartItem의 해당 row에 있는 productId(FK)와 Prouct 테이블의 id(PK)로 JOIN해서 price, quantity 접근
  - DB -> BE
    - price, quantity 가져오기
  - BE
    - 가져온 price, quantity로 주문금액, 쿠폰할인금액, 배송비, 총결제금액, 적용한 쿠폰 반환
  - BE -> FE
    ```
    responseBody: {
      orderAmount: ...,
      couponDiscount: ...,
      deliveryFee: ...,
      totalPrice: ...,
      appliedCoupons: [...],
      }
    ```

## 주문 확인 후 (주문확인 페이지)

- 주문확인 페이지 첫 진입시
  - FE -> BE로

  ```
  requestBody: {
    selectedItemIds: [1, 2, 3, ...],
    coupons: [0, 1, 2, 3],
    isRemoteArea: false
    }
  ```

  - BE -> DB
    - selectecdItemIds에 있는 id(CartItem 테이블의 primary key)를 대조해서 CartItem의 해당 row에 있는 productId(FK)와 Prouct 테이블의 id(PK)로 JOIN해서 price, quantity 접근
  - DB -> BE
    - price, quantity 가져오기
  - BE
    - 가져온 price, quantity로 주문금액, 쿠폰할인금액, 배송비, 총결제금액, 적용한 쿠폰 반환
  - BE -> FE
    ```
    responseBody: {
      orderAmount: ...,
      couponDiscount: ...,
      deliveryFee: ...,
      totalPrice: ...,
      appliedCoupons: [...],
      }
    ```

- 도서 산간지역 체크시
  - FE -> BE로

    ```
    requestBody: {
    selectedItemIds: [1, 2, 3, ...],
    coupons: [0, 1, 2, 3],
    isRemoteArea: true
    }
    ```

  - BE -> DB
    - selectecdItemIds에 있는 id(CartItem 테이블의 primary key)를 대조해서 CartItem의 해당 row에 있는 productId(FK)와 Prouct 테이블의 id(PK)로 JOIN해서 price, quantity 접근
  - DB -> BE
    - price, quantity 가져오기
  - BE
    - 가져온 price, quantity로 주문금액, 쿠폰할인금액, 배송비, 총결제금액, 적용한 쿠폰 반환
  - BE -> FE
    ```
    responseBody: {
      orderAmount: ...,
      couponDiscount: ...,
      deliveryFee: ...,
      totalPrice: ...,
      appliedCoupons: [...],
      }
    ```

- 쿠폰 적용버튼 클릭 시 쿠폰 적용 모달
  - FE -> BE로
    ```
    requestBody: {
    selectedItemIds: [1, 2, 3, ...],
    // 여기서는 최대 2개의 id를 보낸다.
    coupons: [1, 2],
    isRemoteArea: true
    }
    ```
  - BE -> DB
    - selectecdItemIds에 있는 id(CartItem 테이블의 primary key)를 대조해서 CartItem의 해당 row에 있는 productId(FK)와 Prouct 테이블의 id(PK)로 JOIN해서 price, quantity 접근
  - DB -> BE
    - price, quantity 가져오기
  - BE
    - 가져온 price, quantity로 주문금액, 쿠폰할인금액, 배송비, 총결제금액, 적용한 쿠폰 반환
  - BE -> FE
    ```
    responseBody: {
      orderAmount: ...,
      couponDiscount: ...,
      deliveryFee: ...,
      totalPrice: ...,
      appliedCoupons: [...],
      }
    ```
