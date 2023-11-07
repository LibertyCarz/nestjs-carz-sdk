import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BaseInternalRequest } from '../../../types';
import {
  CarPartType,
  CreateCarPartTypeDTO,
  ListCarPartTypesDTO,
  UpdateCarPartTypeDTO,
} from '../types';
@Injectable()
export class CarPartTypeDashboardInternalService {
  private _endpoint =
    process.env.CAR_PARTS_SERVICE_ENDPOINT + 'dashboard/car-part-types';
  constructor(private _httpService: HttpService) {}

  public async list(
    request: BaseInternalRequest<ListCarPartTypesDTO>,
  ): Promise<BaseResponse<CarPartType[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<CarPartType[]>>(
        `${this._endpoint}`,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
  }

  public async detail(id: string) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<CarPartType>>(
        `${this._endpoint}/${id}`,
      ),
    );
    return response.data.data;
  }

  public async create(
    payload: CreateCarPartTypeDTO,
    request: BaseInternalRequest,
  ): Promise<CarPartType> {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<CarPartType>>(
        `${this._endpoint}`,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }

  public async update(
    id: string,
    payload: UpdateCarPartTypeDTO,
    request: BaseInternalRequest,
  ) {
    const response = await lastValueFrom(
      this._httpService.patch<BaseResponse<CarPartType>>(
        `${this._endpoint}/${id}`,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }
}
