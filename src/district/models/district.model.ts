import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface DistrictAttr {
  name: string;
  parent_id: number;
}

@Table({ tableName: 'district' })
export class District extends Model<District, DistrictAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  parent_id: number;
}
