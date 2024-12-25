import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'VEICULO'})
export class VeiculoEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: "varchar"})
    modelo: string;

    @Column({type: "varchar"})
    cor: string;

    @Column({type: "varchar"})
    placa: string;
  
    @Column({type: "varchar"})
    tipo: string;
  
    @Column({type: "varchar"})
    marca: string;
}

export interface FindAllParameters {
    modelo: string;
    placa: string;
    tipo: string;
}