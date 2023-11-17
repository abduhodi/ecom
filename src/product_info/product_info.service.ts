import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductInfoDto } from './dto/create-product_info.dto';
import { UpdateProductInfoDto } from './dto/update-product_info.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductInfo } from './models/product_info.model';
import sequelize from 'sequelize';
import { Product } from '../product/models/product.model';

@Injectable()
export class ProductInfoService {
  constructor(
    @InjectModel(ProductInfo) private productInfoRepo: typeof ProductInfo,
  ) {}

  async create(createProductInfoDto: CreateProductInfoDto) {
    const productInfo = await this.productInfoRepo.create(createProductInfoDto);
    if (!productInfo) {
      throw new BadRequestException('Error while creating productInfo');
    }
    return { message: 'Created successfully', productInfo };
  }

  async findByProductId(product_id: number) {
    const productInfos = await this.productInfoRepo.findAll({
      where: { product_id: product_id },
    });

    return productInfos;
  }

  // async findMostAttributedProduct(model_id: number) {
    
  //   const [result] = await this.productInfoRepo.findAll({
  //     attributes: [
  //       'product_id',
  //       [sequelize.fn('COUNT', sequelize.col('product_id')), 'attributeCount'],
  //     ],
  //     where: {
  //       '$product.model_id$': model_id,
  //     },
  //     include: [
  //       {
  //         model: Product,
  //         attributes: [],
  //       },
  //     ],
  //     group: ['product_id'],
  //     order: [[sequelize.literal('attributeCount'), 'DESC']],
  //     limit: 1,
  //   });

  //   if (!result) {
  //     return null;
  //   }

  //   const mostAttributedProductId = result.getDataValue('product_id');
  //   console.log('id', mostAttributedProductId);
  //   return mostAttributedProductId;
  // }

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
