import { BelongsToMany, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { Brand } from '../../brand/models/brand.model';
import { BrandCategory } from '../../brand_category/models/brand_category.model';

interface CategoryAttr {
  category_name: string;
  parent_category_id: number;
  position: number;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  category_name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  parent_category_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  position: number;

  @BelongsToMany(() => Brand, () => BrandCategory)
  brand: Brand[];
}
