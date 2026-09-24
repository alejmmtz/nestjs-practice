import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { DiningTable } from './dining-table.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 120 })
  item!: string;

  @Column({ type: 'int', default: 1 })
  quantity!: number;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status!: 'pending' | 'ready';

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders, {
    nullable: false,
  })
  @JoinColumn({ name: 'customer_id' })
  customer!: CustomerEntity;

  @ManyToOne(() => DiningTable, (table) => table.orders, {
    nullable: false,
  })
  @JoinColumn({ name: 'table-id' })
  table!: DiningTable;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
