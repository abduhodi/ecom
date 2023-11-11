import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Admin } from './admin/models/admin.model';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';

import { OtpModule } from './otp/otp.module';
import { Otp } from './otp/models/otp.model';
import { User } from './user/models/user.model';

import { SessionModule } from './session/session.module';
import { SessionItemsModule } from './session_items/session_items.module';
import { CartModule } from './cart/cart.module';

import { ProductModule } from './product/product.module';
import { Product } from './product/models/product.model';
import { Session } from './session/models/session.model';
import { SessionItem } from './session_items/model/session_item.model';
import { Cart } from './cart/models/cart.model';
import { CartItemsModule } from './cart_items/cart_items.module';
import { CartItem } from './cart_items/models/cart_item.model';
import { OrderModule } from './order/order.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { OrderAddressModule } from './order_address/order_address.module';
import { DistrictModule } from './district/district.module';
import { OrderItem } from './order_items/models/order_item.model';
import { OrderAddress } from './order_address/models/order_address.model';
import { District } from './district/models/district.model';
import { Order } from './order/models/order.model';
import { Category } from './category/models/category.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    JwtModule.register({
      global: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      logging: false,
      models: [
        Admin,
        Product,
        Session,
        SessionItem,
        Cart,
        Otp,
        User,
        CartItem,
        OrderItem,
        OrderAddress,
        District,
        Order,
      ],
    }),
    AdminModule,
    CategoryModule,
    UserModule,
    OtpModule,
    SessionModule,
    SessionItemsModule,
    CartModule,
    ProductModule,
    CartItemsModule,
    OrderModule,
    OrderItemsModule,
    OrderAddressModule,
    DistrictModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
