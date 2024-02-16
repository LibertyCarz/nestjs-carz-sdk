export class InsertKeywordsDTO {
  keyword: string;
  deviceId: string;
}

export class BulkByUserDTO {
  deviceId: string;
  user: number;
  userType: number;
}

export type RecommendationFilter = BaseRequestParams & {
  user?: number;
  userType?: number;
  deviceId?: string;
};
