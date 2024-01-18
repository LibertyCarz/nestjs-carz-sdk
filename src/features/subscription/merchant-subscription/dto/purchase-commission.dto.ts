import { BaseModelSQLType } from '../../../../types';
import { BaseSdkFilter } from '../../../../shared/base.request';

export enum PURCHASE_COMMISSION_STATUS {
  NEW = 'new',
  PAID = 'paid',
}
export class PurchaseCommission extends BaseModelSQLType {
  merchantId?: number;

  purchaseOrderId: string;

  status?: PURCHASE_COMMISSION_STATUS;

  type?: string;

  purchaseCarCommissions: PurchaseCarCommission[];

  updatedBy?: number;

  total?: number;

  commission?: number;

  note?: string;

  constructor(data: any) {
    super(data);
    if (data) {
      this.merchantId = data.merchantId;
      this.purchaseOrderId = data.purchaseOrderId;
      this.status = data.status;
      this.type = data.type;
      this.purchaseCarCommissions = data.purchaseCarCommissions;
      this.updatedBy = data.updatedBy;
      this.total = data.total;
      this.commission = data.commission;
      this.note = data.note;
    }
  }
}

export type PurchaseCarCommission = {
  price: number;
  commission?: number;
  carId: number;
  subscriptionPackage?: number;
  extraData?: any;
};
export class UpdatePurchaseCommissionDTO {
  status?: PURCHASE_COMMISSION_STATUS;
  updatedBy?: number;
}

export class ListPurchaseCommissionDTO extends BaseSdkFilter {
  status?: string;
  merchantId?: number;
}
