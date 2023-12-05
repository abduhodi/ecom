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
import { BrandCategoryService } from './brand_category.service';
import { CreateBrandCategoryDto } from './dto/create-brand_category.dto';
import { UpdateBrandCategoryDto } from './dto/update-brand_category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('BrandCategory')
@Controller('brand-category')
export class BrandCategoryController {
  constructor(private readonly brandCategoryService: BrandCategoryService) {}

  @ApiOperation({ summary: 'Create a new brandcategory' })
  @Post('create')
  create(@Body() createBrandCategoryDto: CreateBrandCategoryDto) {
    return this.brandCategoryService.create(createBrandCategoryDto);
  }

  @ApiOperation({ summary: 'Get all brandCategorys' })
  @Get('get-all')
  findAll() {
    return this.brandCategoryService.findAll();
  }

  @ApiOperation({ summary: 'Get one brandCategory by id' })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.brandCategoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Get by category_id and brand_id' })
  @Post('get/by-id')
  findBy(@Body() findDto: CreateBrandCategoryDto) {
    return this.brandCategoryService.findByCategoryBrand(findDto);
  }

  @ApiOperation({ summary: 'Get Categories by Brand Id' })
  @Get('get-by-brand/:id')
  findCategoryByBrand(@Param('id') id: string) {
    return this.brandCategoryService.findCategoryByBrand(+id);
  }

  @ApiOperation({ summary: 'Update one brandCategory by id' })
  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateBrandCategoryDto: UpdateBrandCategoryDto,
  ) {
    return this.brandCategoryService.update(+id, updateBrandCategoryDto);
  }

  @ApiOperation({ summary: 'Delete one brandCategory by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.brandCategoryService.remove(+id);
  }
}
