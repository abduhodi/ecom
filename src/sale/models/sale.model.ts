import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { SaleStatus } from '../../common/types/sale-status.type';
import { ProductModel } from '../../product_model/model/product_model.model';

interface ISaleAttr {
  id: number;
  model_id: number;
  sale_start_date: Date;
  sale_end_date: Date;
  sale_status: SaleStatus;
  sale_percentage: number;
}

@Table({ tableName: 'sale' })
export class Sale extends Model<Sale, ISaleAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => ProductModel) //!   **
  model_id: number;

  @BelongsTo(() => ProductModel)
  model: ProductModel;

  @Column({
    type: DataType.DATE,
  })
  sale_start_date: Date;

  @Column({
    type: DataType.DATE,
  })
  sale_end_date: Date;

  @Column({
    type: DataType.STRING,
    defaultValue: SaleStatus.upcoming,
  })
  sale_status: SaleStatus;

  @Column({
    type: DataType.STRING,
  })
  sale_percentage: number;
}
