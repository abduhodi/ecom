import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { BrandCategory } from 'src/brand_category/models/brand_category.model';
import { Sale } from '../../sale/models/sale.model';
import { ModelAttribute } from '../../model_attribute/models/model_attribute.model';

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

  @HasOne(() => Sale)
  sale: Sale;

  @HasMany(() => ModelAttribute)
  model_attributes: ModelAttribute[];
}
