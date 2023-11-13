import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rating } from './models/rating.model';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [SequelizeModule.forFeature([Rating]), UserModule, ProductModule],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
