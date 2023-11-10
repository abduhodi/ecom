import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAttributeGroupDto {
    @ApiProperty({ example: 'displey', description: 'Name of product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1, description: 'Id of category' })
  @IsNumber()
  category_id: number;

  @ApiProperty({ example: 1, description: 'position' })
  @IsNumber()
  position: number;
}
