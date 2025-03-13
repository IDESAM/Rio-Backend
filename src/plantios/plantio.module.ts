import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plantio } from './plantio.entity';
import { PlantioService } from './plantio.service';
import { PlantioController } from './plantio.controller';
import { Cliente } from '../clientes/cliente.entity';
import { SAF } from '../safs/saf.entity';
import { Comunidade } from '../comunidades/comunidade.entity';
import { Proprietario } from '../proprietarios/proprietario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plantio, Cliente, SAF, Comunidade, Proprietario])
  ],
  controllers: [PlantioController],
  providers: [PlantioService],
  exports: [PlantioService],
})
export class PlantioModule {}
