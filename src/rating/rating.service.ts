import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Rating } from './models/rating.model';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating) private ratingRepo: typeof Rating,
    private productService: ProductService,
    private userService: UserService,
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    try {
      await this.productService.findById(createRatingDto.product_id);
      await this.userService.findOne(createRatingDto.user_id);
      const rating = await this.ratingRepo.create(createRatingDto);
      return { message: 'Created successfully', rating };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const ratings = await this.ratingRepo.findAll({ include: { all: true } });
    return ratings;
  }

  async findOne(id: number) {
    const rating = await this.ratingRepo.findByPk(id, {
      include: { all: true },
    });
    if (!rating) {
      throw new NotFoundException('Rating not found with such id');
    }
    return rating;
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    await this.findOne(id);
    const updated = await this.ratingRepo.update(updateRatingDto, {
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
    const rating = await this.findOne(id);
    await rating.destroy();
    return { message: 'Deleted successfull' };
  }
}
