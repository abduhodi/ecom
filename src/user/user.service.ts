import { VerifyOtpDto } from './dto/verify-otp.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as otpGenerator from 'otp-generator';
import { v4 as uuidv4 } from 'uuid';
import { OtpService } from '../otp/otp.service';
import { dates, decode, encode } from '../common/helpers/crypto';
import { Otp } from '../otp/models/otp.model';
import { AddMinutesToDate } from '../common/helpers/addMinutes';
import { IOtpType } from '../common/types/decode-otp.type';
import { Response } from 'express';
import { Op } from 'sequelize';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/models/cart.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
    // private readonly cartService: CartService  //ishlamadi
    @InjectModel(Cart) private readonly cartModel: typeof Cart,
  ) {}

  async setUserNames(createUserDto: CreateUserDto, res: Response) {

    const user = await this.userModel.findOne({
      where: {
        phone_number: createUserDto.phone_number,
      },
    });

    if (!user) {
      throw new UnauthorizedException('You have to verify your phone number');
    }
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    if (createUserDto.email) user.email = createUserDto.email;

    try {
      await user.save();
    } catch (error) {
      console.log(error);
    }

    return res.status(200).json(user);
  }

  async findAll({
    page = 1,
    limit = 10000000,
  }: {
    page?: number;
    limit?: number;
  }) {
    const offset = (page - 1) * limit;
    const users = await this.userModel.findAndCountAll({
      limit,
      offset,
      include: [{ all: true }],
    });

    return users;
  }

  async signInWitOtp(phone_number: string) {
    const phone_INT = Number(
      phone_number
        .split('')
        .filter((char) => !isNaN(+char))
        .join(''),
    );

    await this.otpService.auth();

    const decoded = await this.newOTP(phone_INT);

    if (!decoded) throw new BadRequestException('An error ocured  ..');

    return decoded;
  }

  async verifyOtpUser(verifyOtpDto: VerifyOtpDto, res: Response) {
    const { verification_key, otp, phone_number } = verifyOtpDto;
    const check_number = phone_number;

    const obj: IOtpType = JSON.parse(await decode(verification_key));

    if (obj.phone_number != check_number) {
      throw new BadRequestException("Otp didn't send to this phone number");
    }

    let otpDB = await this.otpModel.findOne({
      where: { phone_number: obj.phone_number },
    });

    if (!otpDB) {
      throw new BadRequestException('Wrong one time password');
    }
    otpDB = otpDB.dataValues;

    if (otpDB) {
      if (!otpDB.verified) {
        if (dates.compare(otpDB.expiration_time, new Date())) {
          if (otpDB.otp === otp) {
            const user = await this.userModel.findOne({
              where: {
                phone_number: obj.phone_number,
              },
            });

            if (user) {
              await this.makeVerifyTrue(otpDB.unique_id);

              const tokens = await this.getTokens(user);

              user.hashed_token = await bcrypt.hash(tokens.refresh_token, 7);
              user.save();

              res.cookie('refresh_token', tokens.refresh_token, {
                maxAge: 15 * 21 * 60 * 60 * 1000,
                httpOnly: true,
              });

              const response = {
                user: user,
                tokens: tokens,
                role: 'user',
                status: 1,
              };

              return response;
            } else {
              const user = await this.userModel.create({
                phone_number: phone_number,
                last_name: null,
                first_name: null,
              });
              const tokens = await this.getTokens(user);

              user.hashed_token = await bcrypt.hash(tokens.refresh_token, 7);
              user.save();

              res.cookie('refresh_token', tokens.refresh_token, {
                maxAge: 15 * 21 * 60 * 60 * 1000,
                httpOnly: true,
              });

              const response = {
                user: user,
                tokens: tokens,
                role: 'user',
                status: 0,
              };

              return response;
            }
          } else {
            throw new BadRequestException(`OTP is not matching `);
          }
        } else {
          throw new BadRequestException('Otp already expired');
        }
      } else {
        throw new BadRequestException('OTP already verified');
      }
    } else {
      throw new BadRequestException('Such an OTP is not available');
    }
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User with such id is not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const updUser = await this.userModel.update(updateUserDto, {
      where: { id: id },
    });

    return updUser;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await user.destroy();

    return { message: 'Successfully removed' };
  }

  async newOTP(phone_number: number) {
    const otp = Number(
      otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      }),
    );

    await this.otpService.sendOtp(phone_number, otp);

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({
      where: { phone_number: `+${phone_number}` },
    });

    const newOtp = await this.otpModel.create({
      unique_id: uuidv4(),
      otp: otp,
      expiration_time,
      phone_number: `+${phone_number}`,
    });

    const details = {
      timestamp: now,
      phone_number: newOtp.phone_number,
      success: true,
      message: 'OTP sent to user',
      otp_id: newOtp.id,
    };

    const encoded = await encode(JSON.stringify(details));
    return { status: 'Sent', details: encoded };
  }

  async getTokens(user: User) {
    const jwtPayload = {
      id: user.id,
      phone: user.phone_number,
      is_active: user.is_active,
      role: 'user',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async makeVerifyTrue(otp_id: string) {
    const verified = await this.otpModel.update(
      { verified: true },
      {
        where: {
          unique_id: otp_id,
        },
      },
    );

    if (verified) return true;
    throw new BadRequestException('Wrong one time password ... ');
  }
}
