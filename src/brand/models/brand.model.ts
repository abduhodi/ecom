import { BelongsToMany, HasMany, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { BrandCategory } from '../../brand_category/models/brand_category.model';
import { Category } from '../../category/models/category.model';
import { Product } from 'src/product/models/product.model';

interface BrandAttr {
  brand_name: string;
  brand_description: string;
  position: number;
  image: string;
}
@Table({ tableName: 'brand' })
export class Brand extends Model<Brand, BrandAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  brand_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  brand_description: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  position: number;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @BelongsToMany(() => Category, () => BrandCategory)
  category: Category[];

  @HasMany(() => Product)
  products: Product[];
}
