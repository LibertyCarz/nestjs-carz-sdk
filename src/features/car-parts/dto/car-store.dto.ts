export enum CAR_STORE_STATUS {
  ENABLE = 'enabled',
  DISABLE = 'disabled',
}
export type AddressAttribute = {
  id?: number;
  provinceId?: number;
  districtId?: number;
  wardId?: number;
};
export type CarStoreInternal = {
  id: number;

  merchantId: number;

  name: string;

  status?: CAR_STORE_STATUS;

  ordinalNumber?: number;

  rating?: number;

  phone?: string;

  email?: string;

  startAt?: string;

  endAt?: string;

  cover?: string;

  isDefault: boolean;

  files?: string[];

  address: string;

  addressAttribute: AddressAttribute;

  latitude?: string;

  longitude?: string;

  updatedAt?: Date;

  createdAt?: Date;
};
