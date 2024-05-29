import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ProductMediaService } from './product_media.service';
import { CreateProductMediaDto } from './dto/create-product_media.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ROLE } from 'src/decorators/roles';
import { Roles } from 'src/common/types/roles';

@ApiTags("Product-media")
@ApiBearerAuth()
@Controller('product-media')
export class ProductMediaController {
  constructor(private readonly productMediaService: ProductMediaService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
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

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Delete media by ID' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productMediaService.remove(+id);
  }
}
