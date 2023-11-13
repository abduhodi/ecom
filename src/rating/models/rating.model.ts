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
  
  interface RatingAttr {
    rating: number;
    user_id: number;
    product_id: number;
  }
  @Table({ tableName: 'rating' })
  export class Rating extends Model<Rating, RatingAttr> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;
  
    @Column({ type: DataType.INTEGER, allowNull: false})
    rating: number;

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
  }
  