import { OrderEntity } from './entities/order.entity';
import { OrderPriorityService } from './order-priority.service';

describe('OrderPriorityService', () => {
  const service = new OrderPriorityService();

  it('pending order with one product returns normal priority', () => {
    const order = {
      quantity: 1,
      status: 'pending',
    } as OrderEntity;

    expect(service.classify(order).priority).toEqual('normal');
  });

  it('pending order with three products returns medium priority', () => {
    const order = {
      quantity: 3,
      status: 'pending',
    } as OrderEntity;

    expect(service.classify(order).priority).toEqual('medium');
  });

  it('pending order with four products returns high priority', () => {
    const order = {
      quantity: 4,
      status: 'pending',
    } as OrderEntity;

    expect(service.classify(order).priority).toEqual('high');
  });

  it('pending order with five products & ready status returns completed', () => {
    const order = {
      quantity: 5,
      status: 'ready',
    } as OrderEntity;

    expect(service.classify(order).priority).toEqual('completed');
  });
});
