import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { StockService } from '../stock/stock.service';
import { CreateStockDto } from '../stock/dto/create-stock.dto';
import { ProductViewService } from 'src/product_view/product_view.service';
import { SaleService } from '../sale/sale.service';
import { Op } from 'sequelize';
import { FilterProductDto } from './dto/filter-product.dto';
import { ProductInfo } from 'src/product_info/models/product_info.model';
import { Request, Response } from 'express';
import { getID } from 'src/common/helpers/getId';
import { JwtService } from '@nestjs/jwt';
import { CategoryService } from 'src/category/category.service';
import { ProductModelService } from 'src/product_model/product_model.service';
import { BrandService } from 'src/brand/brand.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepo: typeof Product,
    private readonly saleService: SaleService,
    private readonly stockService: StockService,
    private productViewService: ProductViewService,
    private jwtService: JwtService,
    private categoryService: CategoryService,
    private productModelService: ProductModelService,
    private brandService: BrandService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.findOne(
      createProductDto.category_id,
    );
    if (!category.parent_category_id) {
      throw new BadRequestException('Main category can not be in product');
    }
    const model = await this.productModelService.findOne(
      createProductDto.model_id,
    );
    const brand = await this.brandService.findOne(createProductDto.brand_id);

    const name = `${category.category_name} ${brand.brand.brand_name} ${model.model_name}`;

    const product = await this.productRepo.create({
      ...createProductDto,
      name,
    });
    if (!product) {
      throw new BadRequestException('Error while creating product');
    }

    const stockDto: CreateStockDto = {
      product_id: product.id,
      quantity: createProductDto.quantity,
    };

    try {
      await this.stockService.create(stockDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while adding to stock',
      );
    }

    return { message: 'Created successfully', product };
  }

  async findAll() {
    try {
      await this.saleService.checkAndSetSale();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'An error occurred while setting the sale',
      );
    }

    const products = await this.productRepo.findAll({ include: { all: true } });
    return products;
  }

  async findPopular() {
    try {
      await this.saleService.checkAndSetSale();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'An error occurred while setting the sale',
      );
    }
    const popular = await this.productViewService.findMostPopular();
    const products = await Promise.all(
      popular.map(async (item) => {
        const product = await this.productRepo.findByPk(
          item.dataValues.product_id,
        );
        return product;
      }),
    );
    return products;
  }

  async findLastViewed(accessToken: string, req: Request, res: Response) {
    try {
      await this.saleService.checkAndSetSale();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'An error occurred while setting the sale',
      );
    }
    let user_id: string;
    if (!accessToken) {
      user_id = await getID(req, res);
    } else {
      const payload = this.jwtService.decode(accessToken);
      // @ts-ignore
      user_id = payload.id;
    }
    const last_viewed = await this.productViewService.findLastViewed(
      user_id.toString(),
    );
    const products = await Promise.all(
      last_viewed.map(async (item) => {
        const product = await this.productRepo.findByPk(
          item.dataValues.product_id,
        );
        return product;
      }),
    );
    return products;
  }

  async findById(id: number) {
    try {
      await this.saleService.checkAndSetSale();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'An error occurred while setting the sale',
      );
    }
    const product = await this.productRepo.findByPk(id, {
      include: { all: true },
    });
    if (!product) {
      throw new NotFoundException('Product not found with such id');
    }

    return product;
  }

  async findOne(id: number, accessToken: string, req: Request, res: Response) {
    try {
      await this.saleService.checkAndSetSale();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'An error occurred while setting the sale',
      );
    }
    const product = await this.productRepo.findByPk(id, {
      include: { all: true },
    });
    if (!product) {
      throw new NotFoundException('Product not found with such id');
    }

    let user_id: string;
    if (!accessToken) {
      user_id = await getID(req, res);
    } else {
      const payload = this.jwtService.decode(accessToken);
      // @ts-ignore
      user_id = payload.id;
    }

    const view = await this.productViewService.create(
      { product_id: id },
      user_id.toString(),
    );
    return product;
  }

  async filter(filterProductDto: FilterProductDto) {
    try {
      let filter: any = {};
      if (filterProductDto.brand_id) {
        filter.brand_id = filterProductDto.brand_id;
      }
      if (Object.entries(filterProductDto.price).length > 0) {
        filter.price = {
          [Op.gte]: filterProductDto.price.from,
          [Op.lt]: filterProductDto.price.to,
        };
      }
      let products: Product[];
      if (filterProductDto.attributes.length > 0) {
        const attributesConditions = filterProductDto.attributes.map(
          (attribute) => ({
            attribute_id: { [Op.eq]: attribute.attribute_id },
            attribute_value: { [Op.eq]: attribute.attribute_value },
          }),
        );
        products = await this.productRepo.findAll({
          where: filter,
          include: [
            {
              model: ProductInfo,
              where: {
                [Op.or]: attributesConditions,
              },
            },
          ],
        });
      } else {
        products = await this.productRepo.findAll({ where: filter });
      }
      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      await this.saleService.checkAndSetSale();
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while setting the sale',
      );
    }
    const product = await this.productRepo.findByPk(id);
    if (!product) {
      throw new NotFoundException('Product not found with such id');
    }

    if (updateProductDto.quantity) {
      await this.stockService.update;
    }

    const updated = await this.productRepo.update(updateProductDto, {
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
    const product = await this.productRepo.findByPk(id);
    if (!product) {
      throw new NotFoundException('Product not found with such id');
    }
    await this.stockService.deleteProdFromStock(product.id);
    await product.destroy();
    return { message: 'Deleted successfully' };
  }
}
