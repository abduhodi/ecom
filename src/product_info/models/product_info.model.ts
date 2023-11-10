import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../product/models/product.model'
import { Attribute } from 'src/attributes/models/attribute.model';

interface ProductInfoAttrs {
  product_id: number;
  attribute_id: number;
  attribute_value: string;
  show_in_main: boolean;
}

@Table({ tableName: 'product_info' })
export class ProductInfo extends Model<ProductInfo, ProductInfoAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Product ID' })
    @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;

    @BelongsTo(() => Product)
    product: Product;

  @ApiProperty({ example: 1, description: 'Attribute ID' })
    @ForeignKey(() => Attribute)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  attribute_id: number;

    @BelongsTo(() => Attribute)
    attribute: Attribute;

  @ApiProperty({ example: 3, description: 'Attribute Value' })
  @Column({
    type: DataType.STRING,  
    allowNull: false,
  })
  attribute_value: string;

  @ApiProperty({ example: false, description: 'Show in main' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue:false
  })
  show_in_main: boolean;
}
