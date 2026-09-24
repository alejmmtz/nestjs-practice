import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('dining-table')
export class DiningTable {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', default: 1, unique: true })
  number!: number;

  @Column({ type: 'int' })
  capacity!: number;

  @OneToMany(() => OrderEntity, (order) => order.table)
  orders!: OrderEntity[];
}
