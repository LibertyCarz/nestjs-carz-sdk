import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Comment } from 'src/types';

@Injectable()
export class PostCommunityInternalService {
  private _endpoint;
  constructor(private _httpService: HttpService) {
    this._endpoint = process.env.COMMUNITY_SERVICE_ENDPOINT + 'posts';
  }

  public async list(payload: any): Promise<any> {
    const response = await lastValueFrom(
      this._httpService.post(`${this._endpoint}/list`, payload),
    );
    return response.data;
  }

  public async like(payload: {
    data: { user: number; postId: string; userType: number };
  }): Promise<any> {
    const response = await lastValueFrom(
      this._httpService.patch(`${this._endpoint}/like`, payload.data),
    );
    return response.data;
  }

  public async detail(payload: any) {
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}/${payload.params.id}`, {
        data: payload.data,
      }),
    );
    return response.data;
  }

  public async share(payload: {
    data: { user: number; postId: string };
  }): Promise<any> {
    const response = await lastValueFrom(
      this._httpService.post(`${this._endpoint}/share`, payload.data),
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

    return response.data;
  }
}
