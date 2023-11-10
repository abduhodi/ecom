import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAttributeDto {
    @ApiProperty({ example: 'screen size', description: 'Name of Attribute' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1, description: 'Id of Attribute Group' })
  @IsNumber()
  @IsNotEmpty()
  attribute_group_id: number;
}
