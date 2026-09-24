import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
/*import type { Order } from './order.interface';*/
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { OrderEntity } from './entities/order.entity';
import { DiningTable } from './entities/dining-table.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRulesService } from './order-rules/orders-rules.service';
import { OrderPriorityService } from './order-priority.service';

@Injectable()
export class OrdersService {
  /*
  private orders: Order[] = [
    { id: 1, customer: 'Laura', item: 'Café latte', status: 'pending' },
    { id: 2, customer: 'Mateo', item: 'Sándwich', status: 'ready' },
  ];


  async findAll(status?: string): Promise<OrderEntity> {
    if (!status) {
      return this.orders;
    }

    return this.orders.filter((order) => order.status === status);
  } */

  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,

    @InjectRepository(CustomerEntity)
    private readonly customersRepository: Repository<CustomerEntity>,

    @InjectRepository(DiningTable)
    private readonly tableRepository: Repository<DiningTable>,

    private readonly orderRulesService: OrderRulesService,

    private readonly orderPriorityService: OrderPriorityService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const customer = await this.customersRepository.findOneBy({
      id: createOrderDto.customerId,
    });

    const table = await this.customersRepository.findOneBy({
      id: createOrderDto.tableId,
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer with id ${createOrderDto.customerId} was not found`,
      );
    }

    if (!table) {
      throw new NotFoundException(
        `Table with id ${createOrderDto.tableId} was not found`,
      );
    }

    const order = this.ordersRepository.create({
      item: createOrderDto.item,
      quantity: createOrderDto.quantity,
      status: 'pending',
      customer,
      table,
    });

    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      relations: {
        customer: true,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async findOrders(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        customer: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} was not found`);
    }

    return order;
  }

  async markAsReady(id: number): Promise<OrderEntity> {
    const order = await this.findOne(id);

    this.orderRulesService.ensureCanBeMarkedAsReady(order);

    order.status = 'ready';

    return this.ordersRepository.save(order);
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    const order = await this.findOne(id);

    this.ordersRepository.merge(order, updateOrderDto);

    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<OrderEntity> {
    const order = await this.findOne(id);

    return this.ordersRepository.remove(order);
  }

  async findRecentPending(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      where: { status: 'pending' },
      relations: { customer: true },
      order: { id: 'DESC' },
      take: 5,
    });
  }

  async findPendingQueue() {
    const orders = await this.ordersRepository.find({
      where: { status: 'pending' },
      relations: { customer: true },
      order: { id: 'ASC' },
      take: 5,
    });

    const totalPending = await this.ordersRepository.countBy({
      status: 'pending',
    });

    return {
      totalPending,
      showing: orders.length,
      orders,
    };
  }

  async getPriority(id: number) {
    const order = await this.findOne(id);

    if (!order) {
      throw new BadRequestException("Order doesn't exist");
    }

    const classification = this.orderPriorityService.classify(order);

    return {
      orderId: order.id,
      status: order.status,
      quantity: order.quantity,
      priority: classification.priority,
      message: classification.message,
    };
  }
}
