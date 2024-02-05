import { BaseSdkFilter } from '../../../../shared/base.request';
import { BaseModelSQLType } from '../../../../types';
import { SubscriptionPackage } from '../../subscription-package/dto';
import { TransactionSubscription } from './transaction-subscription.dto';

export class MerchantSubscription extends BaseModelSQLType {
  merchantId?: number;

  subscriptionPackage?: number | SubscriptionPackage;

  status?: string;

  updatedBy?: number;

  postedHotSale: number; // total posted in host sale

  transaction?: TransactionSubscription;

  postedCar?: number;

  quotation?: number;

  startDate?: Date;

  endDate?: Date;

  resetDate?: Date;

  postQuota?: {
    unlimited: boolean;
    quota: number;
  };

  constructor(data: Partial<MerchantSubscription> = null) {
    super(data);
    if (data) {
      this.id = data.id;
      this.merchantId = data.merchantId;
      this.subscriptionPackage = data.subscriptionPackage;
      this.status = data.status;
      this.updatedBy = data.updatedBy;
      this.transaction = data.transaction;
      this.postedCar = data.postedCar;
      this.quotation = data.quotation;
      this.startDate = data.startDate;
      this.endDate = data.endDate;
      this.resetDate = data.resetDate;
    }
  }
}
export class ListMerchantSubscriptionDTO extends BaseSdkFilter {
  status?: string;
  merchantId?: number;
}

export class UpdateMerchantSubscriptionDTO {
  status: string;
  updatedBy?: number;
}

export class ChangeQuotaSubscriptionDTO {
  postedHotSale?: number;
  postedCar?: number;
  merchantId: number;
}

export type RenewTime = {
  start?: string;
  end?: string;
};

export type RenewTimeDTO = {
  quotation: number;
};
