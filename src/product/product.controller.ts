import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StorageGetter } from 'src/decorators/storageGetter-cookie.decorator.ts';
import { FilterProductDto } from './dto/filter-product.dto';
import { Request, Response } from 'express';
import { CategoryModelBrandDto } from './dto/category-model-brand-id.dto';
import { CreateFullProductDto } from './dto/create-full-product.dto';
import { GetByCategory } from './dto/get-by-category.dto';
import { GetByModel } from './dto/get-by-model.dto';
import { SearchInput } from './dto/search-input.dto';
import { GetByBrand } from './dto/get-by-brand.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @Post('create-full')
  createFull(@Body() createFullProductDto: CreateFullProductDto) {
    return this.productService.createFull(createFullProductDto);
  }

  @ApiOperation({ summary: 'Create a new product' })
  @Post('create')
  createFromModel(@Body() createFullProductDto: CreateFullProductDto) {
    return this.productService.createFromModel(createFullProductDto);
  }

  @ApiOperation({ summary: 'Get all products' })
  @Get('get-all')
  findAll() {
    return this.productService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post('search')
  productSearch(@Body() searchInput: SearchInput) {
    return this.productService.productSearch(searchInput.search_input);
  }

  @ApiOperation({ summary: 'Get all products BY CATEGORY ID' })
  @HttpCode(HttpStatus.OK)
  @Post('get-by-category')
  findProductByCategory(@Body() getByCategory: GetByCategory) {
    return this.productService.findProductByCategory(getByCategory.category_id);
  }

  @ApiOperation({ summary: 'Get all products BY CATEGORY ID' })
  @HttpCode(HttpStatus.OK)
  @Post('get-by-brand')
  findProductByBrand(@Body() getByBrand: GetByBrand) {
    return this.productService.findProductByBrand(getByBrand.brand_id);
  }

  @ApiOperation({ summary: 'Get all products BY Model ID' })
  @HttpCode(HttpStatus.OK)
  @Post('get-by-model')
  findProductByModel(@Body() getByModel: GetByModel) {
    return this.productService.findProductByModel(getByModel.model_id);
  }

  @ApiOperation({ summary: 'Get all products' })
  @Get('get-sale-products')
  findSaleProducts() {
    return this.productService.findSaleProducts();
  }

  @ApiOperation({ summary: 'Get most popular products' })
  @Get('get-popular')
  findMostPopular() {
    return this.productService.findPopular();
  }

  @ApiOperation({ summary: 'Get Attributes' })
  @HttpCode(HttpStatus.OK)
  @Post('get/attributes/by-model')
  findProductByModelAdmin(
    @Body() categoryModelBrandDto: CategoryModelBrandDto,
  ) {
    return this.productService.findProductByModelAdmin(categoryModelBrandDto);
  }

  @ApiOperation({ summary: 'Get last viewed products' })
  @Get('last-view')
  findLastViewed(
    @StorageGetter() accessToken: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.productService.findLastViewed(accessToken, req, res);
  }

  @ApiOperation({ summary: 'Filter products' })
  @Post('filter')
  filter(@Body() filterProductDto: FilterProductDto) {
    return this.productService.filter(filterProductDto);
  }

  @ApiOperation({ summary: 'Get one product by id' })
  @Get('get/:id')
  findOne(
    @Param('id') id: string,
    @StorageGetter() accessToken: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // console.log('USER_ID', Object.assign({}, req.cookies));
    return this.productService.findOne(+id, accessToken, req, res);
  }

  @ApiOperation({ summary: 'Update one product by id' })
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete one product by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @ApiOperation({ summary: 'find all products on storage' })
  @Post('find')
  findProducts(@Body() array: Array<number>) {
    console.log(array);
    return this.productService.findProductOnStorage(array);
  }
}
