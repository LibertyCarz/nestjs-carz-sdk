import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BaseService } from '../../shared/base.service';
import { CarEvaluation, CarEvaluationDto } from './car-evaluation.type';

@Injectable()
export class CarEvaluationInternalService extends BaseService {
  private _endpoint: string;
  constructor(private _httpService: HttpService) {
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
}
