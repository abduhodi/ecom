import { Module } from '@nestjs/common';
import { BrandCategoryService } from './brand_category.service';
import { BrandCategoryController } from './brand_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BrandCategory } from './models/brand_category.model';

@Module({
  imports: [SequelizeModule.forFeature([BrandCategory])],
  controllers: [BrandCategoryController],
  providers: [BrandCategoryService],
  exports: [BrandCategoryService],
})
export class BrandCategoryModule {}
