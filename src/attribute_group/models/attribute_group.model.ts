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
import { Attribute } from 'src/attributes/models/attribute.model';
// import { Category } from 'src/category/models/category.model';

interface AttributeGroupAttrs {
  name: string;
  category_id: number;
  position: number;
}

@Table({ tableName: 'attribute_group' })
export class AttributeGroup extends Model<AttributeGroup, AttributeGroupAttrs> {
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

  @ApiProperty({ example: 1, description: 'Category ID' })
    // @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: number;

    // @BelongsTo(() => Category)
    // category: Category;

  @ApiProperty({ example: 3, description: 'Position' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  position: number;

  @HasMany(() => Attribute)
  Attribute: Attribute[];

}
