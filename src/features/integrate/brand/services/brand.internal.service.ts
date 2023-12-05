import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IntegrationBrand, ListBrandDTO } from '../dto';
import { CMD, SERVICES } from '../../../../constants';
import { BaseInternalRequest } from '../../../../types';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BrandInternalService {
  private _endpoint;
  constructor(
    private _httpService: HttpService,
    @Inject(SERVICES.CARZ_INTEGRATIONS) private _carzIntegration: ClientProxy,
  ) {
    this._endpoint = process.env.INTEGRATION_SERVICE_ENDPOINT + 'brands';
  }
  public create(data: IntegrationBrand) {
    return this._carzIntegration.emit(CMD.CAR_INTEGRATION_BRAND_CREATED, data);
  }

  public update(data: IntegrationBrand) {
    return this._carzIntegration.emit(CMD.CAR_INTEGRATION_BRAND_UPDATED, data);
  }

  public async list(
    params: ListBrandDTO,
    headers?: CarzHeader,
  ): Promise<BaseResponse<IntegrationBrand[]>> {
    const request = new BaseInternalRequest<ListBrandDTO>({
      headers,
      params,
    });

    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<IntegrationBrand[]>>(
        `${this._endpoint}`,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
  }
}
