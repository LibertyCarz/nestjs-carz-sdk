import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import {
  BaseSdkEventPayloadRequest,
  BaseSdkHttpRequest,
} from '../../../shared/base.request';
import { CMD, SERVICES } from '../../../constants';
import { PayloadCreateOneEvent, UpdateNotificationDto } from '../dto';

@Injectable()
export class NotificationInternalService {
  private _endpoint: string;
  constructor(
    @Inject(SERVICES.CARZ_NOTIFICATIONS) private _carzNotification: ClientProxy,
    private _httpService: HttpService,
  ) {
    this._endpoint = process.env.NOTIFICATION_SERVICE_ENDPOINT;
  }

  async update(
    notificationId: number,
    payload: UpdateNotificationDto,
    request: BaseSdkHttpRequest,
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

  async clear(request: BaseSdkHttpRequest) {
    const response = await lastValueFrom(
      this._httpService.put(`${this._endpoint}/clear`, {}, request.getConfig()),
    );
    return response.data;
  }
  async count(request: BaseSdkHttpRequest) {
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}/count`, request.getConfig()),
    );
    return response.data;
  }
  async getList(request: BaseSdkHttpRequest) {
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}`, request.getConfig()),
    );
    return response.data;
  }
  public async findOne(notificationId: number, request: BaseSdkHttpRequest) {
    const response = await lastValueFrom(
      this._httpService.get(
        `${this._endpoint}/${notificationId}`,
        request.getConfig(),
      ),
    );
    return response.data;
  }

  public async createNotificationOneEvent(
    payload: BaseSdkEventPayloadRequest<PayloadCreateOneEvent>,
  ) {
    return this._carzNotification.emit(
      CMD.CAR_NOTIFICATION,
      payload.buildRecord(),
    );
  }

  public async deleteNotification(
    notificationId: number,
    request: BaseSdkHttpRequest,
  ) {
    const response = await lastValueFrom(
      this._httpService.delete(
        `${this._endpoint}/${notificationId}`,
        request.getConfig(),
      ),
    );
    return response.data;
  }
}
