import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderAddressDto } from './dto/create-order_address.dto';
import { UpdateOrderAddressDto } from './dto/update-order_address.dto';
import { OrderAddress } from './models/order_address.model';

@Injectable()
export class OrderAddressService {
  constructor(
    @InjectModel(OrderAddress)
    private addressRepository: typeof OrderAddress,
  ) {}

  async create(createAddressDto: CreateOrderAddressDto): Promise<OrderAddress> {
    try {
      const address = await this.addressRepository.create(createAddressDto);
      return address;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<OrderAddress[]> {
    const addresses = await this.addressRepository.findAll();
    return addresses;
  }

  async findOne(id: number): Promise<OrderAddress> {
    const address = await this.addressRepository.findOne({
      where: { id },
    });
    return address;
  }

  async update(
    id: number,
    updateAddressDto: UpdateOrderAddressDto,
  ): Promise<[number, OrderAddress[]]> {
    const updatedAddresses = await this.addressRepository.update(
      updateAddressDto,
      { where: { id }, returning: true },
    );
    return updatedAddresses;
  }

  async remove(id: number): Promise<number> {
    const deletedAddresses = await this.addressRepository.destroy({
      where: { id },
    });
    return deletedAddresses;
  }
}
