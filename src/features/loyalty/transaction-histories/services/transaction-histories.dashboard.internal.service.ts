import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { TransactionHistory } from '../types';
import { BaseInternalRequest } from '../../../../types';

@Injectable()
export class LoyaltyTransactionHistoryDashboardInternalService {
  private _endpoint =
    process.env.LOYALTY_SERVICE_ENDPOINT + 'dashboard/transaction-histories';
  constructor(private _httpService: HttpService) {}

  public async list(request: BaseInternalRequest) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<TransactionHistory>>(
        `${this._endpoint}`,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }
}
