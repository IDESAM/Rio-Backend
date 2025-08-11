import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImagensSaf1754856592418 implements MigrationInterface {
    name = 'AddImagensSaf1754856592418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "safs" ADD "imagens" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "safs" DROP COLUMN "imagens"`);
    }

}
