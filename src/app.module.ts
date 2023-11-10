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
import { AttributeGroupModule } from './attribute_group/attribute_group.module';
import { AttributesModule } from './attributes/attributes.module';
import { AttributeGroup } from './attribute_group/models/attribute_group.model';
import { Attribute } from './attributes/models/attribute.model';
import { ProductInfoModule } from './product_info/product_info.module';
import { ProductInfo } from './product_info/models/product_info.model';

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
      models: [Admin, Product, Session, SessionItem, Cart,Otp, User, AttributeGroup, Attribute, ProductInfo],
    }),
    AdminModule,
    CategoryModule,
    UserModule,
    OtpModule,
    SessionModule,
    SessionItemsModule,
    CartModule,
    ProductModule,
    AttributeGroupModule,
    AttributesModule,
    ProductInfoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
