import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ControleVeiculosEntity } from "./controle-veiculos.entity";

@Entity({name: 'VEICULO'})
export class VeiculoEntity {

    @PrimaryGeneratedColumn('increment')
    id?: number;

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

    @OneToMany(()=> ControleVeiculosEntity, (controle) => controle.veiculo)
    controles?: ControleVeiculosEntity[];
    
}

export interface FindAllParameters {
    modelo: string;
    placa: string;
    tipo: string;
}