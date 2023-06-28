import { RmqRecordOptions } from '@nestjs/microservices';

export class InsertNotificationDTO {
  user: SDK.User;
  data: object;
}

export class SendMultiStaffDTO {
  users: Array<SDK.User>;
  data: object;
}

export class SendMultiStaffRequest {
  payload: SendMultiStaffDTO;
  options: RmqRecordOptions;
}

export type PayloadCreateOneEvent = InsertNotificationDTO & {
  notificationTypeKey: string;
};

export type CreateNotificationSystem = {
  schedule: string;
  userGroupType: NOTIFICATION_USER_GROUP;
  translations: NotificationSystemTranslations[];
};

type NotificationSystemTranslations = {
  id?: number;
  language: string;
  title: string;
  body: string;
  bodyHtml: string;
  image: string;
};

export enum NOTIFICATION_USER_GROUP {
  MERCHANT = 'merchant',
  CUSTOMER = 'customer',
  BOTH = 'both',
}

export type UpdateNotificationDto = {
  read: boolean;
  updatedBy: number;
};
