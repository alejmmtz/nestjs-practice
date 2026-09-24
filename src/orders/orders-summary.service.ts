import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';

type Summary = {
  total: number;
  pending: number;
  ready: number;
};

@Injectable()
export class OrdersSummaryService {
  constructor(private readonly ordersService: OrdersService) {}

  async createSummary(): Promise<Summary> {
    const orders = await this.ordersService.findOrders();

    if (!orders) {
      throw new NotFoundException(`There are no existing orders`);
    }

    const summary: Summary = {
      total: orders.length,
      pending: 0,
      ready: 0,
    };

    for (const order of orders) {
      if (order?.status === 'pending') {
        summary.pending++;
      } else if (order?.status === 'ready') {
        summary.ready++;
      }
    }

    return summary;
  }
}
