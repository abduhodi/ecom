import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mail/mail.service';
import { LoginAdminDto } from './dto/admin-login.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const admin = await this.adminModel.findOne({
      where: { email: createAdminDto.email },
    });
    if (admin) {
      throw new BadRequestException('Admin with this email already exists');
    }

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password: await bcrypt.hash(createAdminDto.password, 7),
    });

    const uniqueKey: string = uuidv4();
    newAdmin.activation_link = uniqueKey;

    await newAdmin.save();

    try {
      await this.mailService.sendStuffConfirmation(newAdmin);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while sending the message',
      );
    }

    const response = {
      message: 'Admin created',
      admin: newAdmin,
    };

    return response;
  }

  async login(adminLoginDto: LoginAdminDto, res: Response) {
    const { email, password } = adminLoginDto;
    const admin = await this.adminModel.findOne({ where: { email: email } });
    if (!admin) {
      throw new UnauthorizedException('Email or password is not valid ');
    }

    const checkPass = await bcrypt.compare(password, admin.hashed_password);

    if (!checkPass) {
      throw new UnauthorizedException('Email or password is not valid ');
    }

    const tokens = await this.getTokens(admin);

    admin.hashed_token = await bcrypt.hash(tokens.refresh_token, 7);
    await admin.save();

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 21 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      msg: 'Successfully logged in',
      admin: admin,
      tokens: tokens,
    };

    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new ForbiddenException('User not found');
    }

    const admin = await this.adminModel.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!admin) {
      throw new NotFoundException('Current time this admin is not available');
    } else if (admin && admin.hashed_token == null) {
      throw new BadRequestException('User already logged out');
    }

    admin.hashed_token = null;
    await admin.save();

    res.clearCookie('refresh_token');

    const response = {
      message: 'Successfully logged out',
      admin: admin,
    };

    return response;
  }

  async refreshTokenAdmin(
    admin_id: number,
    refreshToken: string,
    res: Response,
  ) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (admin_id != decodedToken['id']) {
      throw new UnauthorizedException(
        'Mismatch of administrator and refresh token identifiers',
      );
    }

    const admin = await this.adminModel.findOne({ where: { id: admin_id } });
    if (!admin) {
      throw new NotFoundException('Admin is not found 404 :(');
    } else if (!admin.hashed_token) {
      throw new UnauthorizedException(
        "Admin don't have token so as to refresh it ",
      );
    }

    const tokenMatch = await bcrypt.compare(refreshToken, admin.hashed_token);

    if (!tokenMatch) {
      throw new ForbiddenException('Mismatched refresh token ');
    }

    const tokens = await this.getTokens(admin);
    admin.hashed_token = await bcrypt.hash(tokens.refresh_token, 7);
    await admin.save();

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 21 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      msg: 'Admin refreshed',
      admin: admin,
      tokens,
    };

    return response;
  }

  async findAll() {
    const admins = await this.adminModel.findAll({});
    return admins;
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    await admin.update(updateAdminDto);

    const response = {
      message: 'Admin updated successfully',
      admin: admin,
    };

    return response;
  }

  async remove(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    await admin.destroy();

    const response = {
      message: 'Admin removed successfully',
      admin: admin,
    };

    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }

    const admin = await this.adminModel.findOne({
      where: {
        activation_link: link,
        is_active: false,
      },
    });

    if (!admin) {
      throw new BadRequestException('Admin already activated');
    }

    admin.is_active = true;
    await admin.save();

    const response = {
      message: 'Admin activated successfully',
      admin: {
        id: admin.id,
        name_user: `${admin.first_name} ${admin.last_name}`,
        is_active: admin.is_active,
      },
    };

    return response;
  }

  async getTokens(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_superadmin: admin.is_superadmin,
      role: 'admin',
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
}
