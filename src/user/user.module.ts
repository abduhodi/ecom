import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { OtpModule } from '../otp/otp.module';
import { Otp } from '../otp/models/otp.model';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Otp]), JwtModule, OtpModule,CartModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
