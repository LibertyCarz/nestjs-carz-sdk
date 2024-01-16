import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../dto';
import {
  CheckPaymentResponse,
  CreatePaymentResponse,
  IPaymentInternalService,
} from '../types';
import { executePaymentRequest } from '../utils';

@Injectable()
export class PaymentInternalService implements IPaymentInternalService {
  private _endpoint: string;
  constructor(private _httpService: HttpService) {
    this._endpoint = process.env.PAYMENT_GATEWAY_SERVICE_ENDPOINT + 'payments';
  }

  public async create(dto: CreatePaymentDto): Promise<CreatePaymentResponse> {
    return executePaymentRequest(
      this._httpService.post<CreatePaymentResponse>(this._endpoint, dto),
    );
  }

  public async check(transactionId: string): Promise<CheckPaymentResponse> {
    return executePaymentRequest(
      this._httpService.get<CheckPaymentResponse>(
        this._endpoint + '/check/' + transactionId,
      ),
    );
  }
}
