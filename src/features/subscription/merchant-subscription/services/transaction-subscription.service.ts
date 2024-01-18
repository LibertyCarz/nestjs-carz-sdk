import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import {
  ListTransactionSubscriptionDTO,
  TransactionSubscription,
  UpdateTransactionSubscriptionDTO,
} from '../dto';

@Injectable()
export class TransactionSubscriptionInternalService {
  private _endpoint;
  constructor(private _httpService: HttpService) {
    this._endpoint =
      process.env.SUBSCRIPTION_SERVICE_ENDPOINT + 'subscription-transactions';
  }
  public async create(data: TransactionSubscription) {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<TransactionSubscription>>(
        `${this._endpoint}`,
        data,
      ),
    );
    return response.data?.data;
  }

  public async list(
    params: ListTransactionSubscriptionDTO,
  ): Promise<BaseResponse<TransactionSubscription[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<TransactionSubscription[]>>(
        `${this._endpoint}`,
        { params },
      ),
    );
    return response.data;
  }

  public async detail(id: string | number): Promise<TransactionSubscription> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<TransactionSubscription>>(
        `${this._endpoint}/${id}`,
      ),
    );
    return response.data?.data;
  }

  public async updateStatus(
    id: string,
    body: UpdateTransactionSubscriptionDTO,
  ): Promise<TransactionSubscription> {
    const response = await lastValueFrom(
      this._httpService.patch<BaseResponse<TransactionSubscription>>(
        `${this._endpoint}/${id}`,
        body,
      ),
    );
    return response.data?.data;
  }
}
