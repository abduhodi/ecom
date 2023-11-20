import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ads } from './models/ads.model';
import { ProductModelModule } from '../product_model/product_model.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([Ads]), ProductModelModule, FilesModule],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
