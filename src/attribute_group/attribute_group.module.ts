import { Module } from '@nestjs/common';
import { AttributeGroupService } from './attribute_group.service';
import { AttributeGroupController } from './attribute_group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AttributeGroup } from './models/attribute_group.model';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[SequelizeModule.forFeature([
    AttributeGroup
  ]), CategoryModule],
  controllers: [AttributeGroupController],
  providers: [AttributeGroupService],
  exports:[AttributeGroupService]
})
export class AttributeGroupModule {}
