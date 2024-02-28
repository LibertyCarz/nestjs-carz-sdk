import { VoucherAttribute, VoucherCodeOrder, VoucherDiscount } from '../types';

export type ListVoucherDTO = BaseRequestParams & {
  type?: string;
  status?: string;
  userType?: number;
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
  userType?: number;
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

export type UpdateVoucherCodeDTO = {
  ids?: string[];
  status?: string;
  order?: VoucherCodeOrder;
};

export type CalculateVoucherCodeDTO = {
  transactionId: string;
  userId: number;
  userType: number;
};
