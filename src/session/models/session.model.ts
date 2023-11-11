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
import { SessionItem } from '../../session_items/model/session_item.model';
import { User } from '../../user/models/user.model';

interface SessionAttrs {
  session_unique_id: string;
  user_id: number;
  session_start: Date;
  session_end: Date;
  cart_unique_id: string;
}

@Table({ tableName: 'session' })
export class Session extends Model<Session, SessionAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  cart_unique_id: string;

  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'session123', description: 'Unique session ID' })
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  session_unique_id: string;

  @ApiProperty({ example: 1, description: 'User ID' })
    @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

    @BelongsTo(() => User)
    user: User;

  @ApiProperty({ example: '2023-08-31', description: 'Session start' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  session_start: Date;

  @ApiProperty({ example: '2023-08-31', description: 'Session end' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  session_end: Date;

  @HasMany(() => SessionItem)
  sessionItem: SessionItem[];
}
