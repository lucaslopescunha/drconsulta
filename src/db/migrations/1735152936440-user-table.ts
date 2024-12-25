import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1735152936440 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE USER (
                  id INT NOT NULL AUTO_INCREMENT,
                  username varchar(256) NOT NULL,
                  password_hash varchar(256) NOT NULL,
                  PRIMARY KEY (id),
                  UNIQUE (username)
              );`,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS USER')
    }

}
