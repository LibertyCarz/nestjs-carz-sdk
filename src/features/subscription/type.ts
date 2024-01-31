export type SubscriptionPrice = {
  duration: number; // months
  price: number; //final price
  discount?: number; // amount of %
};
export enum BENEFIT_CODE {
  CAR_PORT = 'carPost', // number new car posts per month
  HOT_SALE = 'hotSale', // [Y] number hot sales in [Z] number days per month
  CHAT_WITH_PROSPECTS = 'chatWithProspects', // Chat directly with prospect customers
  COMMUNITY = 'community', // Can post on community
  REQUEST_AUCTION = 'requestAuction', // Request to create auction
  CHECK_CAR = 'checkCar', //Request for car checks
}
export enum BENEFIT_TYPE {
  MAIN = 'main',
  OTHER = 'other',
}
export type CommissionConfig = {
  fee?: number;
  percent?: number;
  start?: number;
  end?: number;
};
export class SubscriptionBenefit {
  code: BENEFIT_CODE;
  type: BENEFIT_TYPE;
  hidden?: boolean;
  unlimited?: boolean;
  quota?: number;
  duration?: number; // days

  constructor(data?: any) {
    if (data) {
      this.code = data.code;
      this.type = data.type;
      this.hidden = data.hidden;
      this.unlimited = data.unlimited;
      this.quota = data.quota;
      this.duration = data.duration;
      if (data.unlimited) {
        this.unlimited = true;
      } else {
        this.quota = data.quota;
      }
    }
  }
}

export class BaseFile {
  path?: string;
  name?: string;
  updatedBy?: string;
  createdAt?: Date;
  constructor(data: any) {
    if (data) {
      this.path = data.path;
      this.name = data.name;
      this.updatedBy = data.updatedBy;
      this.createdAt = data.createdAt || new Date();
    }
  }
}
