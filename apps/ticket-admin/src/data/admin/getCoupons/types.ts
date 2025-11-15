export type CouponItem = {
  couponId: number;
  createDate: string;
  discountRate: number;
  couponCode: string;
  memo?: string;
  usable: boolean;
};

export type GetCouponsParams = {
  eventId: number;
};

export type GetCouponsResponse = {
  data: CouponItem[];
};
