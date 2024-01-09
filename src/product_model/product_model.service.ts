import { ModelAttributeService } from './../model_attribute/model_attribute.service';
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
import { CreateModelAttributeDto } from '../model_attribute/dto/create-model_attribute.dto';

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
    private readonly modelAttributeService: ModelAttributeService,
  ) {}

  async create(createProductModelDto: CreateProductModelDto) {
    try {
      const { model_name, category_brand_id, info } = createProductModelDto;

      const existingBrandCategory = await this.brandCategoryRepo.findOne({
        where: { id: category_brand_id },
      });

      if (!existingBrandCategory) {
        throw new NotFoundException('Category brand ID is not found');
      }
      const existingModel = await this.productModelRepo.findOne({
        where: {
          model_name: model_name,
        },
      });

      if (existingModel) {
        throw new BadRequestException('Model already exists');
      }

      const model = await this.productModelRepo.create({
        model_name,
        category_brand_id,
      });

      for (const model_info of info) {
        const existingAttr = await this.attributeRepo.findOne({
          where: { id: model_info?.attribute_id },
        });

        if (existingAttr) {
          const infoDto: CreateModelAttributeDto = {
            model_id: model.id,
            attribute_id: model_info.attribute_id,
            attribute_value: model_info.attribute_value,
            is_changable: existingAttr.is_changable,
          };
          await this.modelAttributeService.create(infoDto);
        }
      }

      return { message: 'Created successfully', model };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(limit: number, page: number) {
    limit = limit > 0 ? limit : null;
    page = page > 0 ? page : 1;
    const models = await this.productModelRepo.findAll({
      include: { all: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit,
      offset: (page - 1) * limit,
    });
    const count = await this.productModelRepo.count();
    return { count, models };
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
  // async getAttrebutes(getAttrebuteDto: GetAttrebuteDto) {
  //   const { model_id, category_id } = getAttrebuteDto;
  //   const product = await this.productRepo.findOne({
  //     where: { model_id: model_id },
  //     include: { all: true },
  //   });
  //   let attrebutes: any;
  //   if (product) {
  //     const attrGroup = await this.attrebuteGroupRepo.findOne({
  //       where: {
  //         category_id: category_id,
  //       },
  //     });

  //     console.log(`Attrebute group: ${attrGroup}`);

  //     if (!attrGroup) {
  //       throw new NotFoundException('Attrebute group is not found');
  //     }

  //     const attrebutes = await this.attributeRepo.findAll({
  //       where: { attribute_group_id: attrGroup.id },
  //     });

  //     return attrebutes;
  //   }
  // }
  // * < Request before creating full product /> * //

  // * < Get all attributes > * //
  async getAttrebutes(getAttrebuteDto: GetAttrebuteDto) {
    const { category_id } = getAttrebuteDto;

    const attrGroup = await this.attrebuteGroupRepo.findOne({
      where: {
        category_id: category_id,
      },
    });

    if (!attrGroup) {
      throw new NotFoundException(
        'There is no attributes yet for current category',
      );
    }

    const attrebutes = await this.attributeRepo.findAll({
      where: { attribute_group_id: attrGroup.id },
      attributes: { exclude: ['createdAt', 'updatedAt', 'attribute_group_id'] },
    });

    return attrebutes;
  }
  // * < Get all attributes /> * //
}
