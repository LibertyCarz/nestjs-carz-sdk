import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import {
  BaseSdkEventPayloadRequest,
  BaseSdkHttpRequest,
} from '../../../shared/base.request';
import { CMD, SERVICES } from '../../../constants';
import {
  PayloadCreateGroupEvent,
  PayloadCreateOneEvent,
  PayloadPushNotiByDevice,
  SendCreateGroupEvent,
  UpdateNotificationDto,
} from '../dto';

@Injectable()
export class NotificationInternalService {
  private _endpoint: string;
  constructor(
    @Inject(SERVICES.CARZ_NOTIFICATIONS) private _carzNotification: ClientProxy,
    private _httpService: HttpService,
  ) {
    this._endpoint =
      process.env.NOTIFICATION_SERVICE_ENDPOINT + 'notifications';
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

  public async sendNotificationGroupEvent<TData = any>(
    data: SendCreateGroupEvent<TData>,
  ) {
    const payload = new BaseSdkEventPayloadRequest<
      PayloadCreateGroupEvent<TData>
    >({
      userNotifications: data.userIds.map((userId) => ({
        user: {
          id: userId,
          userType: data.userType,
        },
        data: data.data,
      })),
      notificationTypeKey: data.notificationTypeKey,
      userType: data.userType,
    });
    return this._carzNotification.emit(
      CMD.CARZ_NOTIFICATION_GROUP_EVENT,
      payload.buildRecord(),
    );
  }
  public async createNotificationGroupEvent<TData>(
    payload: BaseSdkEventPayloadRequest<PayloadCreateGroupEvent<TData>>,
  ) {
    return this._carzNotification.emit(
      CMD.CARZ_NOTIFICATION_GROUP_EVENT,
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

  public async pushNotificationByDevice(
    payload: BaseSdkEventPayloadRequest<PayloadPushNotiByDevice>,
  ) {
    return this._carzNotification.emit(
      CMD.PUSH_NOTIFICATION_BY_DEVICE,
      payload.buildRecord(),
    );
  }

  public async pushNotificationNormal(
    payload: BaseSdkEventPayloadRequest<PayloadCreateOneEvent>,
  ) {
    return this._carzNotification.emit(
      CMD.PUSH_NOTIFICATION_NORMAL,
      payload.buildRecord(),
    );
  }
}
