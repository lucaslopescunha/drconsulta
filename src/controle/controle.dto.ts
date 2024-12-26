import { IsDateString, isDateString, IsEnum, IsNumber, IsOptional, IsString, length, MaxLength, MinLength } from "class-validator";
import { IntegerType } from "typeorm";

export enum TipoRegistroEnum {
    "E" = 'Entrada',
    "S" = 'Saída'
}

export class ControleVeiculosDto {

    @IsOptional()
    id: number;

    @IsNumber()
    veiculo: number;

    @IsNumber()
    estabelecimento: number;

    @IsDateString()
    @IsOptional()
    dtSaida: Date;

    @IsDateString()
    @IsOptional()
    dtEntrada: Date;
    
    @IsEnum(TipoRegistroEnum)
    tipo: string;
    
}

export interface FindAllParameters {
    nome: string;
    cnpj: string;
}