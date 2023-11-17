import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductInfoDto } from './dto/create-product_info.dto';
import { UpdateProductInfoDto } from './dto/update-product_info.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductInfo } from './models/product_info.model';
import { ProductService } from 'src/product/product.service';
import { AttributesService } from 'src/attributes/attributes.service';

@Injectable()
export class ProductInfoService {
  constructor(
    @InjectModel(ProductInfo) private productInfoRepo: typeof ProductInfo,
    private productService: ProductService,
    private attributeService: AttributesService,
  ) {}

  async create(createProductInfoDto: CreateProductInfoDto) {
    const attribute = await this.attributeService.findOne(
      createProductInfoDto.attribute_id,
    );
    if (attribute.attribute.is_changable) {
      const product = await this.productService.findById(
        createProductInfoDto.product_id,
      );
      product.name += ` ${createProductInfoDto.attribute_value}`;
      await product.save();
    }

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

  async updateMany(
    product_id: number,
    updateProductInfoDto: UpdateProductInfoDto[],
  ) {
    const product = await this.productService.findById(product_id);
    const name = product.name.split(' ');
    await Promise.all([
      updateProductInfoDto.forEach(
        async ({ id, attribute_id, attribute_value, show_in_main }) => {
          try {
            // console.log({ attribute_id, attribute_value, show_in_main });

            const info = await this.productInfoRepo.update(
              { attribute_id, attribute_value, show_in_main },
              { where: { id }, returning: true },
            );
            // console.log(info[1][0].dataValues);
          } catch (err) {
            throw new BadRequestException(err.message);
          }
        },
      ),
    ]);
    const updated_product = await this.productService.findById(product_id);
    updated_product.productInfo.forEach((attr) => {
      product.productInfo.forEach((old_attr) => {
        if (
          attr.attribute_id == old_attr.attribute_id &&
          attr.attribute_value != old_attr.attribute_value
        ) {
          if (name.includes(old_attr.attribute_value)) {
            name[name.indexOf(old_attr.attribute_value)] = attr.attribute_value;
          }
        }
      });
    });
    updated_product.name = name.join(' ');
    await updated_product.save();
    return { message: 'Updated successfully' };
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
