import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Comment } from '../../../../types';

@Injectable()
export class CommunityCommentInternalService {
  private _endpoint;
  constructor(private _httpService: HttpService) {
    this._endpoint = process.env.COMMUNITY_SERVICE_ENDPOINT + 'comments';
  }

  public async create(payload: Comment): Promise<Comment> {
    const response = await lastValueFrom(
      this._httpService.post(`${this._endpoint}`, payload),
    );
    return response.data;
  }

  public async update(
    id: string,
    payload: Partial<Comment>,
  ): Promise<{ data: boolean; status: number }> {
    const response = await lastValueFrom(
      this._httpService.patch(`${this._endpoint}/${id}`, payload),
    );
    return response.data;
  }

  public async delete(
    id: string,
    user: SDK.User,
  ): Promise<{ data: boolean; status: number }> {
    const response = await lastValueFrom(
      this._httpService.delete(`${this._endpoint}/${id}`, {
        params: {
          user: user.id,
          userType: user.userType,
        },
      }),
    );
    return response.data;
  }

  public async getReplies(id: string, query: object) {
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}/${id}`, { params: query }),
    );
    return response.data;
  }
}
