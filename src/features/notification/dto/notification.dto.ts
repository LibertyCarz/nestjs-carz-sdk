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
  excludeDeviceIds?: string[];
};

export type UpdateNotificationDto = {
  read: boolean;
  updatedBy: number;
};

export type PayloadCreateGroupEvent = {
  userNotifications: InsertNotificationDTO[];
  userType: number;
  notificationTypeKey: string;
};
