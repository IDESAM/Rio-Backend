import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';

import { ClienteModule } from './clientes/cliente.module';
import { SafModule } from './safs/saf.module';
import { ComunidadeModule } from './comunidades/comunidade.module';
import { ProprietarioModule } from './proprietarios/proprietario.module';
import { PlantioModule } from './plantios/plantio.module';
import { UsuarioModule } from './usuarios/usuario.module';

@Module({
  imports: [
    ClienteModule,
    SafModule,
    ComunidadeModule,
    ProprietarioModule,
    PlantioModule,
    UsuarioModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
})
export class AppModule { }
