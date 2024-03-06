import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import {
  CreateCarWashDTO,
  FilterCarWashDTO,
  IncrementTotalBookingDTO,
  UpdateCarWashMerchantDto,
} from '../dto';
import { CarWash } from '../types';
import { BaseService } from '../../../shared/base.service';
import { ClientProxy } from '@nestjs/microservices';
import { CMD, SERVICES } from '../../../constants';

@Injectable()
export class CarWashInternalService extends BaseService {
  private _endpoint = process.env.CAR_PARTS_SERVICE_ENDPOINT + 'car-washes';
  constructor(
    private _httpService: HttpService,
    @Inject(SERVICES.CARZ_CAR_PARTS) private _carzCarPart: ClientProxy,
  ) {
    super();
  }

  public async list(filter: FilterCarWashDTO) {
    try {
      const response = await lastValueFrom(
        this._httpService.get<BaseResponse<CarWash[]>>(`${this._endpoint}`, {
          params: filter,
        }),
      );
      return response.data;
    } catch (error) {
      this.throwError(error);
    }
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

  public incrementTotalBooking(data: IncrementTotalBookingDTO[]) {
    return this._carzCarPart.emit(CMD.CAR_WASH_INCREMENT_TOTAL_BOOKING, data);
  }
}
