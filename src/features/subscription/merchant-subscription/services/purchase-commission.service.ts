import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import {
  ListPurchaseCommissionDTO,
  PurchaseCommission,
  UpdatePurchaseCommissionDTO,
} from '../dto';

@Injectable()
export class PurchaseCommissionInternalService {
  private _endpoint;
  constructor(private _httpService: HttpService) {
    this._endpoint =
      process.env.CAR_SUBSCRIPTION_SERVICE_ENDPOINT + 'purchase-commissions';
  }
  public async create(data: PurchaseCommission) {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<PurchaseCommission>>(
        `${this._endpoint}`,
        data,
      ),
    );
    return response.data?.data;
  }

  public async list(
    params: ListPurchaseCommissionDTO,
  ): Promise<BaseResponse<PurchaseCommission[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<PurchaseCommission[]>>(
        `${this._endpoint}`,
        { params },
      ),
    );
    return response.data;
  }

  public async detail(id: string | number): Promise<PurchaseCommission> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<PurchaseCommission>>(
        `${this._endpoint}/${id}`,
      ),
    );
    return response.data?.data;
  }
  public async updateStatus(
    id: string,
    body: UpdatePurchaseCommissionDTO,
  ): Promise<PurchaseCommission> {
    const response = await lastValueFrom(
      this._httpService.patch<BaseResponse<PurchaseCommission>>(
        `${this._endpoint}/${id}`,
        body,
      ),
    );
    return response.data?.data;
  }
}
