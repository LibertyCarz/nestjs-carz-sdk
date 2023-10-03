export * from './voucher.type';
import { HttpService } from '@nestjs/axios';
import { IncomingHttpHeaders } from 'http';

export type HttpServiceRequest = Parameters<HttpService['request']>[0];

export class BaseVoucherRequest<
  TParams extends BaseRequestParams = BaseRequestParams,
> {
  headers: IncomingHttpHeaders;
  params: TParams;
  constructor(data: Partial<BaseVoucherRequest<TParams>>) {
    this.headers = data.headers;
    this.params = data.params;
  }
  public buildRequestConfig(
    headers: IncomingHttpHeaders = {},
  ): HttpServiceRequest {
    headers['accept-language'] = this.headers['accept-language'];
    headers['authorization'] = this.headers['authorization'];
    return {
      headers,
      params: this.params,
    };
  }
}
