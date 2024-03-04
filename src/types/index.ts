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

export type SdkHeader = { [key: string]: string };

export class BaseModelSQLType {
  id?: number | string;
  status?: string;
  updatedAt?: Date;
  createdAt?: Date;
  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.status = data.status;
      this.updatedAt = data.updatedAt;
      this.createdAt = data.createdAt;
    }
  }
}
export class BaseInternalRequest<
  TParams extends BaseRequestParams = BaseRequestParams,
> {
  headers: SdkHeader;
  params: TParams;
  constructor(data?: Partial<BaseInternalRequest<TParams>>) {
    this.headers = data?.headers;
    this.params = data?.params;
  }
  public buildRequestConfig(headers: SdkHeader = {}) {
    for (const key in headers) {
      if (Object.prototype.hasOwnProperty.call(headers, key)) {
        this.headers[key] = headers[key];
      }
    }
    return {
      headers: this.headers,
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

export type FileModel = {
  path?: string;

  type?: string;

  thumbnails?: string;

  url?: string;
};
export class MultipleLanguages {
  en?: string;
  zh?: string;
  km?: string;
}
export class BaseMongoose {
  _id?: string;
  status?: string;
  updatedAt?: Date;
  createdAt?: Date;
  constructor(data?: Partial<BaseMongoose>) {
    this._id = data?._id;
    this.status = data?.status;
    this.updatedAt = data?.updatedAt;
    this.createdAt = data?.createdAt;
  }
}

export type BaseUser = {
  user: number;
  userType: number;
};
