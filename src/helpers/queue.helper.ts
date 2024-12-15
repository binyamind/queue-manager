import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManager<K, T> {
  private queueMap: Map<K, any> = new Map();

  enqueue(key: K, item: T): void {
    if (this.queueMap.has(key)) {
      this.queueMap.get(key)?.items.push(item);
    } else {
      this.queueMap.set(key, { items: [item] });
    }
  }
  dequeue(key: K): T | undefined {
    const queue = this.queueMap.get(key);
    if (queue && queue.items.length > 0) {
      return queue.items.shift();
    }
    return undefined;
  }

  isEmpty(key: K): boolean {
    return this.queueMap.get(key)?.isEmpty() ?? true;
  }

  peek(key: K): T | undefined {
    return this.queueMap.get(key)?.peek();
  }

  getItems(key: K): T[] | undefined {
    return this.queueMap?.get(key);
  }

  hasQueue(key: K): boolean {
    return this.queueMap.has(key);
  }

  removeQueue(key: K): void {
    this.queueMap.delete(key);
  }
}
