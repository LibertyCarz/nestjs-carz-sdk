import { PRODUCT_STATE, PRODUCT_STATUS } from '../types';

export type CreateCarPartMerchant = {
  partType: string;

  store: number;

  productBrand: string;

  name: string;

  photos: string[];

  video: string;

  cover: string;

  merchantId: number;

  state: PRODUCT_STATE;

  price: number;

  isInstallationSupport: boolean;

  description: string;

  note: string;
};

export type UpdateCarPartMerchant = Partial<CreateCarPartMerchant> & {
  status?: PRODUCT_STATUS;
};
