import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SafService } from './saf.service';
import { CreateSafDto } from './dto/create-saf.dto';
import { UpdateSafDto } from './dto/update-saf.dto';

@Controller('safs')
export class SafController {
  constructor(private readonly service: SafService) { }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('verificar/:identificacao')
  verificar(@Param('identificacao') identificacao: string) {
    return this.service.verificar(identificacao);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateSafDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSafDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
