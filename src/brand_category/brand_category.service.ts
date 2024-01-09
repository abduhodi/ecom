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

  async findAll(limit: number, page: number) {
    limit = limit > 0 ? limit : null;
    page = page > 0 ? page : 1;
    const brandCategorys = await this.brandCategoryRepo.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit,
      offset: (page - 1) * limit,
    });
    const count = await this.brandCategoryRepo.count();
    return { count, brandCategorys };
  }

  async findOne(id: number) {
    const brandCategory = await this.brandCategoryRepo.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (!brandCategory) {
      throw new NotFoundException('BrandCategory not found with such id');
    }
    return brandCategory;
  }

  async findByCategoryBrand(findDto: CreateBrandCategoryDto) {
    const brand_category = await this.brandCategoryRepo.findOne({
      where: { category_id: findDto.category_id, brand_id: findDto.brand_id },
    });

    if (!brand_category) {
      throw new BadRequestException(
        'Brand Category not found with such category_id and brand_id',
      );
    }
    return brand_category;
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
