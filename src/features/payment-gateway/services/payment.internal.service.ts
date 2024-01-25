import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreatePaymentDto } from '../dto';
import {
  CheckPaymentResponse,
  CreatePaymentResponse,
  IPaymentInternalService,
} from '../types';
import { BaseService } from '../../../shared/base.service';

@Injectable()
export class PaymentInternalService
  extends BaseService
  implements IPaymentInternalService
{
  private _endpoint: string;
  constructor(private _httpService: HttpService) {
    super();
    this._endpoint = process.env.PAYMENT_GATEWAY_SERVICE_ENDPOINT + 'payments';
  }

  public async create(
    dto: CreatePaymentDto,
    headers = {},
  ): Promise<CreatePaymentResponse> {
    try {
      const response = await lastValueFrom(
        this._httpService.post<BaseResponse<CreatePaymentResponse>>(
          this._endpoint,
          dto,
          {
            headers,
          },
        ),
      );
      return response.data?.data;
    } catch (error) {
      this.throwError(error);
    }
  }

  public async check(transactionId: string): Promise<CheckPaymentResponse> {
    const response = await lastValueFrom(
      this._httpService.get<CheckPaymentResponse>(
        this._endpoint + '/check/' + transactionId,
      ),
    );
    return response.data;
  }
}
