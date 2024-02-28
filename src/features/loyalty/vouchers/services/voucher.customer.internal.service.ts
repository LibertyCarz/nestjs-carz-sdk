import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BaseInternalRequest } from '../../../../types';
import {
  ListVoucherDTO,
  UseVoucherCodeDTO,
  UserRedeemVoucherDTO,
} from '../dto';
import { VoucherCode } from '../types';
@Injectable()
export class LoyaltyVoucherCustomerInternalService {
  private _endpoint =
    process.env.LOYALTY_SERVICE_ENDPOINT + 'customer/vouchers';
  constructor(private _httpService: HttpService) { }

  public async getList(
    request: BaseInternalRequest<ListVoucherDTO>,
  ): Promise<BaseResponse<VoucherCode[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<VoucherCode[]>>(
        `${this._endpoint}`,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
  }

  public async getDetails(id: string) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<VoucherCode>>(
        `${this._endpoint}/${id}`,
      ),
    );
    return response.data.data;
  }

  public async redeemVoucher(
    id: string,
    payload: UserRedeemVoucherDTO,
    request: BaseInternalRequest,
  ) {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<VoucherCode>>(
        `${this._endpoint}/redeem/${id}`,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }

  public async useVoucherCode(
    payload: UseVoucherCodeDTO,
    request: BaseInternalRequest,
  ) {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<VoucherCode>>(
        `${this._endpoint}/codes/use`,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }
}
