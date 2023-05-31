import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CMD } from '../../../constants';

@Injectable()
export class IntegrationCarService {
  constructor(
    @Inject('CARZ_INTEGRATION') private _carzInteration: ClientProxy,
  ) {}

  public async insert(data: any) {
    return this._carzInteration.emit(CMD.CAR_INSERT, {
      data: data,
    });
  }
}
