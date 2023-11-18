import { FilesService } from './../files/files.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdsDto } from './dto/create-ads.dto';
import { UpdateAdsDto } from './dto/update-ads.dto';
import { ProductModelService } from '../product_model/product_model.service';
import { InjectModel } from '@nestjs/sequelize';
import { Ads } from './models/ads.model';

@Injectable()
export class AdsService {
  constructor(
    @InjectModel(Ads) private adsModel: typeof Ads,
    private readonly modelService: ProductModelService,
    private readonly fileService: FilesService,
  ) {}

  async create(createAdsDto: CreateAdsDto, image: any) {
    await this.modelService.findOne(Number(createAdsDto.model_id));

    const fileName = await this.fileService.createFile(image);

    const advertisment = await this.adsModel.create({
      ...createAdsDto,
      image: fileName,
    });

    if (!advertisment) {
      throw new BadRequestException('Error while creating');
    }

    return { message: 'Created successfully', ADS: advertisment };
  }

  async findAll() {
    return this.adsModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const ads = await this.adsModel.findOne({
      where: { id: id },
      include: { all: true },
    });

    if (!ads) {
      throw new NotFoundException('Advertisement with such id is not found');
    }

    return ads;
  }

  async update(id: number, updateAdsDto: UpdateAdsDto) {
    const existingAds = await this.adsModel.findByPk(id);

    if (!existingAds) {
      throw new NotFoundException('Not found with such id');
    }

    await existingAds.update(updateAdsDto);

    return { message: 'Updated successfully', ADS: existingAds };
  }

  async remove(id: number) {
    const advertisment = await this.adsModel.findByPk(id);

    if (!advertisment) {
      throw new NotFoundException('Not found with such id');
    }

    await advertisment.destroy();
    return { message: 'Deleted successfully' };
  }
}
