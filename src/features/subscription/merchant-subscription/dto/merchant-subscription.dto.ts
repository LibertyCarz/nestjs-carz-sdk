import { BaseSdkFilter } from '../../../../shared/base.request';
import { BaseModelSQLType } from '../../../../types';

export class MerchantSubscription extends BaseModelSQLType {
  merchantId?: number;

  subscriptionPackage?: number;

  status?: string;

  updatedBy?: number;

  postCarQuota: number;

  postedHotSale: number; // total posted in host sale

  constructor(data: Partial<MerchantSubscription> = null) {
    super(data);
    if (data) {
      this.id = data.id;
      this.merchantId = data.merchantId;
      this.subscriptionPackage = data.subscriptionPackage;
      this.status = data.status;
      this.updatedBy = data.updatedBy;
      this.postCarQuota = data.postCarQuota;
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
  postCarQuota?: number;
  postedHotSale?: number;
  postedCar?: number;
  merchantId: number;
}
