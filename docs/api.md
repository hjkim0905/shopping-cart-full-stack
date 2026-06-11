## API 명세서

base url : https://shopping-cart-full-stack-production-9304.up.railway.app/
PORT: 8080
CORS 설정:

- Access-Control-Allow-Origin
  - http://localhost:3000
- Access-Control-Allow-Methods
  - GET, POST, PUT, DELETE (옵션 없이)
- Access-Control-Allow-Headers
  - Origin, X-Requested-With, Content-Type, Accept

---

### 상품

- 상품 조회

  | 메서드 | 요청 URL |
  | ------ | -------- |
  | GET    | /product |
  - Response Syntax

    ```
    [
        {
          "id": 1,
          "imageUrl": "https://example.com/product-image.jpg",
          "name": "상품명",
          "price": 10000,
          "quantity": 1,
        },
        {
          "id": 2,
          "imageUrl": "https://example.com/product2-image.jpg",
          "name": "상품명2",
          "price": 20000,
          "quantity": 2,
        }
    ]
    ```

  - Status Code
    - 200 OK: 성공적으로 상품들을 불러왔을 때
    - 500 Error: 실패했을 때 (DB에 Product 테이블이 존재하지 않을 때)

- 상품 등록

  | 메서드 | 요청 URL |
  | ------ | -------- |
  | POST   | /product |
  - Request Syntax

    ```
    {
      "imageUrl": "https://example.com/product3-image.jpg",
      "name": "상품명3",
      "price": 10000,
      "quantity": 5,
    }
    ```

  - Status Code
    - 201 OK: 성공적으로 상품이 생성되었을 때
    - 400 Bad Request: 실패했을 때 (잘못된 서버 요청)
    - 500 Error: 실패했을 때 (DB에 Product 테이블이 존재하지 않을 때)

- 상품 삭제
  | 메서드 | 요청 URL |
  | --- | --- |
  | DELETE | /product/:id |
  - Request Parameter
    | 파라미터 | 설명 |
    | ------ | -------- |
    | id | 상품 id |

  - Status Code
    - 204 OK: 성공적으로 상품이 삭제되었을 때
    - 404 Error: 실패했을 때 (해당 id의 상품이 Product 테이블에 존재하지 않을 때)
      — FE가 "삭제할 대상이 없었다"는 사실을 인지할 수 있도록 멱등 처리 대신 명시적 오류를 반환
    - 500 Error: 실패했을 때 (DB에 Product 테이블이 존재하지 않을 때)

---

### 장바구니

- 장바구니 상품 조회

  | 메서드 | 요청 URL |
  | ------ | -------- |
  | GET    | /cart    |
  - Response Syntax

    ```
    [
        {
          "id": 1,
          "imageUrl": "https://example.com/product-image.jpg",
          "name": "상품명",
          "price": 10000,
          "quantity": 1,
        },
        {
          "id": 2,
          "imageUrl": "https://example.com/product2-image.jpg",
          "name": "상품명2",
          "price": 20000,
          "quantity": 2,
        }
    ]
    ```

  - Status Code
    - 200 OK: 성공적으로 장바구니에 담긴 상품들을 불러왔을 때
    - 500 Error: 실패했을 때 (DB에 Cart 테이블이 존재하지 않을 때)

- 상품 등록

  | 메서드 | 요청 URL  |
  | ------ | --------- |
  | POST   | /cart/:id |
  - Request Parameter
    | 파라미터 | 설명 |
    | ------ | -------- |
    | id | 상품 id |
  - Status Code
    - 201 OK: 성공적으로 상품이 Cart 테이블에 생성되었을 때
    - 500 Error: 실패했을 때 (DB에 Cart 테이블이 존재하지 않을 때)

- 상품 수량 변경

  | 메서드 | 요청 URL |
  | ------ | -------- |
  | PUT    | /cart    |
  - Request Syntax

    ```
    {
      "id": 3
      "imageUrl": "https://example.com/product3-image.jpg",
      "name": "상품명3",
      "price": 10000,
      "quantity": 6,
    }
    ```

  - Status Code
    - 204 OK: 성공적으로 장바구니에 담긴 상품의 수량이 변겨되었을 때
    - 400 Bad Request: 실패했을 때 (잘못된 서버 요청)
    - 404 Error: 실패했을 때 (해당 id의 상품이 Cart 테이블에 존재하지 않을 때)
    - 500 Error: 실패했을 때 (DB에 Cart 테이블이 존재하지 않을 때)

- 상품 삭제
  | 메서드 | 요청 URL |
  | --- | --- |
  | DELETE | /cart/:id |
  - Request Parameter
    | 파라미터 | 설명 |
    | ------ | -------- |
    | id | 상품 id |

  - Status Code
    - 204 OK: 성공적으로 상품이 삭제되었을 때
    - 404 Error: 실패했을 때 (해당 id의 상품이 Cart 테이블에 존재하지 않을 때)
      — FE가 "삭제할 대상이 없었다"는 사실을 인지할 수 있도록 멱등 처리 대신 명시적 오류를 반환
    - 500 Error: 실패했을 때 (DB에 Cart 테이블이 존재하지 않을 때)

---

### 쿠폰

- 쿠폰 목록 조회

  | 메서드 | 요청 URL |
  | ------ | -------- |
  | GET    | /coupons |
  - Response Syntax

    ```
    [
        {
          "id": 1,
          "name": "5,000원 할인 쿠폰",
          "type": "FIXED5000",
          "expirationDate": "2026-11-30"
        },
        {
          "id": 2,
          "name": "2+1 쿠폰",
          "type": "BOGO",
          "expirationDate": "2026-06-30"
        }
    ]
    ```

  - Status Code
    - 200 OK: 성공적으로 쿠폰 목록을 불러왔을 때
    - 500 Error: 실패했을 때 (DB에 Coupon 테이블이 존재하지 않을 때)

---

### 주문

- 주문 금액 계산

  | 메서드 | 요청 URL       |
  | ------ | -------------- |
  | POST   | /order/preview |
  - Request Syntax

    ```
    {
      "selectedItemIds": [1, 2, 3],
      "coupons": [1, 2],
      "isRemoteArea": false
    }
    ```

  - Request Body
    | 필드 | 타입 | 설명 |
    | --- | --- | --- |
    | selectedItemIds | number[] | 선택된 CartItem id 배열 |
    | coupons | number[] | 적용할 쿠폰 id 배열 (최대 2개) |
    | isRemoteArea | boolean | 제주 및 도서산간 지역 여부 |

  - Response Syntax

    ```
    {
      "orderAmount": 150000,
      "couponDiscount": 5000,
      "deliveryFee": 0,
      "totalPrice": 145000,
      "appliedCoupons": [1]
    }
    ```

  - Response Body
    | 필드 | 타입 | 설명 |
    | --- | --- | --- |
    | orderAmount | number | 쿠폰 적용 전 주문금액 |
    | couponDiscount | number | 쿠폰 할인금액 |
    | deliveryFee | number | 배송비 |
    | totalPrice | number | 최종 결제금액 (orderAmount - couponDiscount + deliveryFee) |
    | appliedCoupons | number[] | 실제 적용된 쿠폰 id 배열 |

  - Status Code
    - 200 OK: 성공적으로 주문 금액을 계산했을 때
    - 400 Bad Request: 실패했을 때 (selectedItemIds가 비어있거나 coupons가 3개 이상일 때)
    - 500 Error: 실패했을 때 (DB에 CartItem 또는 Coupon 테이블이 존재하지 않을 때)
