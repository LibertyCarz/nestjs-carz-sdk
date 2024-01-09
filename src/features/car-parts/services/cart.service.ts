import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BaseInternalRequest } from '../../../types';
import { CartDto, CheckCartProductsDto } from '../dto';
import { AddCartDto, ProductCart } from '../types';

@Injectable()
export class CartCarPartInternalService {
  _logger = new Logger(CartCarPartInternalService.name);

  private _endpoint = process.env.CAR_PARTS_SERVICE_ENDPOINT + 'carts';
  constructor(private _httpService: HttpService) {}

  public async listStore(request: BaseInternalRequest): Promise<Array<string>> {
    try {
      const response = await lastValueFrom(
        this._httpService.get<BaseResponse<Array<string>>>(
          `${this._endpoint}/stores`,
          request.buildRequestConfig(),
        ),
      );
      return response.data.data as Array<string>;
    } catch (error) {
      this._throwErrorResponseService(
        error,
        'Error get list Store Internal services',
      );
    }
  }

  public async getTotal(request: BaseInternalRequest): Promise<number> {
    try {
      const response = await lastValueFrom(
        this._httpService.get<BaseResponse<number>>(
          `${this._endpoint}/total`,
          request.buildRequestConfig(),
        ),
      );
      return response.data.data as number;
    } catch (error) {
      this._throwErrorResponseService(
        error,
        'Error get total Internal Services',
      );
    }
  }

  public async myCart(
    body: CartDto,
    request: BaseInternalRequest,
  ): Promise<{ data: ProductCart[]; total: number }> {
    try {
      const response = await lastValueFrom(
        this._httpService.post<{ data: ProductCart[]; total: number }>(
          `${this._endpoint}/products`,
          body,
          request.buildRequestConfig(),
        ),
      );
      return response.data;
    } catch (error) {
      this._throwErrorResponseService(
        error,
        'Error get my cart Internal Services',
      );
    }
  }

  public async checkProducts(
    body: CheckCartProductsDto,
    request: BaseInternalRequest,
  ): Promise<{ data: boolean }> {
    const response = await lastValueFrom(
      this._httpService.post<{ data: boolean }>(
        `${this._endpoint}/products/check`,
        body,
        request.buildRequestConfig(),
      ),
    );
    return response.data;
  }

  public async addCart(
    body: AddCartDto,
    request: BaseInternalRequest,
  ): Promise<{ data: ProductCart }> {
    try {
      const response = await lastValueFrom(
        this._httpService.post<{ data: ProductCart }>(
          `${this._endpoint}`,
          body,
          request.buildRequestConfig(),
        ),
      );
      return response.data;
    } catch (error) {
      this._throwErrorResponseService(
        error,
        'Error add cart Internal Services',
      );
    }
  }

  private _throwErrorResponseService(err: any, message?: string) {
    this._logger.error(message || 'Error from Car Parts service', err);
    const { status, statusCode, ...rest } = err.response?.data;
    throw new HttpException({ ...rest }, status ? status : statusCode);
  }
}
