import { BaseSdkFilter } from '../../../shared/base.request';
import { BaseUser } from '../../../types';
import { CAR_WASH_SIZE, CAR_WASH_STATUS } from '../types/car-wash.type';
export class CreateCarWashDTO {
  categoryId: string;
  storeId: number;
  store: number;
  photos: string[];
  cover: string;
  publicCoverImage: string;
  video: string;
  name: string;
  status: CAR_WASH_STATUS;
  sellingPrice: Record<CAR_WASH_SIZE, number>;
  updatedBy: BaseUser;
  createdBy: BaseUser;
  merchantId: number;
  description: string;
  note: string;

  constructor(data?: Partial<CreateCarWashDTO>) {
    this.categoryId = data?.categoryId;
    this.storeId = data?.storeId;
    this.store = data?.store;
    this.photos = data?.photos;
    this.cover = data?.cover;
    this.publicCoverImage = data?.publicCoverImage;
    this.video = data?.video;
    this.name = data?.name;
    this.status = data?.status;
    this.sellingPrice = data?.sellingPrice;
    this.updatedBy = data?.updatedBy;
    this.createdBy = data?.createdBy;
    this.merchantId = data?.merchantId;
    this.description = data?.description;
    this.note = data?.note;
  }
}

export class UpdateCarWashMerchantDto extends CreateCarWashDTO {}

export type FilterCarWashDTO = {
  storeId?: number;
  categoryId?: string;
  status?: CAR_WASH_STATUS;
  ids?: string;
  name?: string;
  merchantId?: number;
} & BaseSdkFilter;

export class IncrementTotalBookingDTO {
  id: string;
  increment?: number;
}
