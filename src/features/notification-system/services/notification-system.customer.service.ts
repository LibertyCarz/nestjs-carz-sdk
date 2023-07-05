import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BaseSdkHttpRequest } from '../../../shared/base.request';

@Injectable()
export class IntegrationNotificationSystemService {
  private _endpoint: string;
  constructor(private _httpService: HttpService) {
    this._endpoint = process.env.SDK_BASE_URL + process.env.SDK_BASE_URL;
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
}
