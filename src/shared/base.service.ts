import { HttpException, HttpStatus } from '@nestjs/common';
import { isAxiosError } from 'axios';
export class BaseService {
  protected throwError(error: any) {
    if (isAxiosError(error)) {
      throw new HttpException(
        error.response?.data,
        error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
