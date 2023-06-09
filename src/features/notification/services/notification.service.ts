import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecord } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { INotificationService } from 'src/shared/notification.service';
import { CMD, SERVICE } from '../../../constants';
import { InsertNotificationDTO, SendMultiStaffDTO } from '../dto';

@Injectable()
export class IntegrationNotificationService implements INotificationService {
  private _endpoint: string;
  constructor(
    @Inject(SERVICE.CARZ_NOTIFICATIONS) private _carzNotification: ClientProxy,
    private _httpService: HttpService,
  ) {
    this._endpoint = process.env.NOTIFICATION_ENDPOINT;
  }
  async sendMultiStaffs({ data, options }: RmqRecord<SendMultiStaffDTO>) {
    try {
      this._carzNotification
        .emit(
          CMD.NOTIFICATION.SEND_MULTI_STAFFS,
          new RmqRecord<SendMultiStaffDTO>(data, options),
        )
        .subscribe({
          next: (v) => console.log(v),
          error: (e) => console.error(e),
          complete: () => console.info('complete'),
        });
    } catch (error) {
      console.log('ERROR WHEN SEND MULTI STAFF', { error });
    }
  }
  create(payload: InsertNotificationDTO) {
    return this._carzNotification.emit(
      CMD.NOTIFICATION.SEND_MULTI_STAFFS,
      payload,
    );
  }
  update(payload: any) {
    throw new Error('Method not implemented.');
  }
  delete(payload: any) {
    throw new Error('Method not implemented.');
  }
  getList(payload: any) {
    throw new Error('Method not implemented.');
  }
  public async findOne(payload: any) {
    const response = await lastValueFrom(
      this._httpService.get(`${this._endpoint}`, payload),
    );
    return response.data;
  }
}
