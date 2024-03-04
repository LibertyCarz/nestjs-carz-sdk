import { BaseUser } from '../../../types';
import { CAR_WASH_SIZE, CAR_WASH_STATUS } from '../types/car-wash.type';
export class CreateCarWashDTO {
  categoryId: string;
  storeId: number;
  photos: string[];
  cover: string;
  publicCoverImage: string;
  video: string;
  name: string;
  status: CAR_WASH_STATUS;
  sellingPrice: Record<CAR_WASH_SIZE, number>;
  updatedBy: BaseUser;
  createdBy: BaseUser;

  constructor(data?: Partial<CreateCarWashDTO>) {
    this.categoryId = data?.categoryId;
    this.storeId = data?.storeId;
    this.photos = data?.photos;
    this.cover = data?.cover;
    this.publicCoverImage = data?.publicCoverImage;
    this.video = data?.video;
    this.name = data?.name;
    this.status = data?.status;
    this.sellingPrice = data?.sellingPrice;
    this.updatedBy = data?.updatedBy;
    this.createdBy = data?.createdBy;
  }
}