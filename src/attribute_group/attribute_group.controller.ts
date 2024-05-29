import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AttributeGroupService } from './attribute_group.service';
import { CreateAttributeGroupDto } from './dto/create-attribute_group.dto';
import { UpdateAttributeGroupDto } from './dto/update-attribute_group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ROLE } from 'src/decorators/roles';
import { Roles } from 'src/common/types/roles';


@ApiTags("Attribute group")
@ApiBearerAuth()
@Controller('attribute-group')
export class AttributeGroupController {
  constructor(private readonly attributeGroupService: AttributeGroupService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
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

  @Get('get-by-category/:id')
  findByCategoryId(@Param('id') id: string) {
    return this.attributeGroupService.findByCategoryId(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateAttributeGroupDto: UpdateAttributeGroupDto,
  ) {
    return this.attributeGroupService.update(+id, updateAttributeGroupDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @Delete('delte/:id')
  remove(@Param('id') id: string) {
    return this.attributeGroupService.remove(+id);
  }
}
