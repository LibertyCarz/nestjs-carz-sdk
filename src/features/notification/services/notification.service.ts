import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { CMD, SERVICES } from '../../../constants';
import {
  BasePayloadRequest,
  InsertNotificationDTO,
  PayloadCreateOneEvent,
  SendMultiStaffDTO,
} from '../dto';
import { Request } from 'express';

@Injectable()
export class IntegrationNotificationService {
  private _endpoint: string;
  constructor(
    @Inject(SERVICES.CARZ_NOTIFICATIONS) private _carzNotification: ClientProxy,
    private _httpService: HttpService,
  ) {
    this._endpoint = process.env.NOTIFICATION_ENDPOINT;
  }
  // async sendMultiStaffs(payload: BasePayloadRequest<SendMultiStaffDTO>) {
  //   const response = await lastValueFrom(
  //     this._httpService.post(`${this._endpoint}`, payload.buildRecord()),
  //   );
  //   return response;
  // }
  create(payload: BasePayloadRequest<InsertNotificationDTO>) {
    return this._carzNotification.emit(
      CMD.CAR_NOTIFICATION,
      payload.buildRecord(),
    );
  }
  update(payload: any) {
    throw new Error('Method not implemented.');
  }
  delete(payload: any) {
    throw new Error('Method not implemented.');
  }
  async getList(request: Request, query: any) {
    request.params = query;
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}`, request),
    );
    return response.data;
  }
  public async findOne(payload: any) {
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}`, payload),
    );
    return response.data;
  }

  public async createNotificationOneEvent(
    payload: BasePayloadRequest<PayloadCreateOneEvent>,
  ) {
    return this._carzNotification.emit(
      CMD.CAR_NOTIFICATION,
      payload.buildRecord(),
    );
  }
}
