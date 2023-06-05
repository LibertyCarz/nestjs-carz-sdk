import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IntegrationCarService } from './features/car/services';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private integrationCarService: IntegrationCarService,
  ) {}

  @Get()
  async getHello() {
    await this.integrationCarService.findOne({});
    return this.appService.getHello();
  }
}
