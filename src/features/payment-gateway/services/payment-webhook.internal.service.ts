import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PaymentSuccessWebhookDto } from '../dto';
import { executePaymentRequest } from '../utils';
import { PayWayWebHookResponse } from '../types';

@Injectable()
export class PaymentWebhookInternalService {
  private _endpoint: string;
  constructor(private _httpService: HttpService) {
    this._endpoint =
      process.env.PAYMENT_GATEWAY_SERVICE_ENDPOINT + 'payments/webhook';
  }

  public async payWaySuccess(
    dto: PaymentSuccessWebhookDto,
  ): Promise<PayWayWebHookResponse> {
    return executePaymentRequest(
      this._httpService.post<PayWayWebHookResponse>(
        this._endpoint + '/payway/success',
        dto,
      ),
    );
  }

  public async payWayFailed(
    dto: PaymentSuccessWebhookDto,
  ): Promise<PayWayWebHookResponse> {
    return executePaymentRequest(
      this._httpService.post<PayWayWebHookResponse>(
        this._endpoint + '/payway/failed',
        dto,
      ),
    );
  }
}
