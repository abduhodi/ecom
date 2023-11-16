import { JwtService } from '@nestjs/jwt';
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
    private JwtService: JwtService 
  ) {}

  async create(createSavedDto: CreateSavedDto,accessToken:string) {
    try {
      const payload = this.JwtService.decode(accessToken)
      
      await this.productService.findById(createSavedDto.product_id);
      // @ts-ignore
      await this.userService.findOne(payload.id);
      // @ts-ignore
      const value = await this.savedRepo.findOne({where : {user_id:payload.id,product_id:createSavedDto.product_id}})
      if(value){
        throw new BadRequestException("you have already rated this product")
      }
      // @ts-ignore
      const saved = await this.savedRepo.create({...createSavedDto,user_id:payload.id});
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

  async update(id: number, updateSavedDto: UpdateSavedDto,accessToken:string) {
    const payload = this.JwtService.decode(accessToken)
    await this.productService.findById(updateSavedDto.product_id);
    //@ts-ignore
    await this.userService.findOne(payload.id);
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
