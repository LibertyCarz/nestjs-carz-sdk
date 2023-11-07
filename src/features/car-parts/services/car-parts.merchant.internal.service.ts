import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BaseInternalRequest } from '../../../types';
import { CarPart } from '../types';
import { lastValueFrom } from 'rxjs';
import { CreateCarPartMerchantDTO } from '../dto/car-part.merchant.dto';

@Injectable()
export class CarPartMerchantInternalService {
  private _endpoint =
    process.env.CAR_PART_SERVICE_ENDPOINT + 'merchants/car-parts';
  constructor(private _httpService: HttpService) {}

  public async list(
    request: BaseInternalRequest,
  ): Promise<BaseResponse<CarPart[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<CarPart[]>>(
        this._endpoint,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
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
    payload: CreateCarPartMerchantDTO,
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
    payload: CreateCarPartMerchantDTO,
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
}
