export * from './voucher.type';
import { Request } from 'express';
import { HttpServiceRequest } from 'src/types';

export class BaseVoucherRequest<
  TParams extends BaseRequestParams = BaseRequestParams,
> {
  request: Request;
  params: TParams;
  constructor(data: Partial<BaseVoucherRequest<TParams>>) {
    this.request = data.request;
    this.params = data.params;
  }
  public buildRequestConfig(): HttpServiceRequest {
    return {
      headers: this.request.headers,
      params: this.params,
    };
  }
}
