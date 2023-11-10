import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { Attribute } from './models/attribute.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[SequelizeModule.forFeature([
    Attribute
  ])],
  controllers: [AttributesController],
  providers: [AttributesService],
  exports:[AttributesService]
})
export class AttributesModule {}
