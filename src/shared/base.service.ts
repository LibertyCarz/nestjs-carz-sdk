import { HttpException } from '@nestjs/common';
import { isAxiosError } from 'axios';
export class BaseService {
  protected throwError(error: any) {
    if (isAxiosError(error)) {
      throw new HttpException(error.response.data, error.response.status);
    } else {
      throw new HttpException(error.message, 500);
    }
  }
}
