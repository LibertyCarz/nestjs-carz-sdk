export * from './campaign.type';
import { HttpService } from '@nestjs/axios';
import { IncomingHttpHeaders } from 'http';

export class BaseCampaignRequest<
  TParams extends BaseRequestParams = BaseRequestParams,
> {
  headers: IncomingHttpHeaders;
  params: TParams;
  constructor(data: Partial<BaseCampaignRequest<TParams>>) {
    this.headers = data.headers;
    this.params = data.params;
  }
  public buildRequestConfig(
    headers: IncomingHttpHeaders = {},
  ): Parameters<HttpService['request']>[0] {
    headers['accept-language'] = this.headers['accept-language'];
    headers['authorization'] = this.headers['authorization'];
    return {
      headers,
      params: this.params,
    };
  }

  public static buildSDKUser(
    user: { id: number; userType?: number },
    language = 'en',
  ): SDK.User {
    return {
      id: user.id,
      userType: user.userType || 1,
      language,
    };
  }
}
