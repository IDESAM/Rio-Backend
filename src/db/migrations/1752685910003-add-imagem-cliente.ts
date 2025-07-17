import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImagemCliente1752685910003 implements MigrationInterface {
    name = 'AddImagemCliente1752685910003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" ADD "imagem" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "imagem"`);
    }

}
