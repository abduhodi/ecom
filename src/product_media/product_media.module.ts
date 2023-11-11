import { Module } from '@nestjs/common';
import { ProductMediaService } from './product_media.service';
import { ProductMediaController } from './product_media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductMedia } from './models/product_media.model';
import { ProductModule } from 'src/product/product.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ProductMedia]),
    ProductModule,
    FilesModule,
  ],
  controllers: [ProductMediaController],
  providers: [ProductMediaService],
})
export class ProductMediaModule {}
