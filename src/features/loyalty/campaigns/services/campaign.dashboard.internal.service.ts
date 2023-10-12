import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import {
  CreateCampaignDTO,
  CreateCampaignRulesDTO,
  CreateCampaignUsersDTO,
  ListCampaignDTO,
  UpdateCampaignDTO,
} from '../dto';
import { Campaign, CampaignRule, CampaignUser } from '../types';
import { BaseInternalRequest } from '../../../../types';
@Injectable()
export class LoyaltyCampaignDashboardInternalService {
  private _endpoint =
    process.env.LOYALTY_SERVICE_ENDPOINT + 'dashboard/campaigns';
  private _endpointCampaignRules =
    process.env.LOYALTY_SERVICE_ENDPOINT + 'dashboard/campaign-rules';
  private _endpointCampaignUsers =
    process.env.LOYALTY_SERVICE_ENDPOINT + 'dashboard/campaign-users';
  constructor(private _httpService: HttpService) {}

  public async list(
    request: BaseInternalRequest<ListCampaignDTO>,
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

  public async listRules(
    id: string,
    request: BaseInternalRequest<BaseRequestParams>,
  ): Promise<BaseResponse<CampaignRule[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<CampaignRule[]>>(
        `${this._endpoint}/${id}/rules`,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
  }

  public async listUsers(
    id: string,
    request: BaseInternalRequest<BaseRequestParams>,
  ): Promise<BaseResponse<CampaignUser[]>> {
    const response = await lastValueFrom(
      this._httpService.get<BaseResponse<CampaignUser[]>>(
        `${this._endpoint}/${id}/users`,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
  }

  public async create(
    payload: CreateCampaignDTO,
    request: BaseInternalRequest,
  ): Promise<Campaign> {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<Campaign>>(
        `${this._endpoint}`,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }

  public async update(
    id: string,
    payload: UpdateCampaignDTO,
    request: BaseInternalRequest,
  ) {
    const response = await lastValueFrom(
      this._httpService.patch<BaseResponse<Campaign>>(
        `${this._endpoint}/${id}`,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }

  public async deleteCampaign(id: string) {
    const response = await lastValueFrom(
      this._httpService.delete<BaseResponse<Campaign>>(
        `${this._endpoint}/${id}`,
      ),
    );
    return response.data.data;
  }

  public async createCampaignRules(
    payload: CreateCampaignRulesDTO,
    request: BaseInternalRequest,
  ): Promise<CampaignRule> {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<CampaignRule>>(
        `${this._endpointCampaignRules}`,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }

  public async createCampaignUsers(
    payload: CreateCampaignUsersDTO,
    request: BaseInternalRequest,
  ): Promise<CampaignUser> {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<CampaignUser>>(
        `${this._endpointCampaignUsers}`,
        payload,
        request.buildRequestConfig(),
      ),
    );
    return response.data.data;
  }

  public async deleteCampaignRule(id: string) {
    const response = await lastValueFrom(
      this._httpService.delete<BaseResponse<CampaignRule>>(
        `${this._endpointCampaignRules}/${id}`,
      ),
    );
    return response.data.data;
  }

  public async deleteCampaignUser(id: string) {
    const response = await lastValueFrom(
      this._httpService.delete<BaseResponse<CampaignUser>>(
        `${this._endpointCampaignUsers}/${id}`,
      ),
    );
    return response.data.data;
  }
}
