import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from '../../cart/models/cart.model';
import { Product } from '../../product/models/product.model';
import { Session } from '../../session/models/session.model';

interface SessionItemAttrs {
  session_id: string;
  product_id: number;
  quantity: number;
  subtotal: number;
}

@Table({ tableName: 'session_items' })
export class SessionItem extends Model<SessionItem, SessionItemAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Cart ID' })
    @ForeignKey(() => Session)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  session_id: string;

    @BelongsTo(() => Session)
    session: Session;

  @ApiProperty({ example: 1, description: 'Product ID' })
    @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;

    @BelongsTo(() => Product)
    product: Product;

  @ApiProperty({ example: 3, description: 'Quantity' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @ApiProperty({ example: 89.97, description: 'Subtotal' })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  subtotal: number;
}
