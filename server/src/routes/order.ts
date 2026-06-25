import express, { Request, Response } from 'express';
import { DB } from '../database';
import { calculateOrderPreview, isCouponApplicable } from '../coupon-calculator';

const orderRouter = express.Router();
orderRouter.use(express.json());

const MAX_COUPONS = 2;

orderRouter.post('/preview', (req: Request, res: Response) => {
  if (!DB.Cart || !DB.Coupons) {
    return res.status(500).json({ errorMessage: '서버에 일시적인 오류가 발생했습니다.' });
  }

  const { selectedItemIds, coupons, isRemoteArea } = req.body ?? {};

  if (!Array.isArray(selectedItemIds) || selectedItemIds.length === 0) {
    return res.status(400).json({ errorMessage: '선택된 상품이 없습니다.' });
  }

  // coupons 미지정(null/undefined) → 전체 쿠폰을 후보로 자동 최적화한다.
  // coupons 배열 → 명시된 쿠폰만 후보로 사용한다. (빈 배열이면 쿠폰 미적용)
  const isAutoOptimize = coupons === undefined || coupons === null;
  if (!isAutoOptimize && (!Array.isArray(coupons) || coupons.length > MAX_COUPONS)) {
    return res.status(400).json({ errorMessage: '쿠폰은 최대 2개까지 사용할 수 있습니다.' });
  }

  const items = DB.Cart.filter((item) => selectedItemIds.includes(item.id));
  const orderAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 조건 미충족 쿠폰은 후보에서 제외해 자동 선택/적용되지 않도록 한다.
  const applicableCoupons = DB.Coupons.filter((coupon) =>
    isCouponApplicable(coupon.type, items, orderAmount),
  );
  const candidates = isAutoOptimize
    ? applicableCoupons
    : applicableCoupons.filter((coupon) => coupons.includes(coupon.id));

  const result = calculateOrderPreview(
    items,
    candidates,
    Boolean(isRemoteArea),
    DB.Coupons,
  );
  res.status(200).json(result);
});

export default orderRouter;
