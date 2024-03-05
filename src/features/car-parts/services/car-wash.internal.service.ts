import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import {
  CreateCarWashDTO,
  FilterCarWashDTO,
  UpdateCarWashMerchantDto,
} from '../dto';
import { CarWash } from '../types';

@Injectable()
export class CarWashInternalService {
  private _endpoint = process.env.CAR_PARTS_SERVICE_ENDPOINT + 'car-washes';
  constructor(private _httpService: HttpService) {}

  public async list(filter: FilterCarWashDTO) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<CarWash[]>>(`${this._endpoint}`, {
        params: filter,
      }),
    );
    return response.data;
  }

  public async create(data: CreateCarWashDTO) {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<CarWash>>(`${this._endpoint}`, data),
    );
    return response.data;
  }

  public async update(id: string, data: UpdateCarWashMerchantDto) {
    const response = await lastValueFrom(
      this._httpService.patch<BaseResponse<CarWash, { diffPaths: string[] }>>(
        `${this._endpoint}/${id}`,
        data,
      ),
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
