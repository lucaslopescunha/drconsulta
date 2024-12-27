import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { VeiculoEntity } from "./veiculo.entity";
import { EstabelecimentoEntity } from "./estabelecimento.entity";

@Entity({name: 'CONTROLE_VEICULOS'})
export class ControleVeiculosEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => VeiculoEntity, (veiculo) => veiculo.controles)
    @JoinColumn({ name: "ID_VEICULO"})
    veiculo: VeiculoEntity;

    @ManyToOne(() => EstabelecimentoEntity, (estabelecimento) => estabelecimento.controles)
    @JoinColumn({ name: "ID_ESTABELECIMENTO"})
    estabelecimento: EstabelecimentoEntity;

    @Column({name: "DT_ENTRADA", type: "timestamp"})
    dtEntrada: Date;

    @Column({name: "DT_SAIDA", type: "timestamp"})
    dtSaida: Date;

    constructor(veiculo?: VeiculoEntity, estabelecimento?: EstabelecimentoEntity) {
        this.veiculo = veiculo;
        this.estabelecimento = estabelecimento;
    }
}

export interface FindAllParameters {
    nome: string;
    cnpj: string;
    idEstabelecimento: number;
}