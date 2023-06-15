import { RmqRecord, RmqRecordOptions } from '@nestjs/microservices';

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
