import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ShutdownService } from './shutdown/shutdown.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly shutdownService: ShutdownService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('shutdown')
  shutdown(): string {
    this.shutdownService.shutdown();
    return 'server is shutting down';
  }
}
