export type CouponType = 'FIXED5000' | 'BOGO' | 'FREESHIPPING' | 'MIRACLESALE';

export interface Coupon {
  id: number;
  name: string;
  type: CouponType;
  expirationDate: string;
}

export interface OrderPreviewRequest {
  selectedItemIds: number[];
  coupons: number[];
  isRemoteArea: boolean;
}

export interface OrderPreviewResponse {
  orderAmount: number;
  couponDiscount: number;
  deliveryFee: number;
  totalPrice: number;
  appliedCoupons: number[];
}
