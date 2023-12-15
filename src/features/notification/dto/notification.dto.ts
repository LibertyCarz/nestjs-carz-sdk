import { RmqRecordOptions } from '@nestjs/microservices';

export class InsertNotificationDTO<TData = object> {
  user: SDK.User;
  data: TData;
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

export type PayloadPushNotiByDevice = InsertNotificationDTO & {
  notificationTypeKey: string;
  deviceId?:string
};

export type UpdateNotificationDto = {
  read: boolean;
  updatedBy: number;
};

export type PayloadCreateGroupEvent<TData> = {
  userNotifications: InsertNotificationDTO<TData>[];
  userType: number;
  notificationTypeKey: string;
};
