import {
  PAYMENT_CURRENCY,
  PAYWAY_PAYMENT_OPTIONS,
  PAYMENT_TYPE,
  PAYMENT_GATEWAY,
} from '../types';

export class CreatePaymentDto {
  transactionId: string;
  amount: number;
  currency: PAYMENT_CURRENCY;
  note: string;
  extraData: object;
  user: number;
  userType: number;
  paymentOptions: PAYWAY_PAYMENT_OPTIONS;
  type: PAYMENT_TYPE;
  gateway: PAYMENT_GATEWAY;
  partnerId?: number;
}

export class CheckPaymentDto {
  transactionId: string;
}

export class PaymentSuccessWebhookDto {
  tran_id: string;
  status: number;
  apv: string;
  return_params: string;
}
