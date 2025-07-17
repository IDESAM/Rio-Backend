import { MigrationInterface, QueryRunner } from "typeorm";

export class AdicionandoImagensPlantios1752682464962 implements MigrationInterface {
    name = 'AdicionandoImagensPlantios1752682464962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plantios" ADD "imagens" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plantios" DROP COLUMN "imagens"`);
    }

}
