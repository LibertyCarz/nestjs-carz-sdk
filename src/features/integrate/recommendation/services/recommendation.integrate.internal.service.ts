import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CMD, SERVICES } from '../../../../constants';
import { BulkByUserDTO, InsertKeywordsDTO, RecommendationFilter } from '../dto';

@Injectable()
export class RecommendationInternalService {
  private _endpoint: string =
    process.env.INTEGRATION_SERVICE_ENDPOINT + 'recommendations';
  constructor(
    private _httpService: HttpService,
    @Inject(SERVICES.CARZ_INTEGRATIONS) private _carzIntegration: ClientProxy,
  ) {}
  public async insertKeywords(data: InsertKeywordsDTO) {
    return this._carzIntegration.emit(CMD.RECOMMENDATION_INSERT_SEARCH, data);
  }

  public async bulkByUser(data: BulkByUserDTO) {
    return this._carzIntegration.emit(CMD.RECOMMENDATION_BULK_BY_USER, data);
  }

  public async keywords(request: RecommendationFilter) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<string[]>>(
        `${this._endpoint}/keywords`,
        {
          params: request,
        },
      ),
    );
    return response.data;
  }
}
