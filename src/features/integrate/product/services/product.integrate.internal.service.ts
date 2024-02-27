import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CMD, SERVICES } from '../../../../constants';
import { IntegrateProduct, IntegrationUpdateAddress } from '../dto';
import { BaseInternalRequest } from '../../../../types';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CarPartIntegrateInternalService {
  private _endpoint: string =
    process.env.INTEGRATION_SERVICE_ENDPOINT + 'products';
  constructor(
    private _httpService: HttpService,
    @Inject(SERVICES.CARZ_INTEGRATIONS) private _carzIntegration: ClientProxy,
  ) {}
  public async updateAddress(data: IntegrationUpdateAddress) {
    return this._carzIntegration.emit(
      CMD.PRODUCT_INTEGRATION_ADDRESS_UPDATED,
      data,
    );
  }

  public async insert(data: IntegrateProduct[]) {
    return this._carzIntegration.emit(CMD.PRODUCT_INTEGRATION_CREATED, data);
  }

  public async update(data: IntegrateProduct[]) {
    return this._carzIntegration.emit(CMD.PRODUCT_INTEGRATION_UPDATED, data);
  }

  public async search(request: BaseInternalRequest) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<IntegrateProduct[]>>(
        this._endpoint,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
  }

  public async count(request: BaseInternalRequest): Promise<number> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<number>>(
        `${this._endpoint}/count`,
        request.buildRequestConfig(),
      ),
    );
    return response.data?.data;
  }

  public block(data: Partial<IntegrateProduct>) {
    return this._carzIntegration.emit(CMD.MERCHANT_ACCOUNT_REMOVED, data);
  }
}
