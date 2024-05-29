import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetByCategory } from '../product/dto/get-by-category.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ROLE } from 'src/decorators/roles';
import { Roles } from 'src/common/types/roles';

@ApiTags('Brand')
@ApiBearerAuth()
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Create a new brand' })
  @Post('create')
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @ApiOperation({ summary: 'Get all brands' })
  @Get('get-all/q?')
  findAll(@Query() q: any) {
    return this.brandService.findAll(q?.limit, q?.page);
  }
  @ApiOperation({ summary: 'Get brands by category' })
  @Post('get/by-category')
  brandsByCategoryId(@Body('category_id') category_id: number) {
    return this.brandService.findByCategoryId({ category_id });
  }

  @ApiOperation({ summary: 'Get one brand by id' })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Update one brand by id' })
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.update(id, updateBrandDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Delete one brand by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
