import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BaseInternalRequest } from '../../../../types';
import { UpdateVoucherCodeDTO } from '../dto';
import { VoucherCode } from '../types';
@Injectable()
export class LoyaltyVoucherCodeDashboardInternalService {
  private _endpoint =
    process.env.LOYALTY_SERVICE_ENDPOINT + 'dashboard/voucher-codes';
  constructor(private _httpService: HttpService) {}

  public async list(request: BaseInternalRequest) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<VoucherCode[]>>(
        `${this._endpoint}`,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
  }

  public async handleOrder(
    payload: UpdateVoucherCodeDTO,
    request: BaseInternalRequest,
  ) {
    const response = await lastValueFrom(
      this._httpService.put<BaseResponse<VoucherCode[]>>(
        `${this._endpoint}/order`,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }
}
