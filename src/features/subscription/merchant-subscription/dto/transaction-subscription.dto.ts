import { BaseSdkFilter } from '../../../../shared/base.request';

import { MerchantSubscription } from './merchant-subscription.dto';

export enum SUBSCRIPTION_TRANSACTION_STATUS {
  NEW = 'new',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  CANCELED = 'canceled',
}
export class TransactionSubscription {
  merchantId: number;

  merchantSubscription?: number | MerchantSubscription;

  updatedBy?: number;

  quantity: number;

  status?: SUBSCRIPTION_TRANSACTION_STATUS;

  total: number;

  extraData: any;

  constructor(data: any) {
    this.merchantId = data.id;
    this.merchantSubscription = data.merchantSubscription;
    this.status = data.status;
    this.updatedBy = data.updatedBy;
    this.total = data.total;
    this.extraData = data.extraData;
  }
}

export class ListTransactionSubscriptionDTO extends BaseSdkFilter {
  status?: string;
  merchantId?: number;
}

export class UpdateTransactionSubscriptionDTO {
  status?: SUBSCRIPTION_TRANSACTION_STATUS;
}
