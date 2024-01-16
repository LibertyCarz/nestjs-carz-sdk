import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PaymentSuccessWebhookDto } from '../dto';

@Injectable()
export class PaymentWebhookInternalService {
  private _endpoint: string;
  constructor(private _httpService: HttpService) {
    this._endpoint =
      process.env.PAYMENT_GATEWAY_SERVICE_ENDPOINT + 'payments/webhook';
  }

  public async payWaySuccess(dto: PaymentSuccessWebhookDto): Promise<number> {
    throw new Error('Not implement yet!');
  }

  public async payWayFailed(dto: PaymentSuccessWebhookDto): Promise<number> {
    throw new Error('Not implement yet!');
  }
}
