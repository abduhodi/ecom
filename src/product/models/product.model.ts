import { BelongsTo, ForeignKey, HasMany, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { SessionItem } from '../../session_items/model/session_item.model';
import { ProductInfo } from 'src/product_info/models/product_info.model';
import { ProductMedia } from '../../product_media/models/product_media.model';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/models/category.model';
import { Brand } from 'src/brand/models/brand.model';
import { Comment } from 'src/comment/models/comment.model';

import { Rating } from 'src/rating/models/rating.model';
import { Saved } from 'src/saved/models/saved.model';

import { ProductModel } from '../../product_model/model/product_model.model';

interface ProductAttr {
  name: string;
  category_id: number;
  brand_id: number;
  model_id: number;
  price: number;
  sale_price: number;
  average_rating: number;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductAttr> {
  @ApiProperty({ description: 'Unique Id' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ description: 'Name of product' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ description: 'Id of category' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Category)
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({ description: 'Id of brand' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Brand)
  brand_id: number;

  @BelongsTo(() => Brand)
  brand: Brand;

  @ApiProperty({ description: 'Id of model' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => ProductModel)
  model_id: number;
  @BelongsTo(() => ProductModel)
  productmodel: ProductModel;

  @ApiProperty({ description: 'Price of product' })
  @Column({ type: DataType.DECIMAL, allowNull: false })
  price: number;

  @ApiProperty({ description: 'Price of product in sale' })
  @Column({ type: DataType.DECIMAL, defaultValue: 0 })
  sale_price: number;

  @Column({ type: DataType.DECIMAL, defaultValue: 0 })
  average_rating: number;

  @HasMany(() => SessionItem)
  sessionItem: SessionItem[];

  @HasMany(() => ProductInfo)
  productInfo: ProductInfo[];

  @HasMany(() => ProductMedia)
  productMedia: ProductMedia[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Rating)
  rating: Rating[];

  @HasMany(() => Saved)
  saved: Saved[];
}
