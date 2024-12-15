import { Inject, Injectable, Res } from '@nestjs/common';
import { QUEUE_HELPER } from 'src/constants';
import { QueueManager } from 'src/helpers/queue.helper';
import { MeesageBody } from 'src/models/body';
import { Response } from 'express';

@Injectable()
export class QueueManagerService {
  constructor(
    @Inject(QUEUE_HELPER) private queueHelper: QueueManager<string, string>,
  ) {}
  async addQueueMessage(body: MeesageBody, queue_name: string) {
    const { message } = body;
    this.queueHelper.enqueue(queue_name, message);
    return this.queueHelper.getItems(queue_name);
  }

  async getNextMessage(queue_name: string, res: Response, timeout = 10) {
    try {
      const message = await this.waitForMessage(queue_name, timeout);
      if (message) {
        return res.json(message);
      } else {
        return res.status(204).send();
      }
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  }

  private async waitForMessage(
    queueName: string,
    timeout: number,
  ): Promise<any | undefined> {
    const startTime = Date.now();
    return new Promise<any | undefined>((resolve, reject) => {
      const checkQueue = () => {
        const message = this.queueHelper.dequeue(queueName);
        if (message) {
          resolve(message);
        } else if (Date.now() - startTime >= timeout) {
          resolve(undefined);
        } else {
          setTimeout(checkQueue, timeout ?? 1000);
        }
      };

      checkQueue();
    });
  }

  waitWithTimeout(timeout: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Operation timed out')); // Reject the promise if timeout is reached
      }, timeout);

      // Simulate an operation that takes time (e.g., waiting for a message)
      setTimeout(() => {
        clearTimeout(timer); // Clear the timeout if operation finishes before timeout
        resolve(); // Resolve the promise once the operation is done
      }, 5000); // Simulate operation completion after 5 seconds
    });
  }
}
