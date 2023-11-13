import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { ProductViewService } from 'src/product_view/product_view.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepo: typeof Product,
    private productViewService: ProductViewService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepo.create(createProductDto);
    if (!product) {
      throw new BadRequestException('Error while creating product');
    }
    return { message: 'Created successfully', product };
  }

  async findAll() {
    const products = await this.productRepo.findAll({ include: { all: true } });
    return products;
  }

  async findPopular() {
    const popular = await this.productViewService.findMostPopular();
    const products = await Promise.all(
      popular.map(async (item) => {
        const product = await this.productRepo.findByPk(
          item.dataValues.product_id,
        );
        return product;
      }),
    );
    return products;
  }

  async findById(id: number) {
    const product = await this.productRepo.findByPk(id, {
      include: { all: true },
    });
    if (!product) {
      throw new NotFoundException('Product not found with such id');
    }

    return { product };
  }

  async findOne(id: number, accessToken: string) {
    const product = await this.productRepo.findByPk(id, {
      include: { all: true },
    });
    if (!product) {
      throw new NotFoundException('Product not found with such id');
    }
    const view = await this.productViewService.create(
      { product_id: id },
      accessToken,
    );
    return { product };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findByPk(id);
    if (!product) {
      throw new NotFoundException('Product not found with such id');
    }
    const updated = await this.productRepo.update(updateProductDto, {
      where: { id },
      returning: true,
    });
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
