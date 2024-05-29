import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductInfoService } from './product_info.service';
import { CreateProductInfoDto } from './dto/create-product_info.dto';
import { UpdateProductInfoDto } from './dto/update-product_info.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ROLE } from 'src/decorators/roles';
import { Roles } from 'src/common/types/roles';

@ApiTags('Product Info')
@ApiBearerAuth()
@Controller('product-info')
export class ProductInfoController {
  constructor(private readonly productInfoService: ProductInfoService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Add attribute to product' })
  @Post('add')
  create(@Body() createProductInfoDto: CreateProductInfoDto) {
    return this.productInfoService.create(createProductInfoDto);
  }

  @ApiOperation({ summary: 'Get all product info' })
  @Get('get-all')
  findAll() {
    return this.productInfoService.findAll();
  }

  @ApiOperation({ summary: 'Get product info by Id' })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.productInfoService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Update product info by Id' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductInfoDto: UpdateProductInfoDto,
  ) {
    return this.productInfoService.update(+id, updateProductInfoDto);
  }

  @ApiOperation({ summary: "Update product's all product info by product_id" })
  @Put('updatemany/:id')
  updateMany(
    @Param('id') id: string,
    @Body() updateProductInfoDto: UpdateProductInfoDto[],
  ) {
    return this.productInfoService.updateMany(+id, updateProductInfoDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Delete product info by Id' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productInfoService.remove(+id);
  }
}
