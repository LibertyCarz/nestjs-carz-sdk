export const VOUCHER_CONSTANT = {
  TYPE: {
    CASH: 'cash',
    REWARD: 'reward',
    DISCOUNT: 'discount',
  },
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  },
  CODE: {
    STATUS: {
      AVAILABLE: 'available',
      USED: 'used',
      EXPIRED: 'expired',
    },
    TRANSACTION_TYPE: {
      SENT: 'sent',
      REDEEMED: 'redeemed',
      CAMPAIGN: 'campaign',
    },
  },
};

export enum VOUCHER_CODE_ORDER_TYPE {
  PURCHASE_ORDER = 'PurchaseOrder',
  TRANSACTION_SUBSCRIPTION = 'TransactionSubscription',
}

export enum VOUCHER_DISCOUNT_TYPE {
  CASH = 'cash',
  PERCENTAGE = 'percentage',
}

export type VoucherDiscount = {
  type?: VOUCHER_DISCOUNT_TYPE;
  value?: number;
  percentage?: number;
  minOrderValue?: number;
  maxDiscountValue?: number;
};

export type Voucher = BaseMongooseType & {
  type?: string;
  value?: number;
  attribute?: Language<VoucherAttribute>;
  quantity?: number;
  costInPoint?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
  redemptionLimit?: number;
  createdBy: number;
  updatedBy: number;
  discount?: VoucherDiscount;
  userType?: number;
};

export type VoucherAttribute = {
  name?: string;
  description?: string;
  image?: string;
  termsAndConditions?: string;
};

export type VoucherCodeOrder = {
  orderId: string;
  orderType: VOUCHER_CODE_ORDER_TYPE;
};

export type VoucherCode = BaseMongooseType & {
  voucher?: Voucher;
  lbCode?: string;
  partnerCode?: string;
  userId?: number;
  userType?: number;
  redemptionDate?: string;
  status?: string;
  order?: VoucherCodeOrder;
};

export type VoucherTranslated = Voucher & VoucherAttribute;
