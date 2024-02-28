import { HttpStatus, Injectable, Logger, LoggerService } from '@nestjs/common';

import { get } from 'lodash';
import {
  FixedDiscountVoucherCalculator,
  IVoucherCalculator,
  PercentageDiscountVoucherCalculator,
} from '../discounts';
import { BaseInternalRequest } from '../../../../types';
import {
  VOUCHER_CODE_ORDER_TYPE,
  VOUCHER_CODE_STATUS,
  VOUCHER_DISCOUNT_TYPE,
  Voucher,
  VoucherCode,
} from '../types';
import { BaseService } from '../../../../shared/base.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CalculateVoucherCodeDTO } from '../dto';

@Injectable()
export class DiscountVoucherCalculatorInternalService extends BaseService {
  private _logger: LoggerService;
  private _fixedDiscountVoucherCalculator: IVoucherCalculator;
  private _percentageDiscountVoucherCalculator: IVoucherCalculator;
  private _endpoint =
    process.env.LOYALTY_SERVICE_ENDPOINT + 'dashboard/voucher-codes';
  constructor(private _httpService: HttpService) {
    super();
    this._fixedDiscountVoucherCalculator = new FixedDiscountVoucherCalculator();
    this._percentageDiscountVoucherCalculator =
      new PercentageDiscountVoucherCalculator();
  }
  public async getCodeByIds(ids: string[]): Promise<VoucherCode[]> {
    try {
      const params = { limit: ids.length, ids: ids.join(',') };
      const request = new BaseInternalRequest({ params });
      const response = await lastValueFrom(
        this._httpService.get<BaseResponse<VoucherCode[]>>(
          `${this._endpoint}`,
          request.buildRequestConfig(),
        ),
      );
      return response?.data?.data;
    } catch (error) {
      this._logger.error('ERROR WHEN GET VOUCHER CODE BY IDS', error.message);
    }
  }
  public async calculateSubscriptionVoucher(
    voucherCodeId: string,
    payload: CalculateVoucherCodeDTO,
    total: number,
  ) {
    const body: Partial<VoucherCode> = {
      userId: payload?.userId,
      userType: payload.userType,
      status: VOUCHER_CODE_STATUS.USED,
      order: {
        orderId: payload.transactionId,
        orderType: VOUCHER_CODE_ORDER_TYPE.TRANSACTION_SUBSCRIPTION,
      },
    };
    const params: Partial<VoucherCode> = {
      status: VOUCHER_CODE_STATUS.AVAILABLE,
    };
    const { data } = await lastValueFrom(
      this._httpService.patch<BaseResponse<VoucherCode[]>>(
        `${this._endpoint}/${voucherCodeId}`,
        body,
        { params },
      ),
    );
    return this.calculateByVoucherCodes(data?.data, total);
  }
  private calculateByVoucherCodes(voucherCodes: VoucherCode[], total: number) {
    if (!voucherCodes?.length) {
      this.throwError({
        message: 'Voucher is not valid!',
        status: HttpStatus.BAD_REQUEST,
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

  public async calculateDiscount(voucherCodeIds: string[], total: number) {
    const voucherCodes = await this.getCodeByIds(voucherCodeIds);
    return this.calculateByVoucherCodes(voucherCodes, total);
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
