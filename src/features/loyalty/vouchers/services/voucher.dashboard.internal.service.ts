import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreateVoucherDTO, UpdateVoucherDTO } from '../dto';
import { Voucher, VoucherCode } from '../types';

@Injectable()
export class LoyaltyVoucherDashboardInternalService {
  private _endpoint =
    process.env.LOYALTY_SERVICE_ENDPOINT + 'dashboard/vouchers';
  constructor(private _httpService: HttpService) {}

  public async list(params: BasePagination): Promise<BaseResponse<Voucher[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<Voucher[]>>(`${this._endpoint}`, {
        params,
      }),
    );
    return response.data;
  }

  public async detail(id: string) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<Voucher>>(`${this._endpoint}/${id}`),
    );
    return response.data.data;
  }

  public async listCode(id: string, params: BasePagination) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<VoucherCode[]>>(
        `${this._endpoint}/${id}/code`,
        {
          params,
        },
      ),
    );
    return response.data;
  }

  public async create(payload: CreateVoucherDTO): Promise<Voucher> {
    const response = await lastValueFrom(
      this._httpService.post<Voucher>(`${this._endpoint}`, payload),
    );
    return response.data;
  }

  public async update(id: string, payload: UpdateVoucherDTO) {
    const response = await lastValueFrom(
      this._httpService.patch<Voucher>(`${this._endpoint}/${id}`, payload),
    );
    return response.data;
  }
}
