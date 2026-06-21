export type CouponType = 'FIXED5000' | 'BOGO' | 'FREESHIPPING' | 'MIRACLESALE';

export interface Coupon {
  id: number;
  name: string;
  type: CouponType;
  expirationDate: string;
}

export interface OrderPreviewRequest {
  selectedItemIds: number[];
  // 생략하면 서버가 전체 쿠폰 중 최적 조합을 자동 선택한다.
  coupons?: number[];
  isRemoteArea: boolean;
}

export interface OrderPreviewResponse {
  orderAmount: number;
  couponDiscount: number;
  deliveryFee: number;
  // 쿠폰 미적용 기준 배송비 (FREESHIPPING 절감액 표시용)
  originalDeliveryFee: number;
  totalPrice: number;
  appliedCoupons: number[];
}
