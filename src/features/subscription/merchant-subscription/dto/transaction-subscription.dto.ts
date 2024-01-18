import { BaseModelSQLType } from '../../../../types';
import { BaseSdkFilter } from '../../../../shared/base.request';

import { MerchantSubscription } from './merchant-subscription.dto';

export enum SUBSCRIPTION_TRANSACTION_STATUS {
  NEW = 'new',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  CANCELED = 'canceled',
}
export class TransactionSubscription extends BaseModelSQLType {
  merchantId: number;

  // merchantSubscription?: number | MerchantSubscription;

  subscriptionPackage?: number | MerchantSubscription;

  updatedBy?: number;

  quantity: number;

  status?: SUBSCRIPTION_TRANSACTION_STATUS;

  total?: number;

  extraData?: any;

  constructor(data: any) {
    super(data);
    if (data) {
      this.merchantId = data.id;
      this.subscriptionPackage = data.subscriptionPackage;
      this.status = data.status;
      this.updatedBy = data.updatedBy;
      this.total = data.total;
      this.extraData = data.extraData;
    }
  }
}

export class ListTransactionSubscriptionDTO extends BaseSdkFilter {
  status?: string;
  merchantId?: number;
}

export class UpdateTransactionSubscriptionDTO {
  status?: SUBSCRIPTION_TRANSACTION_STATUS;
  updatedBy?: number;
}
