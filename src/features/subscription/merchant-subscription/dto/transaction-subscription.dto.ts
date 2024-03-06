import { BaseModelSQLType } from '../../../../types';
import { BaseSdkFilter } from '../../../../shared/base.request';

import { MerchantSubscription } from './merchant-subscription.dto';
import { BaseFile } from '../../type';
import { PAYWAY_PAYMENT_OPTIONS } from '../../../payment-gateway';

export enum SUBSCRIPTION_TRANSACTION_STATUS {
  NEW = 'new',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  CANCELED = 'canceled',
}
export enum SUBSCRIPTION_TRANSACTION_METHOD {
  CASH = 'cash',
  BANK_TRANSFER = 'bank_transfer',
  WECHAT = 'wechat',
  ALIPAY = 'alipay',
  BAKONG = 'bakong',
  ABAPAY_KHQR_DEEPLINK = 'abapay_khqr_deeplink',
  ABAPAY_KHQR = 'abapay_khqr',
}
export enum SUBSCRIPTION_TRANSACTION_TYPE {
  RENEW = 'renew', // renew
  CHANGE = 'change', // Change plan
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

  method?: PAYWAY_PAYMENT_OPTIONS;

  createdBy?: number;

  createdByType?: number;

  files?: BaseFile[];

  type?: SUBSCRIPTION_TRANSACTION_TYPE;

  voucherId?: string;

  originalPrice?: number;

  voucherCode?: any;

  constructor(data: any) {
    super(data);
    if (data) {
      this.merchantId = data.merchantId;
      this.subscriptionPackage = data.subscriptionPackage;
      this.merchantSubscription = data.merchantSubscription;
      this.status = data.status;
      this.updatedBy = data.updatedBy;
      this.total = data.total;
      this.quotation = data.quotation;
      this.note = data.note;
      this.method = data.method;
      this.createdBy = data.createdBy;
      this.createdByType = data.createdByType;
      this.extraData = data.extraData;
      this.files = data.files;
      this.type = data.type;
      this.voucherId = data.voucherId;
      this.originalPrice = data.originalPrice;
      this.voucherCode = data.voucherCode;
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
  note?: string;
  files?: BaseFile[];
}
