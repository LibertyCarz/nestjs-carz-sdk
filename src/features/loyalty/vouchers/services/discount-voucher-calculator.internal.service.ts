import { Injectable, Logger, LoggerService } from '@nestjs/common';

import { get } from 'lodash';
import {
  FixedDiscountVoucherCalculator,
  IVoucherCalculator,
  PercentageDiscountVoucherCalculator,
} from '../discounts';
import { BaseInternalRequest } from '../../../../types';
import { LoyaltyVoucherCodeDashboardInternalService } from './voucher-code.dashboard.internal.service';
import { VOUCHER_DISCOUNT_TYPE, Voucher, VoucherCode } from '../types';
import { BaseService } from '../../../../shared/base.service';

@Injectable()
export class DiscountVoucherCalculatorInternalService extends BaseService {
  private _logger: LoggerService;
  private _fixedDiscountVoucherCalculator: IVoucherCalculator;
  private _percentageDiscountVoucherCalculator: IVoucherCalculator;
  constructor(
    private _voucherCodeDashboardInternalSvc: LoyaltyVoucherCodeDashboardInternalService,
  ) {
    super();
    this._fixedDiscountVoucherCalculator = new FixedDiscountVoucherCalculator();
    this._percentageDiscountVoucherCalculator =
      new PercentageDiscountVoucherCalculator();
  }
  public async getCodeByIds(ids: string[]): Promise<VoucherCode[]> {
    try {
      const params = { limit: ids.length, ids: ids.join(',') };
      const { data } = await this._voucherCodeDashboardInternalSvc.list(
        new BaseInternalRequest({ params }),
      );
      return data;
    } catch (error) {
      this._logger.error('ERROR WHEN GET VOUCHER CODE BY IDS', error.message);
    }
  }
  public async calculateDiscount(voucherCodeIds: string[], total: number) {
    const voucherCodes = await this.getCodeByIds(voucherCodeIds);
    if (!voucherCodes?.length) {
      this.throwError({
        message: 'Voucher is not valid!',
      });
    }
    const totalDiscount = voucherCodes.reduce(
      (discount, voucherCode) =>
        discount + this._calculateVoucherDiscount(voucherCode.voucher, total),
      0,
    );
    // rounded to 2 decimal places
    return Number(totalDiscount.toFixed(2));
  }

  private _calculateVoucherDiscount(voucher: Voucher, total: number) {
    const minOrderValue = get(voucher, 'discount.minOrderValue', 0);
    // Apply discount when total >= minOrderValue
    if (voucher?.discount && total >= minOrderValue) {
      switch (voucher.discount.type) {
        case VOUCHER_DISCOUNT_TYPE.CASH:
          return this._fixedDiscountVoucherCalculator.calculate(
            voucher.discount,
            total,
          );
        case VOUCHER_DISCOUNT_TYPE.PERCENTAGE:
          return this._percentageDiscountVoucherCalculator.calculate(
            voucher.discount,
            total,
          );
        default:
          this.throwError({ message: 'VOUCHER_DISCOUNT_TYPE Is Not Valid' });
      }
    }
    return 0;
  }
}
