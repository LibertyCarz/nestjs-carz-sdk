import { CarPartType } from './car-part-type.type';

export enum PRODUCT_STATUS {
  PUBLISH = 'publish',
  UNPUBLISH = 'unpublish',
  BLOCKED = 'blocked',
}

export enum PRODUCT_STATE {
  USED = 'used',
  NEW = 'new',
}

export type ProductAttribute = {
  productType: CarPartType;
  isInstallationSupport: boolean;
};

export type CarPart = BaseMongooseType & {
  name: string;
  productBrand: string;
  cover: string;
  video: string;
  photos: string[];
  store: number;
  merchant: number;
  price: number;
  state: PRODUCT_STATE;
  status: PRODUCT_STATUS;
  attribute: ProductAttribute;
  description: string;
  note: string;
  updatedBy: { user: number; userType: number };
};
