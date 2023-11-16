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
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhoneNumberDto } from './dto/phone-for-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Request, Response } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('set-profile')
  @ApiOperation({ summary: 'Set user names' })
  @ApiResponse({ status: 200, description: 'Profile set successfully' })
  setUserNames(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const response = this.userService.setUserNames(createUserDto, res);
    return response;
  }

  @Get('all')
  @ApiOperation({ summary: 'Get a list of all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully',
  })
  findAll(@Query() params: { page: number; limit: number }): any {
    return this.userService.findAll(params);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Post('send-otp')
  @ApiOperation({ summary: 'Sign in with OTP' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  signInWithOtp(@Body() phoneNumberDto: PhoneNumberDto) {
    return this.userService.signInWitOtp(phoneNumberDto?.phone_number);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return this.userService.verifyOtpUser(verifyOtpDto, res, req);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
