import { CreatePaymentDto } from '../dto';
import { CheckPayWayResponse, CreatePayWayResponse } from './payway.types';

export enum PAYMENT_CURRENCY {
  USD = 'USD',
  KHR = 'KHR',
}

export enum PAYMENT_GATEWAY {
  PAYWAY = 'payway',
}

export enum PAYMENT_STATUS {
  NEW = 'new',
  PROCESSING = 'processing',
  PAID = 'paid',
  FAILED = 'failed',
}

export enum PAYMENT_TYPE {
  SUBSCRIPTION = 'subscription',
  ACCESSORY = 'accessory',
  CAR = 'car',
  SERVICE = 'service',
}

export enum PAYWAY_PAYMENT_OPTIONS {
  CARDS = 'cards',
  ABAPAY = 'abapay',
  ABAPAY_DEEPLINK = 'abapay_deeplink',
  WECHAT = 'wechat',
  ALIPAY = 'alipay',
  BAKONG = 'bakong',
}
export class BaseEntity {
  id: number;
  updatedAt?: Date;
  createdAt?: Date;
  constructor(data?: Partial<BaseEntity>) {
    this.id = data?.id;
    this.createdAt = data?.createdAt;
    this.updatedAt = data?.updatedAt;
  }
}

export class Partner extends BaseEntity {
  name: string;
  description: string;
  payments: Payment[];
  constructor(data?: Partial<Partner>) {
    super(data);
    this.name = data?.name;
    this.description = data?.description;
    this.payments = data?.payments;
  }
}

export class Payment extends BaseEntity {
  transactionId: string;
  amount: number;
  currency: PAYMENT_CURRENCY;
  status: PAYMENT_STATUS;
  note: string;
  gateway: PAYMENT_GATEWAY;
  extraData: object;
  user: number;
  userType: number;
  paymentOptions: PAYWAY_PAYMENT_OPTIONS;
  type: PAYMENT_TYPE;
  partner: Partner;
  constructor(data?: Partial<Payment>) {
    super(data);
    this.transactionId = data?.transactionId;
    this.amount = data?.amount;
    this.currency = data?.currency;
    this.status = data?.status;
    this.note = data?.note;
    this.gateway = data?.gateway;
    this.extraData = data?.extraData;
    this.user = data?.user;
    this.userType = data?.userType;
    this.paymentOptions = data?.paymentOptions;
    this.type = data?.type;
    this.partner = data?.partner;
  }
}

export type CreatePaymentResponse = {
  gateway: PAYMENT_GATEWAY;
  response: CreatePayWayResponse;
  payment: Payment;
};

export type CheckPaymentResponse = {
  response: CheckPayWayResponse;
  payment: Payment;
};

export type PayWayWebHookResponse = {
  affected: number;
  payment: Payment;
};

export interface IPaymentInternalService {
  create(dto: CreatePaymentDto): Promise<CreatePaymentResponse>;
  check(transactionId: string): Promise<CheckPaymentResponse>;
}
