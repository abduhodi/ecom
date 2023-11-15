import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';

interface IStockAttr {
  id: number;
  product_id: number;
  quantity_in_stock: number;
}

@Table({ tableName: 'stock' })
export class Stock extends Model<Stock, IStockAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Product) //     ! **
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;

  @BelongsTo(() => Product) //     ! **
  product: Product;

  @Column({
    type: DataType.INTEGER,
  })
  quantity_in_stock: number;
}
