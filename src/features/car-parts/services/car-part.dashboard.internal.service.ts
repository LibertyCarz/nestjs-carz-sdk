import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BaseInternalRequest } from '../../../types';
import { CarPart, ListCarPartDashboardDto } from '../types';
@Injectable()
export class CarPartDashboardInternalService {
  private _endpoint =
    process.env.CAR_PARTS_SERVICE_ENDPOINT + 'dashboard/car-parts';
  constructor(private _httpService: HttpService) {}

  public async list(
    request: BaseInternalRequest<ListCarPartDashboardDto>,
  ): Promise<BaseResponse<CarPart[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<CarPart[]>>(
        `${this._endpoint}`,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
  }

  public async updateStatus(
    id: string,
    payload: Partial<CarPart>,
    request: BaseInternalRequest,
  ) {
    const response = await lastValueFrom(
      this._httpService.patch<BaseResponse<CarPart>>(
        `${this._endpoint}/status/${id}`,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }
}
