import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { OrderEntity } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DiningTable } from './entities/dining-table.entity';
import { OrderRulesService } from './order-rules/orders-rules.service';
import { OrdersSummaryService } from './orders-summary.service';
import { OrderPreparationEstimateService } from './order-preparation-estimate/order-preparation-estimate.service';
import { OrderPriorityService } from './order-priority.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity, OrderEntity, DiningTable]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderRulesService,
    OrdersSummaryService,
    OrderPreparationEstimateService,
    OrderPriorityService,
  ],
})
export class OrdersModule {}
