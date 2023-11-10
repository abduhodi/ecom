import { HasMany, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { SessionItem } from '../../session_items/model/session_item.model';
import { ProductInfo } from 'src/product_info/models/product_info.model';

interface ProductAttr {
  name: string;
  category_id: number;
  brand_id: number;
  model_id: number;
  price: number;
  sale_price: number;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  category_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  brand_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  model_id: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  price: number;

  @Column({ type: DataType.DECIMAL, defaultValue: 0 })
  sale_price: number;

  @HasMany(() => SessionItem)
  sessionItem: SessionItem[];

  @HasMany(() => ProductInfo)
    productInfo: ProductInfo[];
}
