import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SafService } from './saf.service';
import { CreateSafDto } from './dto/create-saf.dto';
import { UpdateSafDto } from './dto/update-saf.dto';

@Controller('safs')
export class SafController {
  constructor(private readonly safService: SafService) {}

  @Get()
  findAll() {
    return this.safService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.safService.findOne(id);
  }

  @Post()
  create(@Body() createSafDto: CreateSafDto) {
    return this.safService.create(createSafDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSafDto: UpdateSafDto) {
    return this.safService.update(id, updateSafDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.safService.remove(id);
  }
}
