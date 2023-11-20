import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ProductModel } from '../../product_model/model/product_model.model';

interface IAdsAttr {
  model_id: number;
  title: string;
  description: string;
  image: string;
}

@Table({ tableName: 'ads', timestamps: false })
export class Ads extends Model<Ads, IAdsAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => ProductModel) //!    **
  @Column({
    type: DataType.INTEGER,
  })
  model_id: number;
  @BelongsTo(() => ProductModel) //!    **
  model: ProductModel;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  image: string;
}
