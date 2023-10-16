import { CampaignAttribute } from '../types';

export type ListCampaignDTO = BaseRequestParams & {
  type?: string;
  status?: string;
};

export type CreateCampaignDTO = {
  type: string;
  status: string;
  attribute: Language<CampaignAttribute>;
  startDate?: string;
  endDate?: string;
};

export type UpdateCampaignDTO = {
  status: string;
};

export class CampaignRuleDto {
  rule: string;
  exchangeType?: string;
  transaction?: number;
  voucher?: string;
  quantity?: number;
  points?: number;
}

export type CreateCampaignRulesDTO = {
  campaign: string;
  rules: CampaignRuleDto[];
};

export class CampaignUserDto {
  user: number;
  userType: number;
}

export type CreateCampaignUsersDTO = {
  campaign: string;
  users: CampaignUserDto[];
};

export type UserTotalPointsDTO = CampaignUserDto & BaseRequestParams;
