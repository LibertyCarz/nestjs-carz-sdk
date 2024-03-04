import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CarWashCategory } from '../types/car-wash-category.type';
import { Injectable } from '@nestjs/common';
import { BaseSdkFilter } from '../../../shared/base.request';

@Injectable()
export class CarWashCategoryInternalService {
  private _endpoint =
    process.env.CAR_PARTS_SERVICE_ENDPOINT + 'car-wash-categories';
  constructor(private _httpService: HttpService) {}

  public async list(filter: BaseSdkFilter) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<CarWashCategory[]>>(
        `${this._endpoint}`,
        {
          params: filter,
        },
      ),
    );
    return response.data;
  }

  public async detail(id: string) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<CarWashCategory>>(
        `${this._endpoint}/${id}`,
      ),
    );
    return response.data;
  }

  public async upsert(carWashCategory: CarWashCategory) {
    const response = await lastValueFrom(
      this._httpService.put<BaseResponse<CarWashCategory>>(
        `${this._endpoint}`,
        carWashCategory,
      ),
    );
    return response.data;
  }
}
