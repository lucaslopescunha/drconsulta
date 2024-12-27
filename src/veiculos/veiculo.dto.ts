import { IsEnum, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export enum CorEnum {
    "B" = 'BRANCO',
    "A" = 'AZUL',
    "P" = 'PRETO'
}

export enum TipoEnum {
    "C" = 'CARRO',
    "M" = 'MOTO'
}

export class VeiculosDto {

    @IsOptional()
    id: number;

    @IsString()
    @MaxLength(256)
    modelo: string;

    @IsEnum(CorEnum)
    cor: string;

    @IsString()
    @MaxLength(9)
    placa: string;

    @IsEnum(TipoEnum)
    tipo: string;

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