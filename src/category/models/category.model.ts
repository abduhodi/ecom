import { BelongsToMany, HasMany, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { Brand } from '../../brand/models/brand.model';
import { BrandCategory } from '../../brand_category/models/brand_category.model';
import { AttributeGroup } from 'src/attribute_group/models/attribute_group.model';

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

  @Column({ type: DataType.INTEGER })
  parent_category_id: number;

  @Column({ type: DataType.INTEGER})
  position: number;

  @BelongsToMany(() => Brand, () => BrandCategory)
  brand: Brand[];

  @HasMany(() => AttributeGroup)
  productInfo: AttributeGroup[];
}
