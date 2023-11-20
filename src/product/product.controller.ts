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

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Create a new product' })
  @Post('create-full')
  createFull(@Body() createFullProductDto: CreateFullProductDto) {
    return this.productService.createFull(createFullProductDto);
  }

  @ApiOperation({ summary: 'Get all products' })
  @Get('get-all')
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Get all products BY CATEGORY ID' })
  @Get('get-by-category')
  findProductByCategory(@Body('category_id') categoryId: number) {
    return this.productService.findProductByCategory(categoryId);
  }

  @ApiOperation({ summary: 'Get all products BY Model ID' })
  @Get('get-by-model')
  findProductByModel(@Body('model_id') modelId: number) {
    return this.productService.findProductByModel(modelId);
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
  @Get('get/attributes/by-model')
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
  @Get('filter')
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
}
