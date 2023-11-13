import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
  } from 'sequelize-typescript';
import { Order } from 'src/order/models/order.model';
  import { Product } from 'src/product/models/product.model';
  import { User } from 'src/user/models/user.model';
  
  interface DeliveryAttr {
    delivered: boolean;
    order_id: number;
  }
  @Table({ tableName: 'delivery' })
  export class Delivery extends Model<Delivery, DeliveryAttr> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.BOOLEAN, allowNull: false ,defaultValue:false})
    delivered: boolean;
    
    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER, allowNull: false })
    order_id: number;
    
    @BelongsTo(() => Order)
    order: Order;
  }
  