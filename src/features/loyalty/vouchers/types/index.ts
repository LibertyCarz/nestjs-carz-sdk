export * from './voucher.type';
import { Request } from 'express';
export class BaseVoucherRequest<TParams = Partial<BasePagination & SDK.User>> {
  request: Request;
  params: TParams;
  constructor(data: Partial<BaseVoucherRequest<TParams>>) {
    this.request = data.request;
    this.params = data.params;
  }
}
