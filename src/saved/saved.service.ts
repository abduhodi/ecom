import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSavedDto } from './dto/create-saved.dto';
import { UpdateSavedDto } from './dto/update-saved.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Saved } from './models/saved.model';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SavedService {
  constructor(
    @InjectModel(Saved) private savedRepo: typeof Saved,
    private productService: ProductService,
    private userService: UserService,
  ) {}

  async create(createSavedDto: CreateSavedDto) {
    try {
      await this.productService.findById(createSavedDto.product_id);
      await this.userService.findOne(createSavedDto.user_id);
      const saved = await this.savedRepo.create(createSavedDto);
      return { message: 'Created successfully', saved };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const saveds = await this.savedRepo.findAll({ include: { all: true } });
    return saveds;
  }

  async findOne(id: number) {
    const saved = await this.savedRepo.findByPk(id, {
      include: { all: true },
    });
    if (!saved) {
      throw new NotFoundException('Saved not found with such id');
    }
    return saved;
  }

  async update(id: number, updateSavedDto: UpdateSavedDto) {
    await this.productService.findById(updateSavedDto.product_id);
    await this.userService.findOne(updateSavedDto.user_id);
    const updated = await this.savedRepo.update(updateSavedDto, {
      where: { id },
      returning: true,
    });
    if (!updated[0]) {
      throw new BadRequestException('Error, please check before you update');
    }
    return {
      message: 'Updated successfully',
      product: updated[1][0].dataValues,
    };
  }

  async remove(id: number) {
    const saved = await this.findOne(id);
    await saved.destroy();
    return { message: 'Deleted successfull' };
  }
}
