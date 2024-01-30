import { BaseModelSQLType } from '../../../../types';
import { BaseSdkFilter } from '../../../../shared/base.request';

import { MerchantSubscription } from './merchant-subscription.dto';

export enum SUBSCRIPTION_TRANSACTION_STATUS {
  NEW = 'new',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  CANCELED = 'canceled',
}
export enum SUBSCRIPTION_TRANSACTION_METHOD {
  PAYWAY = 'payway',
  CASH = 'cash',
  BANK_TRANSFER = 'bank_transfer',
}
export class TransactionSubscription extends BaseModelSQLType {
  merchantId?: number;

  merchantSubscription?: MerchantSubscription;

  subscriptionPackage?: number | MerchantSubscription;

  updatedBy?: number;

  quotation: number;

  status?: SUBSCRIPTION_TRANSACTION_STATUS;

  total?: number;

  extraData?: any;

  note?: string;

  method?: SUBSCRIPTION_TRANSACTION_METHOD;

  constructor(data: any) {
    super(data);
    if (data) {
      this.merchantId = data.id;
      this.subscriptionPackage = data.subscriptionPackage;
      this.merchantSubscription = data.merchantSubscription;
      this.status = data.status;
      this.updatedBy = data.updatedBy;
      this.total = data.total;
      this.quotation = data.quotation;
      this.note = data.note;
      this.method = data.method;
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
