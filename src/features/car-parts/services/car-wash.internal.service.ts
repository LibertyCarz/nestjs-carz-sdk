import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CMD, SERVICES } from '../../../constants';
import { BaseService } from '../../../shared/base.service';
import {
  CreateCarWashDTO,
  FilterCarWashDTO,
  IncrementTotalBookingDTO,
  UpdateCarWashMerchantDto,
} from '../dto';
import { CarWash, CarWashCategory, CountBy } from '../types';

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

  public async categoryCounts(carStoreId: number) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<Array<CountBy<CarWashCategory>>>>(
        `${this._endpoint}/category-counts/${carStoreId}`,
      ),
    );
    return response.data?.data;
  }

  public incrementTotalBooking(data: IncrementTotalBookingDTO[]) {
    return this._carzCarPart.emit(CMD.CAR_WASH_INCREMENT_TOTAL_BOOKING, data);
  }

  public async bulkUpdateStatus(data: Partial<CarWash>) {
    return this._carzCarPart.emit(CMD.CAR_WASH_BULK_UPDATE_STATUS, data);
  }
}
