import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stock } from './models/stock.model';
import { Product } from '../product/models/product.model';

@Module({
  imports: [SequelizeModule.forFeature([Stock, Product])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
