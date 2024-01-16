export enum PAYWAY_PAYMENT_OPTIONS {
  CARDS = 'cards',
  ABAPAY = 'abapay',
  ABAPAY_DEEPLINK = 'abapay_deeplink',
  WECHAT = 'wechat',
  ALIPAY = 'alipay',
  BAKONG = 'bakong',
}

export enum PAYWAY_STATUS {
  APPROVED = 0,
  CREATED = 1,
  PENDING = 2,
  DECLINED = 3,
  REFUNDED = 4,
  WRONG_HASH = 5,
  TRANS_ID_NOT_FOUND = 6,
  OTHER_SERVER_SIDE_ERROR = 11,
}

export enum PAYWAY_CURRENCY {
  USD = 'USD',
  KHR = 'KHR',
}

export enum PAYWAY_VIEW_TYPE {
  HOSTED_VIEW = 'hosted_view',
  CHECKOUT = 'checkout',
}

export class BasePayWayPayload {
  merchant_id?: string;
  hash?: string;
  req_time: string;
  tran_id: string;
  constructor(data?: Partial<BasePayWayPayload>) {
    this.merchant_id = data?.merchant_id;
    this.hash = data?.hash;
    this.req_time = data?.req_time;
    this.tran_id = data?.tran_id;
  }
}

export class PayWayPayload extends BasePayWayPayload {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  amount: number;
  type: string;
  payment_option: PAYWAY_PAYMENT_OPTIONS;
  items: string;
  currency: string;
  continue_success_url: string;
  return_deeplink: string;
  custom_fields: string;
  return_param: string;
  shipping?: string;
  ctid?: string;
  pwt?: string;
  return_url?: string;
  cancel_url?: string;
  return_params?: string;
  view_type?: PAYWAY_VIEW_TYPE;
  constructor(data?: Partial<PayWayPayload>) {
    super(data);
    this.firstname = data?.firstname;
    this.lastname = data?.lastname;
    this.email = data?.email;
    this.phone = data?.phone;
    this.amount = data?.amount;
    this.type = data?.type;
    this.payment_option = data?.payment_option;
    this.items = data?.items;
    this.currency = data?.currency;
    this.continue_success_url = data?.continue_success_url;
    this.return_deeplink = data?.return_deeplink;
    this.custom_fields = data?.custom_fields;
    this.return_param = data?.return_param;
    this.shipping = data?.shipping;
    this.ctid = data?.ctid;
    this.pwt = data?.pwt;
    this.return_url = data?.return_url;
    this.cancel_url = data?.cancel_url;
    this.return_params = data?.return_params;
    this.view_type = data?.view_type;
  }
}

export class PayWayFilter {
  req_time: string;
  merchant_id: string;
  from_date: string;
  to_date: string;
  from_amount: string;
  to_amount: string;
  status: any;
  hash: string;
}
export type PayWayResponse<T> = {
  data: T;
  status: PayWayStatus;
};

export type PayWayStatus = {
  code: string;
  message: string;
  lang: string;
};

export class PayWayTransaction {
  transaction_id: string;
  transaction_date: string;
  apv: string;
  status: string;
  payment_class: string;
  original_amount: string;
  refund_amount: string;
  payment_amount: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  bank_ref: string;
}

export class CheckPayWayPayload extends BasePayWayPayload {}

export class CheckPayWayResponse {
  status: PAYWAY_STATUS;
  description: string;
  amount: number;
  totalAmount: number;
  apv: string;
  payment_status: string;
  datetime: string;
}

export type PayWayDeepLinkResponse = {
  status: PayWayStatus;
  description: string;
  qrString: string;
  abapay_deeplink: string;
  app_store: string;
  play_store: string;
};

export type CreatePayWayResponse = {
  responseUrl?: string;
  data?: PayWayDeepLinkResponse;
  html?: string;
};
