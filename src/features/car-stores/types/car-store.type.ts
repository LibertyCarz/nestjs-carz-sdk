import { Address } from '../../integrate';

export type Location = {
  type: string;
  coordinates: number[];
};

export type CarStore = BaseMongooseType & {
  merchantId: number;

  carStoreId: number;

  name: string;

  status?: string;

  ordinalNumber?: number;

  rating?: number;

  phone?: string;

  email?: string;

  startAt?: string;

  endAt?: string;

  cover?: string;

  location: Location;

  isDefault: boolean;

  files: string[];

  address: string;

  addressAttribute: Address;
};
