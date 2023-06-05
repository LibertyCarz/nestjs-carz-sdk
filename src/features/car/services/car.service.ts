import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CMD, SERVICE } from '../../../constants';
import { BaseService } from '../../../shared/base.service';
import { IntegrationMultipleCar } from '../dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class IntegrationCarService implements BaseService {
  private _endpoint;
  constructor(
    @Inject(SERVICE.CARZ_INTEGRATIONS) private _carzInteration: ClientProxy,
    private _httpService: HttpService,
  ) {
    this._endpoint = process.env.INTEGRATION_ENDPOINT;
  }
  create(payload: any) {
    throw new Error('Method not implemented.');
  }
  update(payload: any) {
    throw new Error('Method not implemented.');
  }
  delete(payload: any) {
    throw new Error('Method not implemented.');
  }
  getList(payload: any) {
    throw new Error('Method not implemented.');
  }
  public async findOne(payload: any) {
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}`, payload),
    );
    return response.data;
  }

  public async insert(data: IntegrationMultipleCar) {
    return this._carzInteration.emit(CMD.CAR_INSERT, data);
  }
}
