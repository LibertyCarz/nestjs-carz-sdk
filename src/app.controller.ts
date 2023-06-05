import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IntegrationCarService } from './features/car/services';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private _integrationCarService: IntegrationCarService,
  ) {}

  @Get()
  async getHello() {
    await this._integrationCarService.findOne({});
    return this.appService.getHello();
  }
}
