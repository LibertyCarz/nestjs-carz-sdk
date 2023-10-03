import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreateVoucherDTO, ListVoucherDTO, UpdateVoucherDTO } from '../dto';
import { BaseVoucherRequest, Voucher, VoucherCode } from '../types';

@Injectable()
export class LoyaltyVoucherDashboardInternalService {
  private _endpoint =
    process.env.LOYALTY_SERVICE_ENDPOINT + 'dashboard/vouchers';
  constructor(private _httpService: HttpService) {}

  public async list(
    request: BaseVoucherRequest<ListVoucherDTO>,
  ): Promise<BaseResponse<Voucher[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<Voucher[]>>(
        `${this._endpoint}`,
        request,
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

  public async listCode(id: string, request: BaseVoucherRequest) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<VoucherCode[]>>(
        `${this._endpoint}/${id}/code`,
        request,
      ),
    );
    return response.data;
  }

  public async create(
    payload: CreateVoucherDTO,
    request: BaseVoucherRequest,
  ): Promise<Voucher> {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<Voucher>>(
        `${this._endpoint}`,
        payload,
        request,
      ),
    );
    return response.data.data;
  }

  public async update(
    id: string,
    payload: UpdateVoucherDTO,
    request: BaseVoucherRequest,
  ) {
    const response = await lastValueFrom(
      this._httpService.patch<BaseResponse<Voucher>>(
        `${this._endpoint}/${id}`,
        payload,
        request,
      ),
    );
    return response.data.data;
  }
}
