import { RmqRecordOptions, RmqRecord } from '@nestjs/microservices';
import { Request } from 'express';

export class BaseSdkFilter {
  skip = 0;
  take = 10;
  user?: number;
  userType?: number;
  constructor(data?: Partial<BaseSdkFilter>) {
    Object.assign(this, data);
  }
}

export class BaseSdkEventPayloadRequest<TRquest> {
  data: TRquest;
  options: RmqRecordOptions;
  constructor(payload: TRquest, options?: RmqRecordOptions) {
    (this.data = payload), (this.options = options);
  }
  public buildRecord() {
    return new RmqRecord<TRquest>(this.data, this.options);
  }
}

export class BaseSdkHttpRequest<TParams = Partial<BaseSdkFilter>> {
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
