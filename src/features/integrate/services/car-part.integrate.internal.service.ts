import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CMD, SERVICES } from '../../../constants';
import { IntegrateCarPart } from '../dto';

@Injectable()
export class CarPartIntegrateInternalService {
  private _endpoint = process.env.INTEGRATION_SERVICE_ENDPOINT + 'cars';
  constructor(
    private _httpService: HttpService,
    @Inject(SERVICES.CARZ_INTEGRATIONS) private _carzIntegration: ClientProxy,
  ) {
    this._endpoint = process.env.INTEGRATION_SERVICE_ENDPOINT + 'car-parts';
  }

  public async insert(data: IntegrateCarPart[]) {
    return this._carzIntegration.emit(CMD.CAR_PART_INTEGRATION_CREATED, data);
  }

  public async update(data: IntegrateCarPart[]) {
    return this._carzIntegration.emit(CMD.CAR_PART_INTEGRATION_UPDATED, data);
  }
}
