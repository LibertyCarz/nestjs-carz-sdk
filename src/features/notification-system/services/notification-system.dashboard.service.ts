import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { CMD, SERVICES } from '../../../constants';
import {
  InsertNotificationDTO,
  PayloadCreateOneEvent,
  UpdateNotificationDto,
} from '../dto';
import { BasePayloadRequest, BaseSdkRequest } from 'src/shared/base.request';

@Injectable()
export class IntegrationNotificationDashboardService {
  private _endpoint: string;
  constructor(
    @Inject(SERVICES.CARZ_NOTIFICATIONS) private _carzNotification: ClientProxy,
    private _httpService: HttpService,
  ) {
    this._endpoint = process.env.NOTIFICATION_ENDPOINT;
  }

  create(payload: BasePayloadRequest<InsertNotificationDTO>) {
    return this._carzNotification.emit(
      CMD.CAR_NOTIFICATION,
      payload.buildRecord(),
    );
  }

  async update(
    notificationId: number,
    payload: UpdateNotificationDto,
    request: BaseSdkRequest,
  ) {
    const response = await lastValueFrom(
      this._httpService.put(
        `${this._endpoint}/${notificationId}`,
        payload,
        request.getConfig(),
      ),
    );
    return response.data;
  }

  async clear(request: BaseSdkRequest) {
    const response = await lastValueFrom(
      this._httpService.put(`${this._endpoint}/clear`, {}, request.getConfig()),
    );
    return response.data;
  }
  async count(request: BaseSdkRequest) {
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}/count`, request.getConfig()),
    );
    return response.data;
  }
  async getList(request: BaseSdkRequest) {
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}`, request.getConfig()),
    );
    return response.data;
  }
  public async findOne(notificationId: number, request: BaseSdkRequest) {
    const response = await lastValueFrom(
      this._httpService.get(
        `${this._endpoint}/${notificationId}`,
        request.getConfig(),
      ),
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
