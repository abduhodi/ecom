import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { OtpModule } from '../otp/otp.module';
import { Otp } from '../otp/models/otp.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Otp]), JwtModule, OtpModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
