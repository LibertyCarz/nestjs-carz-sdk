import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CMD, SERVICES } from '../../../constants';
import { BaseSdkEventPayloadRequest } from '../../../shared/base.request';
import { SdkBookingRemind, SdkUpdateRemindRedisPayload } from '../dto';

@Injectable()
export class AppointmentRemindInternalService {
  constructor(
    @Inject(SERVICES.CARZ_NOTIFICATIONS) private _carzNotification: ClientProxy,
  ) {}

  public async updateRemindMerchantRedisCount(
    payload: BaseSdkEventPayloadRequest<SdkBookingRemind>,
  ) {
    return this._carzNotification.emit(
      CMD.CARZ_APPOINTMENT_REMIND,
      payload.buildRecord(),
    );
  }
}
