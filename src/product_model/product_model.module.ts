import { Module } from '@nestjs/common';
import { ProductModelService } from './product_model.service';
import { ProductModelController } from './product_model.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModel } from './model/product_model.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel])],
  controllers: [ProductModelController],
  providers: [ProductModelService],
})
export class ProductModelModule {}
