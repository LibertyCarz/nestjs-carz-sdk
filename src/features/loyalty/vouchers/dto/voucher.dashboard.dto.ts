import { VoucherAttribute } from '../types';

export type CreateVoucherDTO = {
  type: string;
  status: string;
  value: number;
  costInPoint: number;
  redemptionLimit?: number;
  attribute: Language<VoucherAttribute>;
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
