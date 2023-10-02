import { Voucher, VoucherAttribute } from '../types';

export type CreateVoucherDTO = Partial<Voucher> & {
  type: string;
  status: string;
  value: number;
  costInPoint: number;
  redemptionLimit?: number;
  attribute: Language<VoucherAttribute>;
  termsAndConditions: Language;
  quantity: number;
  startDate?: string;
  endDate?: string;
  isAutoGenerateCode?: boolean;
  createdBy?: number;
  updatedBy?: number;
};

export type UpdateVoucherDTO = {
  status: string;
};
