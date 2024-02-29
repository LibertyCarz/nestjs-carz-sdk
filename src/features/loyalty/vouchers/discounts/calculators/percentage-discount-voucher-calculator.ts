import { VoucherDiscount } from '../../types';
import { IVoucherCalculator } from '../types';
import { get } from 'lodash';

export class PercentageDiscountVoucherCalculator implements IVoucherCalculator {
  public calculate(voucherDiscount: VoucherDiscount, total: number): number {
    const percentage = get(voucherDiscount, 'percentage', 0);
    const discount = (total * percentage) / 100;
    // Max discount as maxDiscountValue in voucher
    const maxDiscountValue = get(voucherDiscount, 'maxDiscountValue');
    if (discount >= maxDiscountValue) {
      return maxDiscountValue;
    }
    return discount;
  }
}
