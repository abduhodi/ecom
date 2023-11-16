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
import { District } from '../../district/models/district.model';
import { Order } from '../../order/models/order.model';

interface OrderAddressAttrs {
  street: string;
  zip_code: string;
  phone_number: string;
  district_id: number;
}

@Table({ tableName: 'order_address' })
export class OrderAddress extends Model<OrderAddress, OrderAddressAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '123 Street', description: 'Street' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @ApiProperty({ example: '12345', description: 'Zip Code' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  zip_code: string;

  @ApiProperty({ example: '123-456-7890', description: 'Phone Number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @ApiProperty({ example: 1, description: 'District ID' })
  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  district_id: number;

  @BelongsTo(() => District)
  district: District;

  @HasMany(() => Order)
  order: Order[];
}
