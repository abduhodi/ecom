import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  PreconditionFailedException,
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
import { AttributesService } from '../attributes/attributes.service';
import { CategoryModelBrandDto } from './dto/category-model-brand-id.dto';
import { CreateFullProductDto } from './dto/create-full-product.dto';
import { profile } from 'console';
import { ProductInfoService } from '../product_info/product_info.service';
import { CreateProductInfoDto } from '../product_info/dto/create-product_info.dto';
import { checkPrime } from 'crypto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepo: typeof Product,
    private readonly saleService: SaleService,
    private readonly stockService: StockService,
    private readonly productInfoService: ProductInfoService,
    private productViewService: ProductViewService,
    private readonly attributeService: AttributesService,
    private jwtService: JwtService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepo.create(createProductDto);
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

  async createFull(createFullPrductDto: CreateFullProductDto) {
    const { product_info, category_id, brand_id, price, model_id, quantity } =
      createFullPrductDto;

    const createDto: CreateProductDto = {
      name: '',
      category_id: category_id,
      model_id: model_id,
      brand_id: brand_id,
      price: price,
      quantity: quantity,
    };

    const checkedProducts: Product[] | null = await this.productRepo.findAll({
      where: { model_id: model_id },
      include: {
        model: ProductInfo,
      },
    });

    const { product } = await this.create(createDto);

    if (checkedProducts.length > 0) {
      let maxProdInfos = 0;
      let thatProduct: any = checkedProducts.at(0);

      for (const oneProd of checkedProducts) {
        if (oneProd?.dataValues?.productInfo?.length > maxProdInfos) {
          thatProduct = JSON.parse(JSON.stringify(oneProd.get()));
          maxProdInfos = oneProd?.dataValues?.productInfo?.length;
        }
      }

      let maxRepeatedId: number = Number(thatProduct?.id);

      const productInfoArray = await this.productInfoService.findByProductId(
        maxRepeatedId,
      );

      for (const info of productInfoArray) {
        const isChangable = await this.attributeService.checkChangable(
          info?.dataValues?.attribute_id,
        );

        if (!isChangable) {
          const newInfo: CreateProductInfoDto = {
            product_id: product.dataValues.id,
            attribute_id: info.dataValues?.attribute_id,
            attribute_value: info.dataValues?.attribute_value,
            show_in_main: info.dataValues?.show_in_main,
          };
          console.log('= = = = = = = = = = = = = = = = = = = = = = =  ');
          console.log('Here is not changable info ', newInfo);
          console.log('= = = = = = = = = = = = = = = = = = = = = = =  ');

          await this.productInfoService.create(newInfo);
        }
      }
    }

    const entries = Object.entries(product_info);

    for (const [key, value] of entries) {
      console.log(`Key ${key}, Value ${value}`);

      const newInfo: CreateProductInfoDto = {
        product_id: product.dataValues.id,
        attribute_id: Number(key),
        attribute_value: value,
        show_in_main: false,
      };

      await this.productInfoService.create(newInfo);
    }

    return await this.productRepo.findOne({
      where: { id: product.id },
      include: { model: ProductInfo },
    });
  }

  async findProductByModelAdmin(categoryModelBrandDto: CategoryModelBrandDto) {
    const { category_id, model_id } = categoryModelBrandDto;
    const product = await this.productRepo.findOne({
      where: {
        model_id: model_id,
      },
    });
    if (product) {
      const attrebutes = await this.attributeService.findAttributeByCategoryId(
        category_id,
        true,
      );

      return attrebutes;
    } else {
      const attrebutes = await this.attributeService.findAttributeByCategoryId(
        category_id,
      );

      return attrebutes;
    }
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

  // * Find all products which are in the sale
  async findSaleProducts() {
    const saleModels = await this.saleService.findInSale();
    let saleProducts: Product[] = [];

    for (const model of saleModels) {
      const products = await this.productRepo.findAll({
        where: { model_id: model.dataValues.id },
      });

      saleProducts.push(...products);
    }

    return saleProducts;
  }

  async findProductByCategory(category_id: number) {
    if (!category_id || typeof category_id != 'number') {
      throw new BadRequestException('Invalid category id');
    }
    const products = await this.productRepo.findAll({
      where: {
        category_id: category_id,
      },
    });

    return products;
  }

  async findProductByModel(model_id: number) {
    if (!model_id || typeof model_id != 'number') {
      throw new BadRequestException('Invalid model id');
    }
    const products = await this.productRepo.findAll({
      where: {
        model_id: model_id,
      },
    });

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
