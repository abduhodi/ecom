import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/user/models/user.model';

interface CommentAttr {
  user_id: number;
  product_id: number;
  comment: string;
  parent_comment_id: number;
}
@Table({ tableName: 'comment' })
export class Comment extends Model<Comment, CommentAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column({ type: DataType.STRING, allowNull: false })
  comment: string;

  @Column({ type: DataType.INTEGER })
  parent_comment_id: number;
}
