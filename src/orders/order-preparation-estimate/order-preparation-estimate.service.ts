import { Injectable } from '@nestjs/common';
import { OrdersService } from '../orders.service';

@Injectable()
export class OrderPreparationEstimateService {
  constructor(private readonly ordersService: OrdersService) {}

  async estimate(id: number) {
    const order = await this.ordersService.findOne(id);

    const estimatedMinutes =
      order.status === 'ready' ? 0 : 3 + order.quantity * 2;

    return {
      orderId: order.id,
      status: order.status,
      estimatedMinutes,
    };
  }
}
