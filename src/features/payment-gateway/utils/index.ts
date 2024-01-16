import { AxiosResponse, isAxiosError } from 'axios';
import { Observable, lastValueFrom } from 'rxjs';

export async function executePaymentRequest<TResponse = void>(
  request: Observable<AxiosResponse<TResponse>>,
) {
  try {
    const response = await lastValueFrom(request);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error?.response?.data;
    }
    throw error;
  }
}
