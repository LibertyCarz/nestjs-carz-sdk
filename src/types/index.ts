import { HttpService } from '@nestjs/axios';
import { IncomingHttpHeaders } from 'http';

export type SdkFile = {
  path?: string;
  type?: string;
  owner?: number;
};

export type PostAdditionalAttributes = {
  views?: number;
  likes?: number;
  comments?: number;
};

export type Post = BaseMongooseType & {
  name?: string;
  content?: string;
  user?: number;
  userType?: number;
  updateBy?: number;
  authorName?: string;
  updateByName?: string;
  status?: string;
  files?: SdkFile[];
  app?: string;
  additionalAttributes?: PostAdditionalAttributes;
};

export type Comment = BaseMongooseType & {
  post: string | Post;
  text: string;
  image?: string;
  user: number;
  userType: number;
  parent?: string | Comment;
  node?: string;
  status?: string;
};

export type HttpServiceRequest = Parameters<HttpService['request']>[0];

export class BaseInternalRequest<
  TParams extends BaseRequestParams = BaseRequestParams,
> {
  headers: IncomingHttpHeaders;
  params: TParams;
  constructor(data: Partial<BaseInternalRequest<TParams>>) {
    this.headers = data.headers;
    this.params = data.params;
  }
  public buildRequestConfig(
    headers: IncomingHttpHeaders = {},
  ): HttpServiceRequest {
    headers['accept-language'] = this.headers?.['accept-language'];
    headers['authorization'] = this.headers?.['authorization'];
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
