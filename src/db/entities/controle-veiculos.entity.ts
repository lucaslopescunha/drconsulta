import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { VeiculoEntity } from "./veiculo.entity";
import { EstabelecimentoEntity } from "./estabelecimento.entity";

@Entity({name: 'CONTROLE_VEICULOS'})
export class ControleVeiculosEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(() => VeiculoEntity)
    @JoinColumn({ name: "ID_VEICULO"})
    veiculo: VeiculoEntity;

    @OneToOne(() => EstabelecimentoEntity)
    @JoinColumn({ name: "ID_ESTABELECIMENTO"})
    estabelecimento: EstabelecimentoEntity;

    @Column({name: "DT_ENTRADA", type: "timestamp"})
    dtEntrada: Date;

    @Column({name: "DT_SAIDA", type: "timestamp"})
    dtSaida: Date;
}

export interface FindAllParameters {
    nome: string;
    cnpj: string;
}