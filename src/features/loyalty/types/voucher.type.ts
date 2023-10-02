export const VOUCHER_CONSTANT = {
  TYPE: {
    CASH: 'cash',
    REWARD: 'reward',
  },
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  },
};

export type Voucher = BaseLoyaltyModel & {
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
};

export type VoucherAttribute = {
  name?: string;
  description?: string;
  image?: string;
  termsAndConditions?: string;
};

export type VoucherCode = BaseLoyaltyModel & {
  voucher?: Voucher;
  lbCode?: string;
  partnerCode?: string;
  userId?: number;
  userType?: number;
  redemptionDate?: string;
  status?: string;
};
