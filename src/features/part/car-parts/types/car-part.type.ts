import { FileModel } from 'src/types';

export type CarPartFile = FileModel;

export enum CarPartStatus {
  PUBLISH = 'publish',
  UNPUBLISH = 'unpublish',
}

export enum CarPartState {
  USED = 'used',
  NEW = 'new',
}

export type CarPart = BaseMongooseType & {
  productName: string;

  cover: CarPartFile;

  video: CarPartFile;

  photos: CarPartFile[];

  price: number;

  state: CarPartState;

  status: CarPartStatus;

  isInstallationSupport: boolean;

  description: string;

  note: string;

  partTypeId: number;

  productBrand: string;

  //
  //   carStore: CarStore;

  merchantId: number;

  updatedBy: SDK.User;
};
