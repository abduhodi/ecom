import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductModelDto } from './dto/create-product_model.dto';
import { UpdateProductModelDto } from './dto/update-product_model.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from './model/product_model.model';

@Injectable()
export class ProductModelService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModelRepo: typeof ProductModel,
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
    return { model };
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
}
