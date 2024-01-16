import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ListMerchantSubscriptionDTO, MerchantSubscription } from '../dto';

@Injectable()
export class MerchantSubscriptionInternalService {
  private _endpoint;
  constructor(private _httpService: HttpService) {
    this._endpoint =
      process.env.CAR_SUBSCRIPTION_SERVICE_ENDPOINT + 'merchant-subscriptions';
  }
  public async create(data: MerchantSubscription) {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<MerchantSubscription>>(
        `${this._endpoint}`,
        data,
      ),
    );
    return response.data?.data;
  }
  public async update(id: number, data: MerchantSubscription) {
    const response = await lastValueFrom(
      this._httpService.put<BaseResponse<MerchantSubscription>>(
        `${this._endpoint}/${id}`,
        data,
      ),
    );
    return response.data?.data;
  }

  public async list(
    params: ListMerchantSubscriptionDTO,
  ): Promise<BaseResponse<MerchantSubscription[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<MerchantSubscription[]>>(
        `${this._endpoint}`,
        { params },
      ),
    );
    return response.data;
  }

  public async detail(id: string | number): Promise<MerchantSubscription> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<MerchantSubscription>>(
        `${this._endpoint}/${id}`,
      ),
    );
    return response.data?.data;
  }
}
