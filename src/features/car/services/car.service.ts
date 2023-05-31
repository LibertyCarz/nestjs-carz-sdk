import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CMD } from 'src/constants/cmd.constant';

@Injectable()
export class CarService {
  constructor(
    @Inject('CARZ_INTEGRATION') private _carzInteration: ClientProxy,
  ) {}

  public async insert(data: any) {
    return this._carzInteration.emit(CMD.CAR_INSERT, {
      data: data,
    });
  }
}
