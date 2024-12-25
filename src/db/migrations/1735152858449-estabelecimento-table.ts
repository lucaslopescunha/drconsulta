import { MigrationInterface, QueryRunner } from "typeorm";

export class EstabelecimentoTable1735152858449 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
         await queryRunner.query(`
             CREATE TABLE ESTABELECIMENTO (
                 ID INT NOT NULL AUTO_INCREMENT,
                 NOME varchar(100) NOT NULL,
                 CNPJ varchar(14) NOT NULL,
                 ENDERECO varchar(300) NOT NULL,
                 TELEFONE varchar(11) NOT NULL,
                 QTDE_VAGAS_MOTO INT NOT NULL,
                 QTDE_VAGAS_CARRO INT NOT NULL,
                 VAGAS_RESTANTES_MOTO INT NOT NULL,
                 VAGAS_RESTANTES_CARRO INT NOT NULL,
                 PRIMARY KEY(ID))`)
     }
 
     public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query('DROP TABLE IF EXISTS ESTABELECIMENTO;')
     }
 
}
