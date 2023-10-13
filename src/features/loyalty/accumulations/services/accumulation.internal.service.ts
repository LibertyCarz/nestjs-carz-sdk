import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CMD, SERVICES } from '../../../../constants';
import { BaseSdkEventPayloadRequest } from '../../../../shared/base.request';
import { AccumulationPayload } from '../dto/accumulation.dto';
@Injectable()
export class LoyaltyAccumulationInternalService {
  constructor(
    @Inject(SERVICES.CARZ_LOYALTIES) private _carzLoyalty: ClientProxy,
  ) {}

  public async emitAccumulation<D = object>(
    payload: BaseSdkEventPayloadRequest<AccumulationPayload<D>>,
  ) {
    return this._carzLoyalty.emit(
      CMD.CAR_LOYALTY_ACCUMULATION,
      payload.buildRecord(),
    );
  }
}
