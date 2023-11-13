import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { BrandCategory } from 'src/brand_category/models/brand_category.model';

interface ProductModelAttr {
  model_name: string;
  category_brand_id: number;
}

@Table({ tableName: 'product_model' })
export class ProductModel extends Model<ProductModel, ProductModelAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  model_name: string;

  @ForeignKey(() => BrandCategory)
  @Column({ type: DataType.INTEGER, allowNull: false })
  category_brand_id: number;

  @BelongsTo(() => BrandCategory)
  category_brand: BrandCategory;
}
