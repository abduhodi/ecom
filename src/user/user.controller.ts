import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { PhoneNumberDto } from './dto/phone-for-otp.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.userService.registration(createUserDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get a list of all users' })
  findAll(@Query() params: { page: number; limit: number }): any {
    return this.userService.findAll(params);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Post('send-otp')
  signInWithOtp(@Body() phoneNumberDto: PhoneNumberDto) {
    return this.userService.signInWitOtp(phoneNumberDto?.phone_number);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
