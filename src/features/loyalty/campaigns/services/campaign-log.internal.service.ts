import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CMD, SERVICES } from '../../../../../src/constants';
import { BaseSdkEventPayloadRequest } from '../../../../../src/shared/base.request';
import { CampaignAccumulationPayload } from '../dto/campaign-log.dto';
@Injectable()
export class LoyaltyCampaignLogInternalService {
  constructor(
    @Inject(SERVICES.CARZ_LOYALTIES) private _carzLoyalty: ClientProxy,
  ) {}

  public async emitCampaignLog<D = object>(
    payload: BaseSdkEventPayloadRequest<CampaignAccumulationPayload<D>>,
  ) {
    return this._carzLoyalty.emit(
      CMD.CAR_LOYALTY_CAMPAIGN_LOG,
      payload.buildRecord(),
    );
  }
}
