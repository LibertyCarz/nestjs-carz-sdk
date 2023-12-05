import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IntegrationModel, ListModelDTO } from '../dto';
import { CMD, SERVICES } from '../../../../constants';
import { HttpService } from '@nestjs/axios';
import { BaseInternalRequest } from '../../../../types';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ModelInternalService {
    private _endpoint;

    constructor(
        private _httpService: HttpService,
        @Inject(SERVICES.CARZ_INTEGRATIONS) private _carzIntegration: ClientProxy,
    ) {
        this._endpoint = process.env.INTEGRATION_SERVICE_ENDPOINT + 'models';
    }
    public upsert(data: IntegrationModel) {
        return this._carzIntegration.emit(CMD.CAR_INTEGRATION_MODEL_INSERTED, data);
    }
    public async list(
        params: ListModelDTO,
        headers?: CarzHeader,
    ): Promise<BaseResponse<IntegrationModel[]>> {
        const request = new BaseInternalRequest<ListModelDTO>({
            headers,
            params,
        });

        const response = await lastValueFrom(
            this._httpService.get<BaseResponse<IntegrationModel[]>>(
                `${this._endpoint}`,
                request.buildRequestConfig(),
            ),
        );

        return response.data;
    }

}
