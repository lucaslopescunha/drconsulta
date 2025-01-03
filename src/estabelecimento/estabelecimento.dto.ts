import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, length, MaxLength, MinLength } from "class-validator";
import { IntegerType } from "typeorm";


export class EstabelecimentoDto {

    @ApiProperty()
    @IsOptional()
    id?: number;

    @ApiProperty({description: "Nome do estabelecimento"})
    @IsString()
    @MaxLength(100)
    nome: string;

    @ApiProperty({description: "CNPJ sem máscara"})
    @MinLength(14)
    @MaxLength(14)
    cnpj: string;

    @ApiProperty({description: "Endereço"})
    @IsString()
    @MaxLength(300)
    endereco: string;

    // formato 11999991111 ... espera-se que o front já envie o valor formatado
    @ApiProperty({description: "Número do telefone sem máscara. Máximo de 11 dígitos"})
    @MinLength(11)
    @MaxLength(11)
    telefone: string;

    @ApiProperty({description: "Número de vagas para moto"})
    @IsNumber()
    qtdeVagasMoto: number;

    @ApiProperty({description: "Número de vagas para carro"})
    @IsNumber()
    qtdeVagasCarro: number;
}

export interface FindAllParameters {
    nome: string;
    cnpj: string;
}
export class EstabelecimentoRouteParameters {
    @IsNumber()
    id: number;
}