export const CAMPAIGN_CONSTANT = {
  STATUS: {
    UPCOMING: 'upcoming',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expired',
  },
  TYPE: {
    ALL: 'all',
    ALL_CUSTOMER: 'all_customer',
    ALL_MERCHANT: 'all_merchant',
    MERCHANT: 'merchant',
    CUSTOMER: 'customer',
    BOTH: 'both',
  },
  NAME: {
    OPEN_APP_ONE_TIME_A_DAY: 'open_app_one_time_a_day',
    COMPLETE_A_BOOKING: 'complete_a_booking',
    COMPLETE_A_PURCHASE: 'complete_a_purchase',
    REFER_A_USER_REGISTRATION: 'refer_a_user_registration',
    REFER_A_COMPLETED_BOOKING: 'refer_a_completed_booking',
    REFER_A_COMPLETED_PURCHASE: 'refer_a_completed_purchase',
    RATING_AND_REVIEW_APP: 'rating_and_review_app',
    RATING_AND_REVIEW_A_BOOKING: 'rating_and_review_a_booking',
    RATING_AND_REVIEW_A_PURCHASE: 'rating_and_review_a_purchase',
  },
};

export type Campaign = BaseMongooseType & {
  type?: string;
  status?: string;
  attribute?: Language<CampaignAttribute>;
  startDate?: string;
  endDate?: string;
  createdBy: number;
  updatedBy: number;
};

export type CampaignRule = BaseMongooseType & {
  type?: string;
  status?: string;
  attribute?: Language<CampaignAttribute>;
  startDate?: string;
  endDate?: string;
  createdBy: number;
  updatedBy: number;
};

export type CampaignUser = BaseMongooseType & {
  campaign: string;
  user: number;
  userType: number;
};

export type CampaignAttribute = {
  name?: string;
  description?: string;
  image?: string;
  termsAndConditions?: string;
};
