export type CampaignAccumulationPayload<D = object> = {
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

export type ReferRegistrationPayload = {
  inviter: number;
  inviterType: number;
  invitee: number;
  inviteeType: number;
};
