import { ProductInfo } from './../../product_info/models/product_info.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { AttributeGroup } from 'src/attribute_group/models/attribute_group.model';
// import { Category } from 'src/category/models/category.model';

interface AttributeAttrs {
  name: string;
  attribute_group_id: number;
}

@Table({ tableName: 'attributes' })
export class Attribute extends Model<Attribute, AttributeAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 1, description: 'Attribute Group ID' })
    @ForeignKey(() => AttributeGroup)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  attribute_group_id: number;

    @BelongsTo(() => AttributeGroup)
    attributeGroup: AttributeGroup;

    @HasMany(() => ProductInfo)
    productInfo: ProductInfo[];
}
