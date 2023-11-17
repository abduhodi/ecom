import { Module } from '@nestjs/common';
import { BrandCategoryService } from './brand_category.service';
import { BrandCategoryController } from './brand_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BrandCategory } from './models/brand_category.model';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [SequelizeModule.forFeature([BrandCategory]), CategoryModule],
  controllers: [BrandCategoryController],
  providers: [BrandCategoryService],
  exports: [BrandCategoryService],
})
export class BrandCategoryModule {}
