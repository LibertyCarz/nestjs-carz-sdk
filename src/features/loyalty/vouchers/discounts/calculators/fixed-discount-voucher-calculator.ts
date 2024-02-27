import { VoucherDiscount } from '../../types';
import { IVoucherCalculator } from '../types';
import { get } from 'lodash';

export class FixedDiscountVoucherCalculator implements IVoucherCalculator {
  public calculate(voucherDiscount: VoucherDiscount): number {
    return get(voucherDiscount, 'value', 0);
  }
}
