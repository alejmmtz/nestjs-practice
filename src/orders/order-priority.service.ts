import { BadRequestException, Injectable } from '@nestjs/common';

import { OrderEntity } from './entities/order.entity';

type Classification = {
  priority: string;
  message: string;
};

@Injectable()
export class OrderPriorityService {
  classify(order: OrderEntity) {
    const status = order.status;
    const quantity = order.quantity;

    if (quantity <= 0) {
      throw new BadRequestException('An order must have at least one item');
    }

    const classification: Classification = {
      priority: '',
      message: '',
    };

    if (status === 'ready') {
      classification.priority = 'completed';
      classification.message = 'Order is ready';
    } else if (status === 'pending') {
      if (quantity >= 4) {
        classification.priority = 'high';
        classification.message = 'Prepare this order soon';
      }

      if (quantity == 2 || quantity == 3) {
        classification.priority = 'medium';
        classification.message = 'Order has medium priority';
      }

      if (quantity == 1) {
        classification.priority = 'normal';
        classification.message = 'Order has normal priority';
      }
    }

    return classification;
  }
}
