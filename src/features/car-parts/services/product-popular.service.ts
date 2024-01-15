import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { BaseInternalRequest } from 'src/types';
import { CarPart } from '../types';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductPopularService {
  private _endpoint =
    process.env.CAR_PARTS_SERVICE_ENDPOINT + 'product-popular';
  private _logger = new Logger(ProductPopularService.name);
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
