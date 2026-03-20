import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CertificadosService } from './certificado.service';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';

@Controller('certificados')
export class CertificadosController {
  constructor(private readonly certificadosService: CertificadosService) {}

  @Post()
  create(@Body() dto: CreateCertificadoDto) {
    return this.certificadosService.create(dto);
  }

  @Get()
  findAll() {
    return this.certificadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificadosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCertificadoDto,
  ) {
    return this.certificadosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificadosService.remove(id);
  }
}