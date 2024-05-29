import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { GetByCategory } from '../product/dto/get-by-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ROLE } from 'src/decorators/roles';
import { Roles } from 'src/common/types/roles';


@ApiTags("Attributes")
@ApiBearerAuth()
@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @Post('create')
  create(@Body() createAttributeDto: CreateAttributeDto) {
    return this.attributesService.create(createAttributeDto);
  }

  @Get('get-all')
  findAll() {
    return this.attributesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributesService.findOne(+id);
  }

  @Get('get-by-category/:id')
  findByCategoryId(@Param('id') id: string) {
    return this.attributesService.findByCategoryId(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('by-category')
  findAttributesByCategory(@Body() getByCategory: GetByCategory) {
    return this.attributesService.findAttributeByCategoryId(
      getByCategory.category_id,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    return this.attributesService.update(+id, updateAttributeDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributesService.remove(+id);
  }
}
