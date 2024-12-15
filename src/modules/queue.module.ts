import { DynamicModule } from '@nestjs/common';
import { QUEUE_HELPER } from 'src/constants';
import { QueueManager } from 'src/helpers/queue.helper';

export class QueueHelperMoudle {
  static forRoot(): DynamicModule {
    return {
      module: QueueHelperMoudle,
      providers: [
        {
          provide: QUEUE_HELPER,
          useClass: QueueManager,
        },
      ],
      exports: [QUEUE_HELPER],
    };
  }
}
