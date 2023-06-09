import { RmqRecord } from '@nestjs/microservices';
import { BaseService } from './base.service';
import { SendMultiStaffDTO } from 'src/features/notification/dto';

export interface INotificationService extends BaseService {
  sendMultiStaffs(payload: RmqRecord<SendMultiStaffDTO>): Promise<void>;
}
