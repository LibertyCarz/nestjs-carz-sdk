import { Injectable } from '@nestjs/common';
import { FormRequest, ListFormRequestDTO } from '../dto';
import { BaseInternalRequest } from '../../../../types';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FormRequestIntegrateInternalService {
  private _endpoint;
  constructor(private _httpService: HttpService) {
    this._endpoint = process.env.INTEGRATION_SERVICE_ENDPOINT + 'form-requests';
  }
  public async upsert(data: FormRequest) {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<FormRequest>>(
        `${this._endpoint}`,
        data,
      ),
    );
    return response.data?.data;
  }

  public async list(
    params: ListFormRequestDTO,
    headers?: CarzHeader,
  ): Promise<BaseResponse<FormRequest[]>> {
    const request = new BaseInternalRequest<ListFormRequestDTO>({
      headers,
      params,
    });

    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<FormRequest[]>>(
        `${this._endpoint}`,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
  }

  public async detail(id: string): Promise<FormRequest> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<FormRequest>>(
        `${this._endpoint}/${id}`,
      ),
    );
    return response.data?.data;
  }
}
