import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productRepo: typeof Product) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepo.create(createProductDto);
    if (!product) {
      throw new BadRequestException('Error while creating product');
    }
    return { message: 'Created successfully', product };
  }

  async findAll() {
    const products = await this.productRepo.findAll();
    return { products };
  }

  async findOne(id: number) {
    const product = await this.productRepo.findByPk(id);
    if (!product) {
      throw new NotFoundException('Product not found with such id');
    }
    return { product };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findByPk(id);
    if (!product) {
      throw new NotFoundException('Product not found with such id');
    }
    const updated = await this.productRepo.update(
      { ...updateProductDto },
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
      product: updated[1][0].dataValues,
    };
  }

  async remove(id: number) {
    const product = await this.productRepo.findByPk(id);
    if (!product) {
      throw new NotFoundException('Product not found with such id');
    }
    await product.destroy();
    return { message: 'Deleted successfully' };
  }
}
