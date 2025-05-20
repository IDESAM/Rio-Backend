import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProprietarioService } from './proprietario.service';
import { CreateProprietarioDto } from './dto/create-proprietario.dto';
import { UpdateProprietarioDto } from './dto/update-proprietario.dto';

@Controller('proprietarios')
export class ProprietarioController {
  constructor(private readonly service: ProprietarioService) { }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('verificar/:nome')
  verificar(@Param('nome') nome: string) {
    return this.service.verificar(nome);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProprietarioDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProprietarioDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
