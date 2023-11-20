import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AttributeGroupService } from './attribute_group.service';
import { CreateAttributeGroupDto } from './dto/create-attribute_group.dto';
import { UpdateAttributeGroupDto } from './dto/update-attribute_group.dto';

@Controller('attribute-group')
export class AttributeGroupController {
  constructor(private readonly attributeGroupService: AttributeGroupService) {}

  @Post('create')
  create(@Body() createAttributeGroupDto: CreateAttributeGroupDto) {
    return this.attributeGroupService.create(createAttributeGroupDto);
  }

  @Get('get-all')
  findAll() {
    return this.attributeGroupService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.attributeGroupService.findOne(+id);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateAttributeGroupDto: UpdateAttributeGroupDto,
  ) {
    return this.attributeGroupService.update(+id, updateAttributeGroupDto);
  }

  @Delete('delte/:id')
  remove(@Param('id') id: string) {
    return this.attributeGroupService.remove(+id);
  }
}
