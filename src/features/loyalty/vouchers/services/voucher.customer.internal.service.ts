import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { SERVICES } from '../../../../constants';
import { BaseInternalRequest } from '../../../../types';
import { ListVoucherDTO } from '../dto';
import { VoucherCode } from '../types';
@Injectable()
export class LoyaltyVoucherCustomerInternalService {
  private _endpoint =
    process.env.LOYALTY_SERVICE_ENDPOINT + 'customer/vouchers';
  constructor(
    @Inject(SERVICES.CARZ_LOYALTIES) private _carzLoyalty: ClientProxy,
    private _httpService: HttpService,
  ) {}

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
}
