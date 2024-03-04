import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BaseSdkFilter } from '../../../shared/base.request';
import { CreateCarWashDTO } from '../dto';
import { CarWashCategory } from '../types/car-wash-category.type';
import { CarWash } from '../types';

@Injectable()
export class CarWashInternalService {
  private _endpoint = process.env.CAR_PARTS_SERVICE_ENDPOINT + 'car-washes';
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

  public async create(data: CreateCarWashDTO) {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<CarWash>>(`${this._endpoint}`, data),
    );
    return response.data;
  }

  public async detail(id: string) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<CarWash>>(`${this._endpoint}/${id}`),
    );
    return response.data;
  }
}