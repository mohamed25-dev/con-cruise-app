import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Module({
  providers: [DriversService],
  exports: [DriversService],
})
export class DriversModule {}
