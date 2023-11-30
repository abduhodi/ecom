import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandCategoryDto } from './dto/create-brand_category.dto';
import { UpdateBrandCategoryDto } from './dto/update-brand_category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BrandCategory } from './models/brand_category.model';
import { Category } from 'src/category/models/category.model';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class BrandCategoryService {
  constructor(
    @InjectModel(BrandCategory) private brandCategoryRepo: typeof BrandCategory,
    private categoryService: CategoryService,
  ) {}

  async create(createBrandCategoryDto: CreateBrandCategoryDto) {
    const category = await this.categoryService.findOne(
      createBrandCategoryDto.category_id,
    );
    if (!category.parent_category_id) {
      throw new BadRequestException(
        'Main category can not be in brand_category',
      );
    }
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
    return brandCategorys;
  }

  async findOne(id: number) {
    const brandCategory = await this.brandCategoryRepo.findByPk(id);
    if (!brandCategory) {
      throw new NotFoundException('BrandCategory not found with such id');
    }
    return brandCategory;
  }

  async findCategoryByBrand(brand_id: number) {
    try {
      const brands = await this.brandCategoryRepo.findAll({
        where: { brand_id },
        include: { model: Category },
      });
      if (brands.length > 0) {
        return brands;
      }
      throw new NotFoundException('This brand has not categories');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateBrandCategoryDto: UpdateBrandCategoryDto) {
    const category = await this.categoryService.findOne(
      updateBrandCategoryDto.category_id,
    );
    if (!category.parent_category_id) {
      throw new BadRequestException(
        'Main category can not be in brand_category',
      );
    }
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
