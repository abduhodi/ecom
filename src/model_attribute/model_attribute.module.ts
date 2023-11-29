import { Module } from '@nestjs/common';
import { ModelAttributeService } from './model_attribute.service';
import { ModelAttributeController } from './model_attribute.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ModelAttribute } from './models/model_attribute.model';

@Module({
  imports: [SequelizeModule.forFeature([ModelAttribute])],
  controllers: [ModelAttributeController],
  providers: [ModelAttributeService],
  exports: [ModelAttributeService],
})
export class ModelAttributeModule {}
