import { RmqRecord, RmqRecordOptions } from '@nestjs/microservices';
import { Request } from 'express';
import { BaseSdkFilter } from '../../../shared/base.request';

export class InsertNotificationDTO {
  user: User;
  data: object;
}

export class SendMultiStaffDTO {
  users: Array<User>;
  data: object;
}

export class SendMultiStaffRequest {
  payload: SendMultiStaffDTO;
  options: RmqRecordOptions;
}

export class BasePayloadRequest<TRquest> {
  data: TRquest;
  options: RmqRecordOptions;
  constructor(payload: TRquest, options?: RmqRecordOptions) {
    (this.data = payload), (this.options = options);
  }
  public buildRecord() {
    return new RmqRecord<TRquest>(this.data, this.options);
  }
}

export type PayloadCreateOneEvent = InsertNotificationDTO & {
  notificationTypeKey: string;
};

export class BaseSdkRequest<TParams = Partial<BaseSdkFilter>> {
  request: Request;
  params: TParams;
  constructor(request: Request, params: TParams) {
    this.request = request;
    this.params = params;
  }
  getConfig() {
    return { ...this.request, params: this.params };
  }
}

export type UpdateNotificationDto = {
  read: boolean;
  updatedBy: number;
};
