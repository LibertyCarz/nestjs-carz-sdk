import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PaymentSuccessWebhookDto } from '../dto';
import { PayWayWebHookResponse } from '../types';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentWebhookInternalService {
  private _endpoint: string;
  constructor(private _httpService: HttpService) {
    this._endpoint =
      process.env.PAYMENT_GATEWAY_SERVICE_ENDPOINT + 'payments/webhook';
  }

  public async payWaySuccess(
    dto: PaymentSuccessWebhookDto,
  ): Promise<BaseResponse<PayWayWebHookResponse>> {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<PayWayWebHookResponse>>(
        this._endpoint + '/payway/success',
        dto,
      ),
    );
    return response.data;
  }

  public async payWayFailed(
    dto: PaymentSuccessWebhookDto,
  ): Promise<BaseResponse<PayWayWebHookResponse>> {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<PayWayWebHookResponse>>(
        this._endpoint + '/payway/failed',
        dto,
      ),
    );
    return response.data;
  }
}
