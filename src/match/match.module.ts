import { forwardRef, Module } from '@nestjs/common';
import { CustomersModule } from '../customers/customers.module';
import { DriversModule } from '../drivers/drivers.module';
import { ScoreModule } from '../score/score.module';
import { MatchService } from './match.service';

@Module({
  imports: [ScoreModule, DriversModule, forwardRef(() => CustomersModule)],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}
