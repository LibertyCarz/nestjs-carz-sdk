import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BaseInternalRequest } from '../../../types';
import { CarPart, CategoryCount } from '../types';

@Injectable()
export class CarPartInternalService {
  private _endpoint = process.env.CAR_PARTS_SERVICE_ENDPOINT + 'car-parts';
  constructor(private _httpService: HttpService) {}

  public async categoryCounts(carStoreId: number) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<Array<CategoryCount>>>(
        `${this._endpoint}/category-counts/${carStoreId}`,
      ),
    );
    return response.data?.data;
  }

  public async detail(id: string, request?: BaseInternalRequest) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<CarPart>>(
        `${this._endpoint}/${id}`,
        request?.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }
}
