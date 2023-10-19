import { VoucherAttribute, VoucherDiscount } from '../types';

export type ListVoucherDTO = BaseRequestParams & {
  type?: string;
  status?: string;
};

export type CreateVoucherDTO = {
  type: string;
  status: string;
  value: number;
  costInPoint: number;
  redemptionLimit?: number;
  attribute: Language<VoucherAttribute>;
  discount?: VoucherDiscount;
  quantity: number;
  startDate?: string;
  endDate?: string;
  isAutoGenerateCode?: boolean;
};

export type UpdateVoucherDTO = {
  status: string;
};

export type ImportVoucherCodeDTO = {
  code: string[];
  voucherId: string;
};

export type RollbackVoucherDTO = {
  id: string;
};

export type SendUsersVoucherCodeDTO = {
  users: SDK.User[];
};
