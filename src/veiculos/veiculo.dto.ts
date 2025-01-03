import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";


export enum TipoEnum {
    "C" = 'CARRO',
    "M" = 'MOTO'
}

export class VeiculosDto {

    @ApiProperty({ description: "Id do veículo gerado" })
    @IsOptional()
    id?: number;

    @ApiProperty({ description: "Modelo do veículo" })
    @IsString()
    @MaxLength(256)
    modelo: string;

    @ApiProperty({
        description: "Cor do veículo.",
    })
    @MaxLength(30)
    cor: string;

    @ApiProperty({ description: "Placa do Veículo" })
    @IsString()
    @MaxLength(9)
    placa: string;

    @ApiProperty({
        description: "Tipo do veículos. Se é Carro ou Moto",
        enum: TipoEnum,
        example: {
            "C": TipoEnum.C,
            "M": TipoEnum.M
        },
        isArray: false
    })
    @IsEnum(TipoEnum)
    tipo: string;

    @ApiProperty({ description: "Tipo do veículos. Se é Carro(utiliza 'C') ou Moto(Utiliza 'M')" })
    @IsString()
    @MaxLength(100)
    marca: string;

}

export interface FindAllParameters {
    modelo: string;
    placa: string;
    tipo: string;
}

export class VeiculoRouteParameters {
    @IsNumber()
    id: number;
}