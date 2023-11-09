import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IUserAttr {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  hashed_token: string;
  is_active: boolean;
}

@Table({ tableName: 'user' })
export class User extends Model<User, IUserAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  hashed_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: true,
  })
  is_active: boolean;
}
