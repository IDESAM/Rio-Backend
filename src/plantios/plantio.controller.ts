import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PlantioService } from './plantio.service';
import { CreatePlantioDto } from './dto/create-plantio.dto';
import { UpdatePlantioDto } from './dto/update-plantio.dto';

@Controller('plantios')
export class PlantioController {
  constructor(private readonly plantioService: PlantioService) { }

  @Get()
  findAll() {
    return this.plantioService.findAll();
  }

  @Post('verificar')
  async verificar(@Body() dto: CreatePlantioDto) {
    const existe = await this.plantioService.verificarDuplicado(dto);
    return { existe };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantioService.findOne(id);
  }

  @Post()
  create(@Body() createPlantioDto: CreatePlantioDto) {
    return this.plantioService.create(createPlantioDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlantioDto: UpdatePlantioDto) {
    return this.plantioService.update(id, updatePlantioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantioService.remove(id);
  }
}
