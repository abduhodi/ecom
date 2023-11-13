import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ResponseLoggingMiddleware } from './middlewares/response-logging.middleware';

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
import { BrandModule } from './brand/brand.module';
import { Brand } from './brand/models/brand.model';
import { Category } from './category/models/category.model';
import { BrandCategoryModule } from './brand_category/brand_category.module';
import { BrandCategory } from './brand_category/models/brand_category.model';
import { SaleModule } from './sale/sale.module';
import { Sale } from './sale/models/sale.model';
import { AttributeGroupModule } from './attribute_group/attribute_group.module';
import { AttributesModule } from './attributes/attributes.module';
import { AttributeGroup } from './attribute_group/models/attribute_group.model';
import { Attribute } from './attributes/models/attribute.model';
import { ProductInfoModule } from './product_info/product_info.module';
import { ProductInfo } from './product_info/models/product_info.model';
import { ProductMediaModule } from './product_media/product_media.module';
import { ProductMedia } from './product_media/models/product_media.model';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/models/comment.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { ProductModelModule } from './product_model/product_model.module';
import { ProductModel } from './product_model/model/product_model.model';
import { RatingModule } from './rating/rating.module';
import { Rating } from './rating/models/rating.model';
import { SavedModule } from './saved/saved.module';
import { Saved } from './saved/models/saved.model';
import { DeliveryModule } from './delivery/delivery.module';
import { Delivery } from './delivery/models/delivery.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    JwtModule.register({
      global: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../', 'media'),
      serveRoot: '/api/media',
      exclude: ['/api/media/index.html'],
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
        Attribute,
        AttributeGroup,
        Brand,
        BrandCategory,
        Category,
        Sale,
        ProductInfo,
        ProductMedia,
        Comment,
        ProductModel,
        Rating,
        Saved,
        Delivery
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
    BrandModule,
    BrandCategoryModule,
    SaleModule,
    AttributeGroupModule,
    AttributesModule,
    ProductInfoModule,
    ProductMediaModule,
    CommentModule,
    ProductModelModule,
    RatingModule,
    SavedModule,
    DeliveryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the middleware to all routes
    consumer.apply(ResponseLoggingMiddleware).forRoutes('*');
  }
}
// export class AppModule {}
