import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SAF } from './saf.entity';
import { SafService } from './saf.service';
import { SafController } from './saf.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SAF])],
  controllers: [SafController],
  providers: [SafService],
  exports: [SafService],
})
export class SafModule {}
