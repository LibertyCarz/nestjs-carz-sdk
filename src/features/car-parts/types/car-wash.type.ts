import { BaseMongoose, BaseUser } from '../../../types';
import { CarWashCategory } from './car-wash-category.type';
import { CarStore, Location } from '../../../features/car-stores';
import { AddressAttribute } from '../dto';

export enum CAR_WASH_SIZE {
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
  SUPER_CAR = 'super_car',
}
export enum CAR_WASH_STATUS {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  BLOCKED = 'blocked',
}

export class CarWash extends BaseMongoose {
  category: CarWashCategory;

  photos: string[];

  cover: string;

  publicCoverImage: string;

  video: string;

  name: string;

  status: CAR_WASH_STATUS;

  description: string;

  sellingPrice: Record<CAR_WASH_SIZE, number>;

  store: CarStore;

  location: Location;

  addressAttribute: AddressAttribute;

  updatedBy: BaseUser;

  size?: CAR_WASH_SIZE; // when creating booking => to assign size

  merchantId: number;
  constructor(data?: Partial<CarWash>) {
    super(data);
    this.category = data?.category;
    this.photos = data?.photos;
    this.video = data?.video;
    this.name = data?.name;
    this.status = data?.status;
    this.description = data?.description;
    this.sellingPrice = data?.sellingPrice;
    this.location = data?.location;
    this.updatedBy = data?.updatedBy;
    this.addressAttribute = data?.addressAttribute;
    this.store = data?.store;
    this.size = data?.size;
    this.merchantId = data?.merchantId;
  }
}

export type CountBy<T> = {
  item: T;
  count: number;
};
