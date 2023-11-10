import { PartialType } from '@nestjs/swagger';
import { CreateBrandCategoryDto } from './create-brand_category.dto';

export class UpdateBrandCategoryDto extends PartialType(CreateBrandCategoryDto) {}
