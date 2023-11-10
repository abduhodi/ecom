import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductInfoDto {
    @ApiProperty({ example: 1, description: 'Product ID' })
    @IsNotEmpty()
    @IsNumber()
    product_id: number;
    
    @ApiProperty({ example: 1, description: 'Attribute ID' })
    @IsNotEmpty()
    @IsNumber()
    attribute_id: number;
    
    @ApiProperty({ example: "ekran 16dyum ...", description: 'Attribute Value' })
    @IsNotEmpty()
    @IsString()
    attribute_value: string;
    
    @ApiProperty({ example: false, description: 'Show in main' })
    @IsNotEmpty()
    @IsBoolean()
    show_in_main: boolean;
}
