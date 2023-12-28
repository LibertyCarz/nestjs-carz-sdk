import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Career } from '..';

@Injectable()
export class CareerIntegrateInternalService {
  private _endpoint: string =
    process.env.INTEGRATION_SERVICE_ENDPOINT + 'careers';
  constructor(private _httpService: HttpService) {}

  public async list(filter: BaseRequestParams) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<Career[]>>(this._endpoint, {
        params: filter,
      }),
    );
    return response.data;
  }

  public async detail(id: string) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<Career>>(`${this._endpoint}/${id}`),
    );
    return response.data?.data;
  }
}
