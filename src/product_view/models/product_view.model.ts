import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/product/models/product.model';

interface ProductViewAttr {
  user_id: string;
  product_id: number;
  view_date: Date;
}

@Table({ tableName: 'product_view' })
export class ProductView extends Model<ProductView, ProductViewAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  user_id: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column({ type: DataType.DATE, allowNull: false })
  view_date: Date;
}
