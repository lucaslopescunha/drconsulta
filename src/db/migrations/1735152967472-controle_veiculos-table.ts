import { MigrationInterface, QueryRunner } from "typeorm";

export class ControleVeiculosTable1735152967472 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //       await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        await queryRunner.query(`
                   CREATE TABLE CONTROLE_VEICULOS (
                       id INT NOT NULL AUTO_INCREMENT,
                       ID_VEICULO INT NOT NULL,
                       ID_ESTABELECIMENTO INT NOT NULL,
                       DT_ENTRADA TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       DT_SAIDA TIMESTAMP NULL,
                       CONSTRAINT TASK_PK PRIMARY KEY(ID),
                       FOREIGN KEY(ID_VEICULO) REFERENCES VEICULO(ID),
                       FOREIGN KEY(ID_ESTABELECIMENTO) REFERENCES ESTABELECIMENTO(ID))`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS CONTROLE_VEICULOS;')
    }

}
