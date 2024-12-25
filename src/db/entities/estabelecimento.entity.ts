import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}

export interface FindAllParameters {
    nome: string;
    cnpj: string;
}