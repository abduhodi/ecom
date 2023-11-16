import { forwardRef, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';
import { JwtModule } from '@nestjs/jwt';
import { OrderAddressModule } from '../order_address/order_address.module';
import { OrderModule } from '../order/order.module';
import { OrderItemsModule } from '../order_items/order_items.module';
// import { CartItemsModule } from '../cart_items/cart_items.module';
import { UserModule } from '../user/user.module';
import { User } from '../user/models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart, User]),
    JwtModule,
    OrderAddressModule,
    OrderModule,
    OrderItemsModule,
    forwardRef(() => UserModule),
    // CartItemsModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
