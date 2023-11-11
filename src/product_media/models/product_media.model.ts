import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/product/models/product.model';

interface ProductMediaAttr {
  product_id: number;
  url: string;
}

@Table({ tableName: 'product_media' })
export class ProductMedia extends Model<ProductMedia, ProductMediaAttr> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 1, description: 'Product ID' })
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;

  @ApiProperty({ example: 1, description: 'Url of media' })
  @Column({ type: DataType.STRING, allowNull: false })
  url: string;
}
