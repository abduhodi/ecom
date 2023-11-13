import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminAttrs {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  hashed_password: string;
  hashed_token: string;
  is_superadmin: boolean;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'Admin first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Admin last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Admin phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Admin email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Admin password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_superadmin: boolean;

  @ApiProperty({
    example: 'hashed_token',
    description: 'Admin hashed token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_token: string;

  @ApiProperty({
    example: 'activation_link',
    description: 'Admin activation link',
  })
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}
