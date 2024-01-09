import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @Get('get-all-category/q?')
  findAllCategory(@Query() q: any) {
    return this.categoryService.findAllCategory(q?.limit, q?.page);
  }

  @ApiOperation({ summary: 'Get all subcategories' })
  @Get('get-all-subcategory/:id/q?')
  findAllSubcategory(@Param('id', ParseIntPipe) id: number, @Query() q: any) {
    return this.categoryService.findAllSubcategory(id, q?.limit, q?.page);
  }

  @ApiOperation({ summary: 'Get one category by id' })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one category by id' })
  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete one category by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
