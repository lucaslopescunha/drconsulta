import { IsEnum, IsNumber, IsOptional, IsString, length, MaxLength, MinLength } from "class-validator";
import { IntegerType } from "typeorm";


export class EstabelecimentoDto {

    @IsOptional()
    id: number;

    @IsString()
    @MaxLength(100)
    nome: string;

    @MinLength(14)
    @MaxLength(14)
    cnpj: string;

    @IsString()
    @MaxLength(300)
    endereco: string;

    // formato 11999991111 ... espera-se que o front já envie o valor formatado
    @MinLength(11)
    @MaxLength(11)
    telefone: string;

    @IsNumber()
    qtdeVagasMoto: number;

    @IsNumber()
    qtdeVagasCarro: number;
}

export interface FindAllParameters {
    nome: string;
    cnpj: string;
}