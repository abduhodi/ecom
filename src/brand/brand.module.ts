import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './models/brand.model';
import { BrandCategory } from '../brand_category/models/brand_category.model';

@Module({
  imports: [SequelizeModule.forFeature([Brand, BrandCategory])],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
