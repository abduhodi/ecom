import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductModelService } from './product_model.service';
import { CreateProductModelDto } from './dto/create-product_model.dto';
import { UpdateProductModelDto } from './dto/update-product_model.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryBrandIdDto } from './dto/category-brandi-id.dto';
import { GetAttrebuteDto } from './dto/attrebut-get.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ROLE } from 'src/decorators/roles';
import { Roles } from 'src/common/types/roles';

@ApiTags('ProductModel')
@ApiBearerAuth()
@Controller('product-model')
export class ProductModelController {
  constructor(private readonly productModelService: ProductModelService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Create a new model' })
  @Post('create')
  create(@Body() createProductModelDto: CreateProductModelDto) {
    return this.productModelService.create(createProductModelDto);
  }

  @ApiOperation({ summary: 'Get all models' })
  @Get('get-all/q?')
  findAll(@Query() q: any) {
    return this.productModelService.findAll(q?.limit, q?.page);
  }

  @ApiOperation({ summary: 'Get all attrebuts' })
  @Get('get-attrebutes')
  getAttrebutes(@Body() getAttrebuteDto: GetAttrebuteDto) {
    return this.productModelService.getAttrebutes(getAttrebuteDto);
  }

  @ApiOperation({ summary: 'Get models by category && brand' })
  @Post('get/by-category-brand')
  findByCategoryBrandId(@Body() categoryBrandIdDto: CategoryBrandIdDto) {
    return this.productModelService.findByCategoryBrandId(categoryBrandIdDto);
  }

  @ApiOperation({ summary: 'Get model by Id' })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.productModelService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Update model by Id' })
  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateProductModelDto: UpdateProductModelDto,
  ) {
    return this.productModelService.update(+id, updateProductModelDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Delete model by Id' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productModelService.remove(+id);
  }
}
