import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const StorageGetter = createParamDecorator(
  async (
    data: string,
    context: ExecutionContext,
  ): Promise<string | boolean> => {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (authHeader) {
      const [_, refreshToken] = authHeader.split(' ');
      if (!refreshToken) {
        throw new UnauthorizedException('Token is not found ');
      }
      return refreshToken;
    } else {
      return false;
    }
  },
);
