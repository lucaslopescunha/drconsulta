import { MigrationInterface, QueryRunner } from "typeorm";

export class VeiculoTable1735152903925 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE VEICULO (
                id INT NOT NULL AUTO_INCREMENT,
                marca varchar(100) NOT NULL,
                modelo varchar(256) NOT NULL,
                COR varchar(30) NOT NULL,
                PLACA varchar(9) NOT NULL,
                TIPO varchar(1) NOT NULL,
                CONSTRAINT TASK_PK PRIMARY KEY(ID),
                UNIQUE (PLACA))`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS VEICULO;')
    }

}
