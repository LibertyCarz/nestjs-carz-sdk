import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { BaseInternalRequest } from '../../../types';
import { CarPart } from '../types';
import { lastValueFrom } from 'rxjs';
import { CreateCarPartMerchant } from '../dto/car-part.merchant.dto';

@Injectable()
export class CarPartInternalService {
  private _endpoint = process.env.CAR_PARTS_SERVICE_ENDPOINT + '/car-parts';
  private _logger = new Logger(CarPartInternalService.name);

  constructor(private _httpService: HttpService) {}

  public async list(
    request: BaseInternalRequest,
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

  public async detail(id: string, request: BaseInternalRequest) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<CarPart>>(
        `${this._endpoint}/${id}`,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }

  public async create(
    payload: CreateCarPartMerchant,
    request: BaseInternalRequest,
  ): Promise<CarPart> {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<CarPart>>(
        this._endpoint,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }

  public async update(
    id: string,
    payload: CreateCarPartMerchant,
    request: BaseInternalRequest,
  ) {
    const response = await lastValueFrom(
      this._httpService.put<BaseResponse<CarPart>>(
        `${this._endpoint}/${id}`,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }

  private _loggerErrorMessage(title: string, error: any) {
    this._logger.error(`${title} ${error?.message}`);
  }
}
