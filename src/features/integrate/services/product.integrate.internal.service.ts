import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CMD, SERVICES } from '../../../constants';
import { IntegrateProduct } from '../dto';

@Injectable()
export class CarPartIntegrateInternalService {
  constructor(
    @Inject(SERVICES.CARZ_INTEGRATIONS) private _carzIntegration: ClientProxy,
  ) {}

  public async insert(data: IntegrateProduct[]) {
    return this._carzIntegration.emit(CMD.PRODUCT_INTEGRATION_CREATED, data);
  }

  public async update(data: IntegrateProduct[]) {
    return this._carzIntegration.emit(CMD.PRODUCT_INTEGRATION_UPDATED, data);
  }
}