import { Module } from '@nestjs/common';
import { SavedService } from './saved.service';
import { SavedController } from './saved.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Saved } from './models/saved.model';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [SequelizeModule.forFeature([Saved]), UserModule, ProductModule],
  controllers: [SavedController],
  providers: [SavedService],
})
export class SavedModule {}
