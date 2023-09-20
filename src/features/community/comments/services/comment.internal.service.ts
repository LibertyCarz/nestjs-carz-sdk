import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Comment } from '../../../../types';

@Injectable()
export class CommunityCommentInternalService {
  private _endpoint;
  private _logger = new Logger(CommunityCommentInternalService.name);
  constructor(private _httpService: HttpService) {
    this._endpoint = process.env.COMMUNITY_SERVICE_ENDPOINT + 'comments';
  }

  public async create(payload: Comment): Promise<Comment> {
    try {
      const response = await lastValueFrom(
        this._httpService.post(`${this._endpoint}`, payload),
      );
      return response.data;
    } catch (error) {
      this._throwErrorResponseService('create_comment_internal_sv', error);
    }
  }

  public async update(
    id: string,
    payload: Partial<Comment>,
  ): Promise<{ data: Comment; status: number }> {
    try {
      const response = await lastValueFrom(
        this._httpService.patch(`${this._endpoint}/${id}`, payload),
      );
      return response.data;
    } catch (error) {
      this._throwErrorResponseService('update_comment_internal_sv', error);
    }
  }

  public async delete(
    id: string,
    user: SDK.User,
  ): Promise<{ data: boolean; status: number }> {
    try {
      const response = await lastValueFrom(
        this._httpService.delete(`${this._endpoint}/${id}`, {
          params: {
            user: user.id,
            userType: user.userType,
          },
        }),
      );
      return response.data;
    } catch (error) {
      this._throwErrorResponseService('GetReplies_InterSV', error);
    }
  }

  public async getReplies(id: string, query: object) {
    try {
      const response = await lastValueFrom(
        this._httpService.get(`${this._endpoint}/${id}/replies`, {
          params: query,
        }),
      );
      return response.data;
    } catch (error) {
      this._throwErrorResponseService('GetReplies_InterSV', error);
    }
  }

  public async countReplies(payload: { data: { commentIds: string[] } }) {
    try {
      const response = await lastValueFrom(
        this._httpService.post(`${this._endpoint}/countReplies`, payload.data),
      );
      return response.data;
    } catch (error) {
      this._throwErrorResponseService('GetReplies_InterSV', error);
    }
  }

  private _throwErrorResponseService(message, err) {
    this._logger.error(message, err);
    const { status, statusCode, ...rest } = err.response?.data;
    throw new HttpException({ ...rest }, status ? status : statusCode);
  }
}
