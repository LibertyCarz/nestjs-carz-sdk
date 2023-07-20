import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BaseSdkHttpRequest } from '../../../shared/base.request';

@Injectable()
export class NotificationSystemInternalService {
  private _endpoint: string;
  constructor(private _httpService: HttpService) {
    this._endpoint =
      process.env.NOTIFICATION_SERVICE_ENDPOINT + 'notifications-system';
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
  public async delete(id: number, request: BaseSdkHttpRequest) {
    const response = await lastValueFrom(
      this._httpService.delete(`${this._endpoint}/${id}`, request.getConfig()),
    );
    return response.data;
  }

  public async updateRead(id: number, request: BaseSdkHttpRequest) {
    const response = await lastValueFrom(
      this._httpService.patch(
        `${this._endpoint}/${id}/read`,
        {},
        request.getConfig(),
      ),
    );
    return response.data;
  }

  public async updateReadAll(request: BaseSdkHttpRequest) {
    const response = await lastValueFrom(
      this._httpService.put(`${this._endpoint}/clear`, {}, request.getConfig()),
    );
    return response.data;
  }
}
