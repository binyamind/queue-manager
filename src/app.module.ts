import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueManagerService } from './services/queue.service';
import { QueueManagerController } from './controllers/queue.controller';
import { QueueHelperMoudle } from './modules/queue.module';

@Module({
  imports: [QueueHelperMoudle.forRoot()],
  controllers: [AppController, QueueManagerController],
  providers: [AppService, QueueManagerService],
})
export class AppModule {}
