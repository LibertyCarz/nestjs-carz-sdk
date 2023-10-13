import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BaseInternalRequest } from 'src/types';
import { UpdateVoucherStatusDTO } from '../dto';
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
}
