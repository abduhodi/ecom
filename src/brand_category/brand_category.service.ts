import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandCategoryDto } from './dto/create-brand_category.dto';
import { UpdateBrandCategoryDto } from './dto/update-brand_category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BrandCategory } from './models/brand_category.model';

@Injectable()
export class BrandCategoryService {
  constructor(
    @InjectModel(BrandCategory) private brandCategoryRepo: typeof BrandCategory,
  ) {}

  async create(createBrandCategoryDto: CreateBrandCategoryDto) {
    const brandCategory = await this.brandCategoryRepo.create(
      createBrandCategoryDto,
    );
    if (!brandCategory) {
      throw new BadRequestException('Error while creating brandCategory');
    }
    return { message: 'Created successfully', brandCategory };
  }

  async findAll() {
    const brandCategorys = await this.brandCategoryRepo.findAll();
    return { brandCategorys };
  }

  async findOne(id: number) {
    const brandCategory = await this.brandCategoryRepo.findByPk(id);
    if (!brandCategory) {
      throw new NotFoundException('BrandCategory not found with such id');
    }
    return { brandCategory };
  }

  async update(id: number, updateBrandCategoryDto: UpdateBrandCategoryDto) {
    const brandCategory = await this.brandCategoryRepo.findByPk(id);
    if (!brandCategory) {
      throw new NotFoundException('BrandCategory not found with such id');
    }
    const updated = await this.brandCategoryRepo.update(
      { ...updateBrandCategoryDto },
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
      brandCategory: updated[1][0].dataValues,
    };
  }

  async remove(id: number) {
    const brandCategory = await this.brandCategoryRepo.findByPk(id);
    if (!brandCategory) {
      throw new NotFoundException('BrandCategory not found with such id');
    }
    await brandCategory.destroy();
    return { message: 'Deleted successfully' };
  }
}
