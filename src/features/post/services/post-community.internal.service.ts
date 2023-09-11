import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PostCommunityInternalService {
  private _endpoint;
  constructor(private _httpService: HttpService) {
    this._endpoint = process.env.COMMUNITY_SERVICE_ENDPOINT + 'posts';
  }

  public async create(payload: any): Promise<any> {
    const response = await lastValueFrom(
      this._httpService.post(`${this._endpoint}`, payload.data, payload.config),
    );
    return response.data;
  }

  public async update(payload: any) {
    const response = await lastValueFrom(
      this._httpService.put(
        `${this._endpoint}/${payload.params.id}`,
        payload.data,
        payload.config,
      ),
    );
    return response.data;
  }
}
