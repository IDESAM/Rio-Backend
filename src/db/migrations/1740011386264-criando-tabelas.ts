import { MigrationInterface, QueryRunner } from "typeorm";

export class CriandoTabelas1740011386264 implements MigrationInterface {
    name = 'CriandoTabelas1740011386264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "safs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "identificacao" character varying NOT NULL, "latitude" numeric(9,6) NOT NULL, "longitude" numeric(9,6) NOT NULL, CONSTRAINT "PK_e163e82727a2fa1c49e183c7b86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clientes" ("id" character varying NOT NULL, "nome" character varying NOT NULL, CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proprietarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "telefone" character varying, "email" character varying, CONSTRAINT "PK_d1409e325190d9e8ed2e81dc5d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comunidades" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, CONSTRAINT "PK_49ab0b4b2acfc10d20c55d8c99d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plantios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "anoCompensacao" integer NOT NULL, "tCO2Compensadas" numeric(10,2) NOT NULL, "numeroArvores" integer NOT NULL, "areaM2" numeric(10,2) NOT NULL, "clienteId" character varying, "safId" uuid, "comunidadeId" uuid, "proprietarioId" uuid, CONSTRAINT "PK_a895f3297b944371aa7eb85344d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "email" character varying NOT NULL, "senhaHash" character varying NOT NULL, "permissoes" text array NOT NULL, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "plantios" ADD CONSTRAINT "FK_5769c3aea885a955d4744f9f9e0" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plantios" ADD CONSTRAINT "FK_251d74170cb32347cd126fd33b0" FOREIGN KEY ("safId") REFERENCES "safs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plantios" ADD CONSTRAINT "FK_eb0889b292760d592e4201574a7" FOREIGN KEY ("comunidadeId") REFERENCES "comunidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plantios" ADD CONSTRAINT "FK_cad02242bc08455336ca5f39a83" FOREIGN KEY ("proprietarioId") REFERENCES "proprietarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plantios" DROP CONSTRAINT "FK_cad02242bc08455336ca5f39a83"`);
        await queryRunner.query(`ALTER TABLE "plantios" DROP CONSTRAINT "FK_eb0889b292760d592e4201574a7"`);
        await queryRunner.query(`ALTER TABLE "plantios" DROP CONSTRAINT "FK_251d74170cb32347cd126fd33b0"`);
        await queryRunner.query(`ALTER TABLE "plantios" DROP CONSTRAINT "FK_5769c3aea885a955d4744f9f9e0"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "plantios"`);
        await queryRunner.query(`DROP TABLE "comunidades"`);
        await queryRunner.query(`DROP TABLE "proprietarios"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`DROP TABLE "safs"`);
    }

}
