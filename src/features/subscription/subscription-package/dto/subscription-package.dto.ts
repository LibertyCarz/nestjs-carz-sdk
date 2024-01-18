import { BaseModelSQLType, MultipleLanguages } from '../../../../types';
import {
  CommissionConfig,
  SubscriptionBenefit,
  SubscriptionPrice,
} from '../../type';

export class SubscriptionPackage extends BaseModelSQLType {
  name?: MultipleLanguages;
  prices?: SubscriptionPrice[];
  description?: MultipleLanguages;
  benefits?: SubscriptionBenefit[];
  updatedBy?: number;
  status?: string;
  isBestSeller?: boolean;
  icon?: string;
  type?: string;
  ordinal?: number;
  annualMembership?: number;
  commissions?: CommissionConfig[];

  constructor(data?: Partial<SubscriptionPackage>) {
    super(data);
    if (data) {
      this.name = data.name;
      this.status = data.status;
      this.prices = data.prices;
      this.description = data.description;
      this.benefits =
        data.benefits && data.benefits.map((el) => new SubscriptionBenefit(el));
      this.updatedBy = data.updatedBy;
      this.isBestSeller = data.isBestSeller;
      this.icon = data.icon;
      this.type = data.type;
      this.ordinal = data.ordinal;
      this.annualMembership = data.annualMembership;
      this.commissions = data.commissions;
    }
  }
}
export class ListSubscriptionPackageDTO {
  status?: string;
  skip?: number;
  take?: number;
}
