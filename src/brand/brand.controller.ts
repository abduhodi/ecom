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
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetByCategory } from '../product/dto/get-by-category.dto';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({ summary: 'Create a new brand' })
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile()
    image: any,
  ) {
    return this.brandService.create(createBrandDto, image);
  }

  @ApiOperation({ summary: 'Get all brands' })
  @Get('get-all')
  findAll() {
    return this.brandService.findAll();
  }
  @ApiOperation({ summary: 'Get brands by category' })
  @Get('get/by-category')
  brandsByCategoryId(@Body() getByCategory: GetByCategory) {
    return this.brandService.findByCategoryId(getByCategory)
  }

  @ApiOperation({ summary: 'Get one brand by id' })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one brand by id' })
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id')
    id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @UploadedFile()
    image: any,
  ) {
    return this.brandService.update(+id, updateBrandDto, image);
  }

  @ApiOperation({ summary: 'Delete one brand by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
