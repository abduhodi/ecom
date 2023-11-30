import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductModel } from '../../product_model/model/product_model.model';
import { Attribute } from '../../attributes/models/attribute.model';

interface IModelAttribute {
  id: number;
  model_id: number;
  attribute_id: number;
  attribute_value: string[];
  is_changable: boolean;
}

@Table({ tableName: 'model_attribute' })
export class ModelAttribute extends Model<ModelAttribute, IModelAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => ProductModel)
  @Column({
    type: DataType.INTEGER,
  })
  model_id: number;

  @BelongsTo(() => ProductModel)
  product_model: ProductModel;

  @ForeignKey(() => Attribute)
  @Column({
    type: DataType.INTEGER,
  })
  attribute_id: number;

  @BelongsTo(() => Attribute)
  attribute: Attribute;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  attribute_value: string[];

  @Column({
    type: DataType.BOOLEAN,
  })
  is_changable: boolean;
}
