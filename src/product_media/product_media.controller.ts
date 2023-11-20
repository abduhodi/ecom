import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductMediaService } from './product_media.service';
import { CreateProductMediaDto } from './dto/create-product_media.dto';
import { ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product-media')
export class ProductMediaController {
  constructor(private readonly productMediaService: ProductMediaService) {}

  @ApiOperation({ summary: 'Add media to product' })
  @Post('add-media')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createProductMediaDto: CreateProductMediaDto,
    @UploadedFile()
    image: any,
  ) {
    return this.productMediaService.create(createProductMediaDto, image);
  }

  @ApiOperation({ summary: 'Delete media by ID' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productMediaService.remove(+id);
  }
}
