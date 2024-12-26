import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ControleVeiculosEntity } from "./controle-veiculos.entity";

@Entity({ name: 'ESTABELECIMENTO' })
export class EstabelecimentoEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: "varchar" })
    nome: string;

    @Column({ type: "varchar" })
    cnpj: string;

    @Column({ type: "varchar" })
    endereco: string;

    @Column({ type: "varchar" })
    telefone: string;
    //VAGAS_RESTANTES_MOTO
    @Column({ type: "int", name: "qtde_Vagas_Moto" })
    qtdeVagasMoto: number;

    @Column({ type: "int", name: "qtde_Vagas_Carro" })
    qtdeVagasCarro: number;

    @Column({ type: "int", name: "VAGAS_RESTANTES_MOTO" })
    vagasRestantesMoto: number;

    @Column({ type: "int", name: "VAGAS_RESTANTES_CARRO" })
    vagasRestantesCarro: number;

    @OneToMany(()=> ControleVeiculosEntity, (controle) => controle.estabelecimento)
    controles: ControleVeiculosEntity[];
    
}

export interface FindAllParameters {
    nome: string;
    cnpj: string;
}