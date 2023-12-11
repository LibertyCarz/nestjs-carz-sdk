export {};

declare global {
  namespace SDK {
    export type User = {
      id: number;
      userType: number;
      language?: string;
    };
    export type List<T> = {
      items: T[];
      total: number;
    };
  }
  export type CarzHeader = {
    os?: string;
    appVersion?: string;
    deviceId?: string;
    osVersion?: string;
    agent?: string;
    apiVersion?: string;
    language?: string;
  };
  export type Language<T = string> = {
    en: T;
    km: T;
    zh: T;
  };
  export type BaseMongooseType = {
    _id?: string;
    status?: string;
    updatedAt?: Date;
    createdAt?: Date;
  };

  export type BasePagination = {
    limit: number;
    skip: number;
  };

  export type BaseResponse<T> = {
    data: T;
    total: number;
  };

  export type BaseRequestParams = Partial<BasePagination & SDK.User>;

  export type BaseRange = {
    from?: string;
    to?: string;
  };
}
