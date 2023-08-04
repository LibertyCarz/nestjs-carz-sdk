import { BOOKING_STATUS } from '../../../constants';

export type SdkUpdateRemindRedisPayload = {
  bookingId: string;
  status: BOOKING_STATUS;
  oldDate: string | Date;
  newDate: string | Date;
  merchantIds: number[];
};
