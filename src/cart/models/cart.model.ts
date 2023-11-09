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
// import { CartItem } from '../../cart_items/model/cart_item.model';
// import { User } from '../../user/model/user.model';

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
  //   @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  //   @BelongsTo(() => User)
  //   user: User;

  //   @HasMany(() => CartItem)
  //   cartItems: CartItem[];
}
