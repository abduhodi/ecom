import { Module } from '@nestjs/common';
import { ProductViewService } from './product_view.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductView } from './models/product_view.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductView])],
  providers: [ProductViewService],
  exports: [ProductViewService],
})
export class ProductViewModule {}
