import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CMD, SERVICES } from '../../../constants';
import { BaseService } from '../../../shared/base.service';
import { IntegrationCar } from '../dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class IntegrationCarInternalService implements BaseService {
  private _endpoint;
  constructor(
    private _httpService: HttpService,
    @Inject(SERVICES.CARZ_INTEGRATIONS) private _carzIntegration: ClientProxy,
  ) {
    this._endpoint = process.env.INTEGRATION_SERVICE_ENDPOINT + 'cars';
  }
  create(payload: any) {
    throw new Error('Method not implemented.');
  }
  update(payload: IntegrationCar) {
    return this._carzIntegration.emit(CMD.CAR_INTEGRATION_UPDATED, payload);
  }
  delete(payload: any) {
    throw new Error('Method not implemented.');
  }

  public async view(carId: number) {
    this._carzIntegration.emit(CMD.CAR_INTEGRATION_VIEW, { carId });
  }

  public async favorite(carId: number, isLiked: boolean) {
    const payload = { carId, isLiked };
    this._carzIntegration.emit(CMD.CAR_INTEGRATION_FAVORITE, payload);
  }

  public async getList(payload: any): Promise<any> {
    const response = await lastValueFrom(
      this._httpService.post(
        `${this._endpoint}/filter`,
        payload.data,
        payload.config,
      ),
    );
    return response.data;
  }

  public async findOne(payload: any) {
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}`, payload),
    );
    return response.data;
  }

  public async insert(data: IntegrationCar[]) {
    return this._carzIntegration.emit(CMD.CAR_INTEGRATION_CREATED, data);
  }

  public async totalViews(payload: any) {
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}/totalViews`, payload),
    );
    return response.data;
  }
}
