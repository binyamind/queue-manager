import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { MeesageBody } from 'src/models/body';
import { QueueManagerService } from 'src/services/queue.service';
import { Response } from 'express';

@Controller('api')
export class QueueManagerController {
  constructor(private service: QueueManagerService) {}

  @Post(':queue_name')
  async addQueueMessage(
    @Body() messageBody: MeesageBody,
    @Param('queue_name') queue_name: string,
  ) {
    return await this.service.addQueueMessage(messageBody, queue_name);
  }

  @Get(':queue_name')
  async getNextMessage(
    @Param('queue_name') queue_name: string,
    @Query('timeout') timeout: number,
    @Res() res: Response,
  ) {
    return await this.service.getNextMessage(queue_name, res, timeout);
  }
}
