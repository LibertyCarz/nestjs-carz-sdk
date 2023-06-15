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

export class BasePayloadRequest<TRquest = any> {
  payload: TRquest;
  options: RmqRecordOptions;
  constructor(payload: TRquest, options: RmqRecordOptions) {
    (this.payload = payload), (this.options = options);
  }
  public buildRecord() {
    return new RmqRecord<TRquest>(this.payload, this.options);
  }
}
