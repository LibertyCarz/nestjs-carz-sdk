import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CMD, SERVICES } from '../../constants';
import { BaseService } from '../../shared/base.service';
import { BaseModelSQLType } from '../../types';
import { CarEvaluation, CarEvaluationDto } from './car-evaluation.type';

@Injectable()
export class CarEvaluationInternalService extends BaseService {
  private _endpoint: string;
  constructor(
    private _httpService: HttpService,
    @Inject(SERVICES.CARZ_CRAWLER) private _carzCrawler: ClientProxy,
  ) {
    super();
    this._endpoint = process.env.CRAWLER_SERVICE_ENDPOINT + 'car-evaluations';
  }

  async getCarEvaluation(
    params: CarEvaluationDto,
  ): Promise<BaseResponse<CarEvaluation[]>> {
    try {
      const response = await lastValueFrom(
        this._httpService.get<BaseResponse<CarEvaluation[]>>(this._endpoint, {
          params,
        }),
      );
      return response.data;
    } catch (error) {
      this.throwError(error);
    }
  }

  async upsertCars<T extends Partial<BaseModelSQLType>>(cars: T[]) {
    return this._carzCrawler.emit(CMD.CAR_CRAWLER_CARZ_CREATED, cars);
  }
}
