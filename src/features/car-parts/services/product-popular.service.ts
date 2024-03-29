import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { BaseInternalRequest } from '../../../types';
import { CarPart } from '../types';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductPopularInternalService {
  private _endpoint =
    process.env.CAR_PARTS_SERVICE_ENDPOINT + 'product-popular';
  private _logger = new Logger(ProductPopularInternalService.name);
  constructor(private _httpService: HttpService) {}

  public async list(
    request: BaseInternalRequest = null,
  ): Promise<BaseResponse<CarPart[]>> {
    try {
      const response = await lastValueFrom(
        this._httpService.get<BaseResponse<CarPart[]>>(
          this._endpoint,
          request.buildRequestConfig(),
        ),
      );
      return response.data;
    } catch (error) {
      this._loggerErrorMessage('listCarPart', error.message);
    }
  }

  private _loggerErrorMessage(title: string, error: any) {
    this._logger.error(`${title} ${error?.message}`);
  }
}
