import { IsDateString, isDateString, IsEnum, IsNumber, IsOptional, IsString, length, MaxLength, MinLength } from "class-validator";
import { IntegerType } from "typeorm";


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
}

export interface FindAllParameters {
    nome: string;
    cnpj: string;
}