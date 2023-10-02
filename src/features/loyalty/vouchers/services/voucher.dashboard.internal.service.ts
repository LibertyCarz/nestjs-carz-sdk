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

  public async list(filter: BasePagination): Promise<ListResponse<Voucher>> {
    const response = await lastValueFrom(
      this._httpService.get<ListResponse<Voucher>>(`${this._endpoint}`, {
        params: filter,
      }),
    );
    return response.data;
  }

  public async detail(id: string) {
    const response = await lastValueFrom(
      this._httpService.get<Voucher>(`${this._endpoint}/${id}`),
    );
    return response.data;
  }

  public async listCode(id: string) {
    const response = await lastValueFrom(
      this._httpService.get<ListResponse<VoucherCode>>(
        `${this._endpoint}/${id}/code`,
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
