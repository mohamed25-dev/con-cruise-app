import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { DriversModule } from './drivers/drivers.module';
import { MatchModule } from './match/match.module';
import { ScoreModule } from './score/score.module';
import { ShutdownService } from './shutdown/shutdown.service';

@Module({
  controllers: [AppController],
  providers: [AppService, ShutdownService],
  imports: [CustomersModule, DriversModule, MatchModule, ScoreModule],
})
export class AppModule {}
