import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IntegrationBrand } from '../dto';
import { CMD, SERVICES } from '../../../constants';

@Injectable()
export class BrandInternalService {
  constructor(
    @Inject(SERVICES.CARZ_INTEGRATIONS) private _carzIntegration: ClientProxy,
  ) {}
  public create(data: IntegrationBrand) {
    return this._carzIntegration.emit(CMD.CAR_INTEGRATION_BRAND_CREATED, data);
  }

  public update(data: IntegrationBrand) {
    return this._carzIntegration.emit(CMD.CAR_INTEGRATION_BRAND_UPDATED, data);
  }
}
