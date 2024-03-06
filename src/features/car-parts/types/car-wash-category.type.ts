import { BaseMongoose, BaseUser } from '../../../types';

export enum CAR_WASH_CATEGORY_STATUS {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

export class CarWashCategory extends BaseMongoose {
  image: string;

  name: Language;

  status: CAR_WASH_CATEGORY_STATUS;

  order: number;

  updatedBy: BaseUser;

  isOther?: boolean;

  constructor(data?: Partial<CarWashCategory>) {
    super(data);
    this.image = data?.image;
    this.name = data?.name;
    this.status = data?.status;
    this.order = data?.order;
    this.isOther = data?.isOther;
  }
}
