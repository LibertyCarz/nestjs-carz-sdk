import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BaseInternalRequest } from '../../../types';
import { CarStore } from '../types';

@Injectable()
export class CarPartMerchantInternalService {
  private _endpoint = process.env.CAR_PARTS_SERVICE_ENDPOINT + 'car-stores';
  constructor(private _httpService: HttpService) {}

  public async list(
    request: BaseInternalRequest,
  ): Promise<BaseResponse<CarStore[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<CarStore[]>>(
        this._endpoint,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
  }
}
