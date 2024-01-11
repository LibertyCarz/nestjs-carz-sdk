import { Injectable } from '@nestjs/common';
import { BaseInternalRequest } from '../../../../types';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ListSubscriptionPackageDTO, SubscriptionPackage } from '../dto';

@Injectable()
export class SubscriptionPackageInternalService {
  private _endpoint;
  constructor(private _httpService: HttpService) {
    this._endpoint =
      process.env.CAR_SUBSCRIPTION_SERVICE_ENDPOINT + 'Subscription-packages';
  }
  public async create(data: SubscriptionPackage) {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<SubscriptionPackage>>(
        `${this._endpoint}`,
        data,
      ),
    );
    return response.data?.data;
  }
  public async update(id: number, data: SubscriptionPackage) {
    const response = await lastValueFrom(
      this._httpService.put<BaseResponse<SubscriptionPackage>>(
        `${this._endpoint}/${id}`,
        data,
      ),
    );
    return response.data?.data;
  }

  public async list(
    params: ListSubscriptionPackageDTO,
  ): Promise<BaseResponse<SubscriptionPackage[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<SubscriptionPackage[]>>(
        `${this._endpoint}`,
        { params },
      ),
    );
    return response.data;
  }

  public async detail(id: string): Promise<SubscriptionPackage> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<SubscriptionPackage>>(
        `${this._endpoint}/${id}`,
      ),
    );
    return response.data?.data;
  }
}
