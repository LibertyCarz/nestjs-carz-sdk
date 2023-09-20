import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Comment } from '../../../../types';

@Injectable()
export class CommunityCommentDashboardInternalService {
  private _endpoint;
  private _logger = new Logger(CommunityCommentDashboardInternalService.name);

  constructor(private _httpService: HttpService) {
    this._endpoint =
      process.env.COMMUNITY_SERVICE_ENDPOINT + 'dashboard/comments';
  }

  public async updateStatus(
    id: string,
    payload: Partial<Comment>,
  ): Promise<Comment> {
    try {
      const response = await lastValueFrom(
        this._httpService.patch(`${this._endpoint}/${id}/status`, payload),
      );
      return response.data;
    } catch (error) {
      this._throwErrorResponseService(
        'update_status_comment_internal_sv',
        error,
      );
    }
  }

  private _throwErrorResponseService(message, err) {
    this._logger.error(message, err);
    const { status, statusCode, ...rest } = err.response?.data;
    throw new HttpException({ ...rest }, status ? status : statusCode);
  }
}
