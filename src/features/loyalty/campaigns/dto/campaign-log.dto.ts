export type CampaignLogPayload<D = object> = {
  rule: string;
  data: D;
};

export type ReferTransactionPayload = {
  type: string;
  refId: string;
  refererCode: string;
  user: number;
  userType: number;
};
