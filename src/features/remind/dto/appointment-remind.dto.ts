import { BOOKING_STATUS } from 'src/constants';

export class UpdateRemindRedisPayload {
  oldStatus: BOOKING_STATUS;
  newStatus: BOOKING_STATUS;
  merchantIds: number[];
  bookingDate: string | Date;
}
