import { BOOKING_STATUS } from '../../../constants';

export class SdkUpdateRemindRedisPayload {
  oldBooking: SdkBookingRemind;
  newBooking: SdkBookingRemind;
  merchantIds: number[];
}

export type SdkBookingRemind = {
  // date: string | Date;
  // status: BOOKING_STATUS;
  bookingId: string;
  status: BOOKING_STATUS;
  oldDate: string | Date;
  newDate: string | Date;
  merchantIds: number[];
};
