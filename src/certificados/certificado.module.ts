import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Certificado } from './certificado.entity';
import { Cliente } from '../clientes/cliente.entity';
import { SAF } from '../safs/saf.entity';
import { Comunidade } from '../comunidades/comunidade.entity';
import { Proprietario } from '../proprietarios/proprietario.entity';

import { CertificadosController } from './certificado.controller';
import { CertificadosService } from './certificado.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Certificado,
      Cliente,
      SAF,
      Comunidade,
      Proprietario,
    ]),
  ],
  controllers: [CertificadosController],
  providers: [CertificadosService],
  exports: [CertificadosService],
})
export class CertificadosModule {}