import { VoucherDiscount } from '../types';

export interface IVoucherCalculator {
  calculate(voucherDiscount: VoucherDiscount, total?: number): number;
}
