import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './models/brand.model';
import { BrandByCategoryIdDto } from './dto/brand-by-category-id.dto';
import { BrandCategory } from '../brand_category/models/brand_category.model';
import { Op } from 'sequelize';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand) private brandRepo: typeof Brand,
    @InjectModel(BrandCategory) private brandCategoryRepo: typeof BrandCategory,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const brand = await this.brandRepo.create(createBrandDto);
    if (!brand) {
      throw new BadRequestException('Error while creating brand');
    }
    return { message: 'Created successfully', brand };
  }

  async findAll() {
    const brands = await this.brandRepo.findAll();
    return { brands };
  }

  async findByCategoryId(brandByCategoryIdDto: BrandByCategoryIdDto) {
    const { category_id } = brandByCategoryIdDto;

    const brandCategory = await this.brandCategoryRepo.findAll({
      where: { category_id: category_id },
    });

    const brandIds = brandCategory.map((oneId) => oneId.dataValues?.brand_id);

    const brands = await this.brandRepo.findAll({
      where: {
        id: {
          [Op.in]: brandIds,
        },
      },
    });

    return brands;
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findByPk(id);
    if (!brand) {
      throw new NotFoundException('Brand not found with such id');
    }
    return { brand };
  }

  async update(id: number, updatebrandDto: UpdateBrandDto) {
    const brand = await this.brandRepo.findByPk(id);
    if (!brand) {
      throw new NotFoundException('Brand not found with such id');
    }
    const updated = await this.brandRepo.update(
      { ...updatebrandDto },
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
      brand: updated[1][0].dataValues,
    };
  }

  async remove(id: number) {
    const brand = await this.brandRepo.findByPk(id);
    if (!brand) {
      throw new NotFoundException('Brand not found with such id');
    }
    await brand.destroy();
    return { message: 'Deleted successfully' };
  }
}
