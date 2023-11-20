import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { Attribute } from './models/attribute.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AttributeGroup } from '../attribute_group/models/attribute_group.model';

@Module({
  imports:[SequelizeModule.forFeature([
    Attribute,
    AttributeGroup
  ])],
  controllers: [AttributesController],
  providers: [AttributesService],
  exports:[AttributesService]
})
export class AttributesModule {}
