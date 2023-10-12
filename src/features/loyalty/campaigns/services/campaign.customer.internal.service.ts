import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { Campaign } from '../types';
import { BaseInternalRequest } from '../../../../types';
import { ListCampaignCustomerDTO } from '../dto';
@Injectable()
export class LoyaltyCampaignCustomerInternalService {
  private _endpoint =
    process.env.LOYALTY_SERVICE_ENDPOINT + 'customer/campaigns';
  constructor(private _httpService: HttpService) {}

  public async list(
    request: BaseInternalRequest<ListCampaignCustomerDTO>,
  ): Promise<BaseResponse<Campaign[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<Campaign[]>>(
        `${this._endpoint}`,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
  }

  public async detail(id: string) {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<Campaign>>(`${this._endpoint}/${id}`),
    );
    return response.data.data;
  }
}
