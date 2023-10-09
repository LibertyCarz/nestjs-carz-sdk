import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import {
  CreateVoucherDTO,
  ImportVoucherCodeDTO,
  ListVoucherDTO,
  RollbackVoucherDTO,
  UpdateVoucherDTO,
} from '../dto';
import { Voucher, VoucherCode } from '../types';
import { ClientProxy } from '@nestjs/microservices';
import { CMD, SERVICES } from '../../../../constants';
import { BaseSdkEventPayloadRequest } from '../../../../shared/base.request';
import { BaseInternalRequest } from '../../../../types';
@Injectable()
export class LoyaltyVoucherDashboardInternalService {
  private _endpoint =
    process.env.LOYALTY_SERVICE_ENDPOINT + 'dashboard/vouchers';
  constructor(
    @Inject(SERVICES.CARZ_LOYALTIES) private _carzLoyalty: ClientProxy,
    private _httpService: HttpService,
  ) {}

  public async list(
    request: BaseInternalRequest<ListVoucherDTO>,
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

  public async listCode(id: string, request: BaseInternalRequest) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<VoucherCode[]>>(
        `${this._endpoint}/${id}/code`,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
  }
  public async importCode(
    payload: BaseSdkEventPayloadRequest<ImportVoucherCodeDTO>,
  ) {
    return this._carzLoyalty.emit(
      CMD.CAR_LOYALTY_IMPORT_VOUCHER_CODE,
      payload.buildRecord(),
    );
  }

  public async rollback(
    payload: BaseSdkEventPayloadRequest<RollbackVoucherDTO>,
  ) {
    return this._carzLoyalty.emit(
      CMD.CAR_LOYALTY_ROLLBACK_VOUCHER,
      payload.buildRecord(),
    );
  }

  public async create(
    payload: CreateVoucherDTO,
    request: BaseInternalRequest,
  ): Promise<Voucher> {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<Voucher>>(
        `${this._endpoint}`,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }

  public async update(
    id: string,
    payload: UpdateVoucherDTO,
    request: BaseInternalRequest,
  ) {
    const response = await lastValueFrom(
      this._httpService.patch<BaseResponse<Voucher>>(
        `${this._endpoint}/${id}`,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }
}
