import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { SaleStatus } from '../../common/types/sale-status.type';
import { INTEGER } from 'sequelize';

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
  model_id: number;

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
  })
  sale_status: SaleStatus;

  @Column({
    type: DataType.STRING,
  })
  sale_percentage: number;
}
