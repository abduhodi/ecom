import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateProductMediaDto } from './dto/create-product_media.dto';
import { UpdateProductMediaDto } from './dto/update-product_media.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductMedia } from './models/product_media.model';
import { ProductService } from 'src/product/product.service';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ProductMediaService {
  constructor(
    @InjectModel(ProductMedia) private productMediaRepo: typeof ProductMedia,
    private productService: ProductService,
    private fileService: FilesService,
  ) {}

  async create(createProductMediaDto: CreateProductMediaDto, image: any) {
    console.log('object');
    const product = await this.productService.findOne(
      createProductMediaDto.product_id,
    );
    if (!product) {
      throw new NotFoundException('Product not found with such id');
    }
    const fileName = await this.fileService.createFile(image);
    const media = await this.productMediaRepo.create({
      ...createProductMediaDto,
      url: fileName,
    });
    if (!media) {
      throw new BadRequestException('Error while creating');
    }
    return { message: 'Created successfulyy', product_media: media };
  }

  async remove(id: number) {
    const media = await this.productMediaRepo.findByPk(id);
    if (!media) {
      throw new NotFoundException('Not found with such id');
    }
    await media.destroy();
    return { message: 'Deleted successfully' };
  }
}
