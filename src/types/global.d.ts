export {};

declare global {
  namespace SDK {
    export type User = {
      id: number;
      userType: number;
      language?: string;
    };
  }
  export type Language<T = string> = {
    en: T;
    km: T;
    zh: T;
  };
  export type BaseLoyaltyModel = {
    _id: string;
    createdAt: string;
    updatedAt: string;
  };

  export type ListResponse<T> = {
    items: T[];
    total: number;
  };

  export type BasePagination = {
    limit: number;
    offset: number;
  };
}
