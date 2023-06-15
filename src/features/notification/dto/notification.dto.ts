import { RmqRecord, RmqRecordOptions } from '@nestjs/microservices';
import { BaseFilter } from 'src/shared/base.request';
import { Request } from 'express';

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

export class BaseRequest<TParams = BaseFilter> {
  request: Request<TParams>;
  params: TParams;
  constructor(data: BaseRequest<TParams>) {
    this.request = data.request;
    this.params = data.params;
    this.request.params = data.params;
  }
  getConfig() {
    return this.request;
  }
}

export type UpdateNotificationDto = {
  read: boolean;
  updatedBy: number;
};
