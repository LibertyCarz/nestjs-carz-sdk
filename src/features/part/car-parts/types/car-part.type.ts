export enum CAR_PART_STATUS {
  PUBLISH = 'publish',
  UNPUBLISH = 'unpublish',
  BLOCKED = 'blocked',
}

export enum CAR_PART_STATE {
  USED = 'used',
  NEW = 'new',
}

export type CarPart = BaseMongooseType & {
  name: string;

  partType: BaseMongooseType;

  partBrand: string;

  cover: string;

  video: string;

  photos: string[];

  store: number;

  merchant: number;

  price: number;

  state: CAR_PART_STATE;

  status: CAR_PART_STATUS;

  isInstallationSupport: boolean;

  description: string;

  note: string;

  updatedBy: { user: number; userType: number };
};
