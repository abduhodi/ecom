import { BelongsTo, ForeignKey, HasMany, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { Brand } from '../../brand/models/brand.model';
import { Category } from '../../category/models/category.model';

interface BrandCategoryAttr {
  brand_id: number;
  category_id: number;
}

@Table({ tableName: 'brand_category' })
export class BrandCategory extends Model<BrandCategory, BrandCategoryAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Brand)
  brand_id: number;
  @BelongsTo(() => Brand)
  brand: Brand;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Category)
  category_id: number;
  @BelongsTo(() => Category)
  category: Category;
}
