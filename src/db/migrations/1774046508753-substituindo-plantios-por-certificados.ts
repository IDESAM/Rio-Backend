import { MigrationInterface, QueryRunner } from "typeorm";

export class SubstituindoPlantiosPorCertificados1774046508753 implements MigrationInterface {
    name = 'SubstituindoPlantiosPorCertificados1774046508753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "safs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "identificacao" character varying NOT NULL, "latitude" numeric(9,6) NOT NULL, "longitude" numeric(9,6) NOT NULL, "imagens" text array, CONSTRAINT "PK_e163e82727a2fa1c49e183c7b86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "email" character varying NOT NULL, "senhaHash" character varying NOT NULL, "permissoes" text array NOT NULL, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proprietarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "telefone" character varying, "email" character varying, CONSTRAINT "PK_d1409e325190d9e8ed2e81dc5d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comunidades" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, CONSTRAINT "PK_49ab0b4b2acfc10d20c55d8c99d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "certificados" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "codigo" character varying(50) NOT NULL, "cliente_id" integer NOT NULL, "saf_id" uuid NOT NULL, "comunidade_id" uuid NOT NULL, "proprietario_id" uuid NOT NULL, "ano" integer NOT NULL, "tco2_compensadas" numeric(12,2) NOT NULL, "arvores" integer NOT NULL, "area_m2" numeric(12,2) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_88cb22c06e1543ed2ae39c0f83c" UNIQUE ("codigo"), CONSTRAINT "PK_e9b232ca7a16db08667f021708f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "certificados" ADD CONSTRAINT "FK_3520ef8803ae3bf6c26c0dd6a1c" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "certificados" ADD CONSTRAINT "FK_6a0306e86db541e7ce4571fead2" FOREIGN KEY ("saf_id") REFERENCES "safs"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "certificados" ADD CONSTRAINT "FK_5aaf595fc5fa010a2b9930a24c2" FOREIGN KEY ("comunidade_id") REFERENCES "comunidades"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "certificados" ADD CONSTRAINT "FK_cc9cc1c0d47d631cb0b782481d1" FOREIGN KEY ("proprietario_id") REFERENCES "proprietarios"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certificados" DROP CONSTRAINT "FK_cc9cc1c0d47d631cb0b782481d1"`);
        await queryRunner.query(`ALTER TABLE "certificados" DROP CONSTRAINT "FK_5aaf595fc5fa010a2b9930a24c2"`);
        await queryRunner.query(`ALTER TABLE "certificados" DROP CONSTRAINT "FK_6a0306e86db541e7ce4571fead2"`);
        await queryRunner.query(`ALTER TABLE "certificados" DROP CONSTRAINT "FK_3520ef8803ae3bf6c26c0dd6a1c"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`DROP TABLE "certificados"`);
        await queryRunner.query(`DROP TABLE "comunidades"`);
        await queryRunner.query(`DROP TABLE "proprietarios"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "safs"`);
    }

}
