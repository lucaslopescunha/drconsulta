import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, isDateString, IsEnum, IsNumber, IsOptional, IsString, length, MaxLength, MinLength } from "class-validator";
import { IntegerType } from "typeorm";

export enum TipoRegistroEnum {
    "E" = 'Entrada',
    "S" = 'Saída'
}

export class ControleVeiculosDto {

    @ApiProperty()
    @IsOptional()
    id: number;

    @ApiProperty({description: "Id do veículo"})
    @IsNumber()
    veiculo: number;

    @ApiProperty({description: "Id do estabelecimento"})
    @IsNumber()
    estabelecimento: number;

    @ApiProperty({description: "Data de saída", example: "yyyy-mm-ddTHH:mm:ss"})
    @IsDateString()
    @IsOptional()
    dtSaida: Date;

    @ApiProperty({description: "Data de entrada", example: "yyyy-mm-ddTHH:mm:ss"})
    @IsDateString()
    @IsOptional()
    dtEntrada: Date;


    @ApiProperty({
        enum: TipoRegistroEnum,
        isArray: false,
        example: {
            "E": TipoRegistroEnum.E,
            "S": TipoRegistroEnum.S
        }
    })
    @IsEnum(TipoRegistroEnum)
    tipo: string;

}

export class FindAllParameters {
    estabelecimento: number;
}