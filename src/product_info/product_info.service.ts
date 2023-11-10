import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductInfoDto } from './dto/create-product_info.dto';
import { UpdateProductInfoDto } from './dto/update-product_info.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductInfo } from './models/product_info.model';

@Injectable()
export class ProductInfoService {
  constructor(@InjectModel(ProductInfo) private productInfoRepo: typeof ProductInfo) {}

  async create(createProductInfoDto: CreateProductInfoDto) {
    const productInfo = await this.productInfoRepo.create(createProductInfoDto);
    if (!productInfo) {
      throw new BadRequestException('Error while creating productInfo');
    }
    return { message: 'Created successfully', productInfo };
  }

  async findAll() {
    const productInfo = await this.productInfoRepo.findAll();
    return { productInfo };
  }

  async findOne(id: number) {
    const productInfo = await this.productInfoRepo.findByPk(id);
    if (!productInfo) {
      throw new NotFoundException('ProductInfo not found with such id');
    }
    return { productInfo };
  }

  async update(id: number, updateProductInfoDto: UpdateProductInfoDto) {
    const productInfo = await this.productInfoRepo.findByPk(id);
    if (!productInfo) {
      throw new NotFoundException('ProductInfo not found with such id');
    }
    const updated = await this.productInfoRepo.update(
      { ...updateProductInfoDto },
      {
        where: { id },
        returning: true,
      },
    );
    if (!updated[0]) {
      throw new BadRequestException('Error, please check before you update');
    }
    return {
      message: 'Updated successfully',
      productInfo: updated[1][0].dataValues,
    };
  }

  async remove(id: number) {
    const productInfo = await this.productInfoRepo.findByPk(id);
    if (!productInfo) {
      throw new NotFoundException('ProductInfo not found with such id');
    }
    await productInfo.destroy();
    return { message: 'Deleted successfully' };
  }
}
