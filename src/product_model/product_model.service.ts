import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductModelDto } from './dto/create-product_model.dto';
import { UpdateProductModelDto } from './dto/update-product_model.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from './model/product_model.model';
import { CategoryBrandIdDto } from './dto/category-brandi-id.dto';
import { BrandCategory } from '../brand_category/models/brand_category.model';
import { Op } from 'sequelize';
import { Product } from '../product/models/product.model';
import { Attribute } from '../attributes/models/attribute.model';
import { AttributeGroup } from '../attribute_group/models/attribute_group.model';
import { GetAttrebuteDto } from './dto/attrebut-get.dto';

@Injectable()
export class ProductModelService {
  constructor(
    @InjectModel(Product) private readonly productRepo: typeof Product,

    @InjectModel(Attribute) private readonly attributeRepo: typeof Attribute,

    @InjectModel(AttributeGroup)
    private readonly attrebuteGroupRepo: typeof AttributeGroup,

    @InjectModel(ProductModel)
    private readonly productModelRepo: typeof ProductModel,

    @InjectModel(BrandCategory)
    private readonly brandCategoryRepo: typeof BrandCategory,
  ) {}

  async create(createProductModelDto: CreateProductModelDto) {
    try {
      const model = await this.productModelRepo.create(createProductModelDto);
      return { message: 'Created successfully', model };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const models = await this.productModelRepo.findAll({
      include: { all: true },
    });
    return models;
  }

  async findOne(id: number) {
    const model = await this.productModelRepo.findByPk(id, {
      include: { all: true },
    });
    if (!model) {
      throw new NotFoundException('Model not found with such id');
    }
    return model;
  }

  async findByCategoryBrandId(categoryBrandIdDto: CategoryBrandIdDto) {
    const { category_id, brand_id } = categoryBrandIdDto;
    const brand_categories = await this.brandCategoryRepo.findAll({
      where: {
        category_id: category_id,
        brand_id: brand_id,
      },
    });
    const modelIds = brand_categories.map((one) => {
      return one.dataValues.id;
    });

    const models = await this.productModelRepo.findAll({
      where: {
        category_brand_id: {
          [Op.in]: modelIds,
        },
      },
    });

    return models;
  }

  async update(id: number, updateProductModelDto: UpdateProductModelDto) {
    const model = await this.productModelRepo.findByPk(id);
    if (!model) {
      throw new NotFoundException('Model not found with such id');
    }
    const updated = await this.productModelRepo.update(updateProductModelDto, {
      where: { id },
      returning: true,
    });
    if (!updated[0]) {
      throw new BadRequestException('Error, please check before you update');
    }
    return {
      message: 'Updated successfully',
      model: updated[1][0].dataValues,
    };
  }

  async remove(id: number) {
    const model = await this.productModelRepo.findByPk(id);
    if (!model) {
      throw new NotFoundException('Model not found with such id');
    }
    await model.destroy();
    return { message: 'Deleted successfully' };
  }

  // * < Request before creating full product > * //
  async getAttrebutes(getAttrebuteDto: GetAttrebuteDto) {
    const { model_id, category_id } = getAttrebuteDto;
    const product = await this.productRepo.findOne({
      where: { model_id: model_id },
      include: { all: true },
    });
    let attrebutes: any;
    if (product) {
      const attrGroup = await this.attrebuteGroupRepo.findOne({
        where: {
          category_id: category_id,
        },
      });

      console.log(`Attrebute group: ${attrGroup}`);

      if (!attrGroup) {
        throw new NotFoundException('Attrebute group is not found');
      }

      const attrebutes = await this.attributeRepo.findAll({
        where: { attribute_group_id: attrGroup.id },
      });

      console.log(` Attrebutes: ${attrebutes}`);

      console.log(attrebutes);
      return attrebutes;
    }
  }
  // * < Request before creating full product /> * //
}
