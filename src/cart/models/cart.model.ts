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
import { CartItem } from '../../cart_items/models/cart_item.model';
import { Product } from '../../product/models/product.model';
import { User } from '../../user/models/user.model';

interface CartAttrs {
  user_id: number;
}

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart, CartAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'User ID' })
  // @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  // @BelongsTo(() => User)
  // user: User;

  // @ApiProperty({ example: 1, description: 'Product ID' })
  // @ForeignKey(() => Product)
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // product_id: number;

  // @BelongsTo(() => Product)
  // product: Product;

  // @ApiProperty({ example: 3, description: 'Quantity' })
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // quantity: number;

  // @ApiProperty({ example: 89.97, description: 'Subtotal' })
  // @Column({
  //   type: DataType.DECIMAL(10, 2),
  //   allowNull: false,
  // })
  // subtotal: number;

  @HasMany(() => CartItem)
  cartItems: CartItem[];
}
