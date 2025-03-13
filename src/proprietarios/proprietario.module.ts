import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proprietario } from './proprietario.entity';
import { ProprietarioService } from './proprietario.service';
import { ProprietarioController } from './proprietario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Proprietario])],
  controllers: [ProprietarioController],
  providers: [ProprietarioService],
  exports: [ProprietarioService],
})
export class ProprietarioModule {}
