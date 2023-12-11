import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateCareerDTO } from '../dto/career.dto';
import { lastValueFrom } from 'rxjs';
import { Career } from '..';

@Injectable()
export class CareerDashboardIntegrateInternalService {
  private _endpoint: string =
    process.env.INTEGRATION_SERVICE_ENDPOINT + 'dashboard/careers';
  constructor(private _httpService: HttpService) {}

  public async create(dto: CreateCareerDTO) {
    const response = await lastValueFrom(
      this._httpService.post<BaseResponse<Career>>(this._endpoint, dto),
    );
    return response.data?.data;
  }
  public async update(id: string, dto: CreateCareerDTO) {
    const response = await lastValueFrom(
      this._httpService.patch<BaseResponse<Career>>(
        `${this._endpoint}/${id}`,
        dto,
      ),
    );
    return response.data?.data;
  }
}
