import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { BaseInternalRequest } from '../../../types';
import { CarPart } from '../types';
import { lastValueFrom } from 'rxjs';
import { CreateCarPartMerchant, UpdateCarPartMerchant } from '../dto';
import { ClientProxy } from '@nestjs/microservices';
import { CMD, SERVICES } from '../../../../src/constants';
import { IntegrateProduct } from '../../../../src/features/integrate';

@Injectable()
export class CarPartMerchantInternalService {
  private _endpoint =
    process.env.CAR_PARTS_SERVICE_ENDPOINT + 'merchants/car-parts';
  constructor(
    private _httpService: HttpService,
    @Inject(SERVICES.CARZ_CAR_PARTS) private _carzCarPart: ClientProxy,
  ) {}

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

  public async findByIds(
    ids: string[],
    request: BaseInternalRequest,
  ): Promise<CarPart[]> {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<CarPart[]>>(
        `${this._endpoint}/ids`,
        { ids },
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
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
    payload: UpdateCarPartMerchant,
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

  public async block(data: Partial<IntegrateProduct>) {
    return this._carzCarPart.emit(CMD.MERCHANT_ACCOUNT_REMOVED, data);
  }
}
