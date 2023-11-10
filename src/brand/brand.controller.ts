import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({ summary: 'Create a new brand' })
  @Post('create')
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @ApiOperation({ summary: 'Get all brands' })
  @Get('get-all')
  findAll() {
    return this.brandService.findAll();
  }

  @ApiOperation({ summary: 'Get one brand by id' })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one brand by id' })
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @ApiOperation({ summary: 'Delete one brand by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
