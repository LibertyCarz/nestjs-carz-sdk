import { RmqRecord, RmqRecordOptions } from '@nestjs/microservices';
import { Request } from 'express';
import { BaseSdkFilter } from '../../../shared/base.request';

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

export type UpdateNotificationDto = {
  read: boolean;
  updatedBy: number;
};
