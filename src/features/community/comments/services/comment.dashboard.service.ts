import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Comment } from '../../../../types';

@Injectable()
export class CommunityCommentDashboardInternalService {
  private _endpoint;
  constructor(private _httpService: HttpService) {
    this._endpoint =
      process.env.COMMUNITY_SERVICE_ENDPOINT + 'dashboard/comments';
  }

  public async updateStatus(
    id: string,
    payload: Partial<Comment>,
  ): Promise<Comment> {
    const response = await lastValueFrom(
      this._httpService.patch(`${this._endpoint}/${id}/status`, payload),
    );
    return response.data;
  }
}
