import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comunidade } from './comunidade.entity';
import { ComunidadeService } from './comunidade.service';
import { ComunidadeController } from './comunidade.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comunidade])],
  controllers: [ComunidadeController],
  providers: [ComunidadeService],
  exports: [ComunidadeService],
})
export class ComunidadeModule {}
