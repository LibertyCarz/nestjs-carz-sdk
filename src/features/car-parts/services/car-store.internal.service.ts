import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CMD, SERVICES } from '../../../constants';
import { CarStoreInternal } from '../dto';

@Injectable()
export class CarPartCarStoreInternalService {
  constructor(
    @Inject(SERVICES.CARZ_CAR_PARTS) private _carzCarPart: ClientProxy,
  ) {}
  public create(data: CarStoreInternal[]) {
    return this._carzCarPart.emit(CMD.CAR_PART_CAR_STORE_CREATED, data);
  }

  public update(data: CarStoreInternal) {
    return this._carzCarPart.emit(CMD.CAR_PART_CAR_STORE_UPDATED, data);
  }
}
