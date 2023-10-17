import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BaseInternalRequest } from '../../../../types';
import { ListVouchersDTO, UpdateVoucherStatusDTO } from '../dto';
import { Voucher } from '../types';
@Injectable()
export class LoyaltyVoucherInternalService {
  private _endpoint = process.env.LOYALTY_SERVICE_ENDPOINT + 'vouchers';
  constructor(private _httpService: HttpService) {}

  public async updateStatus(
    payload: UpdateVoucherStatusDTO,
    request: BaseInternalRequest,
  ) {
    const response = await lastValueFrom(
      this._httpService.patch<BaseResponse<{ ok: number }>>(
        `${this._endpoint}`,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }
  public async list(
    request: BaseInternalRequest<ListVouchersDTO>,
  ): Promise<BaseResponse<Voucher[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<Voucher[]>>(
        `${this._endpoint}`,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
  }

  public async detail(id: string) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<Voucher>>(`${this._endpoint}/${id}`),
    );
    return response.data.data;
  }
}
