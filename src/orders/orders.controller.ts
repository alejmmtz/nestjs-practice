import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post /*Query*/,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersSummaryService } from './orders-summary.service';
import { OrderPreparationEstimateService } from './order-preparation-estimate/order-preparation-estimate.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly orderSummaryService: OrdersSummaryService,
    private readonly orderPreparationEstimateService: OrderPreparationEstimateService,
  ) {}

  /*
  @Get()
  findAll(@Query('status') status?: string) {
    return this.ordersService.findAll(status);
  }
    */

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('pending')
  findRecentPending() {
    return this.ordersService.findRecentPending();
  }

  @Get('/summary')
  summary() {
    return this.orderSummaryService.createSummary();
  }

  @Get('/pending-queue')
  pedingQueue() {
    return this.ordersService.findPendingQueue();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(Number(id), updateOrderDto);
  }

  @Patch(':id/ready')
  updateToReady(@Param('id') id: string) {
    return this.ordersService.markAsReady(Number(id));
  }

  @Get(':id/estimate')
  estimate(@Param('id') id: string) {
    return this.orderPreparationEstimateService.estimate(Number(id));
  }

  @Get(':id/priority')
  priority(@Param('id') id: string) {
    return this.ordersService.getPriority(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(Number(id));
  }
}
