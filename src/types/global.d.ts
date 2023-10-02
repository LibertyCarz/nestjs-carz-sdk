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
    offset: number;
  };

  export type BaseResponse<T> = {
    data: T;
    total: number;
  };
}
