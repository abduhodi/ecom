import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IAdsAttr {
  title: string;
  url: string;
  image_high: string;
  image_low: string;
  position: number;
  status: boolean;
}

@Table({ tableName: 'ads', timestamps: false })
export class Ads extends Model<Ads, IAdsAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_high: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image_low: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: -1,
  })
  position: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  status: boolean;
}
