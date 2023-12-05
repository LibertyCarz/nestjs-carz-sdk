import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IntegrationModel } from '../dto';
import { CMD, SERVICES } from '../../../../constants';

@Injectable()
export class ModelInternalService {
    constructor(
        @Inject(SERVICES.CARZ_INTEGRATIONS) private _carzIntegration: ClientProxy,
    ) { }
    public upsert(data: IntegrationModel) {
        return this._carzIntegration.emit(CMD.CAR_INTEGRATION_MODEL_INSERTED, data);
    }
}
