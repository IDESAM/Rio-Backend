import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ComunidadeService } from './comunidade.service';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';

@Controller('comunidades')
export class ComunidadeController {
  constructor(private readonly comunidadeService: ComunidadeService) { }

  @Get()
  findAll() {
    return this.comunidadeService.findAll();
  }

  @Get('verificar/:nome')
  verificar(@Param('nome') nome: string) {
    return this.comunidadeService.verificar(nome);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunidadeService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateComunidadeDto) {
    return this.comunidadeService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateComunidadeDto) {
    return this.comunidadeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunidadeService.remove(id);
  }
}
