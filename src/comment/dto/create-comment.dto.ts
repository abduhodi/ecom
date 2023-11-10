import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 1, description: 'Id of user' })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 1, description: 'Id of product' })
  @IsNumber()
  product_id: number;

  @ApiProperty({
    example: "One of the best product I've ever purchased",
    description: 'Comment about product',
  })
  @IsString()
  @IsNotEmpty()
  comment: number;

  @ApiProperty({ example: 1, description: 'Id of Comment' })
  parent_comment_id: number;
}
