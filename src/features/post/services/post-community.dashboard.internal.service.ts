import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { PostCreateDto } from '../dto';

@Injectable()
export class PostCommunityDashboardInternalService {
  private _endpoint;
  constructor(private _httpService: HttpService) {
    this._endpoint = process.env.COMMUNITY_SERVICE_ENDPOINT + 'dashboard-posts';
  }

  public async create(payload: {
    data: PostCreateDto;
    config?: any;
  }): Promise<any> {
    const response = await lastValueFrom(
      this._httpService.post(`${this._endpoint}`, payload.data, payload.config),
    );
    return response.data;
  }

  public async filter(payload: any) {
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}`, payload),
    );
    return response.data;
  }

  public async getDetail(payload: any) {
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}/${payload.id}`),
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

  public async getCommentsOfPost(
    id: string,
    query: object,
  ): Promise<{ data: SDK.List<Comment>; total: number }> {
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}/${id}/comments`, {
        params: query,
      }),
    );
    console.log(response.data);

    return response.data;
  }
}
