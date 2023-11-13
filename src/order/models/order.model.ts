import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderAddress } from '../../order_address/models/order_address.model';
import { OrderItem } from '../../order_items/models/order_item.model';
import { User } from '../../user/models/user.model';
import { Delivery } from 'src/delivery/models/delivery.model';

interface OrderAttrs {
  user_id: number;
  order_date: Date;
  order_status: string;
  total_amount: number;
  shipping_address: number;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'User ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: '2023-08-31', description: 'Order date' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  order_date: Date;

  @ApiProperty({ example: 'Processing', description: 'Order status' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  order_status: string;

  @ApiProperty({ example: 100.5, description: 'Total amount' })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  total_amount: number;

  @ApiProperty({ example: '123 Shipping St', description: 'Shipping address' })
  @ForeignKey(() => OrderAddress)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  address_id: number;

  @BelongsTo(() => OrderAddress)
  address: OrderAddress;

  @HasMany(() => OrderItem)
  order_items: OrderItem[];
  

  @HasMany(() => Delivery)
  delivery: Delivery[];
}