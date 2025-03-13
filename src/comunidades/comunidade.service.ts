import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comunidade } from './comunidade.entity';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';

@Injectable()
export class ComunidadeService {
  constructor(
    @InjectRepository(Comunidade)
    private readonly comunidadeRepository: Repository<Comunidade>,
  ) {}

  async findAll(): Promise<Comunidade[]> {
    return this.comunidadeRepository.find();
  }

  async findOne(id: string): Promise<Comunidade> {
    const comunidade = await this.comunidadeRepository.findOne({ where: { id } });
    if (!comunidade) throw new NotFoundException('Comunidade não encontrada');
    return comunidade;
  }

  async create(createComunidadeDto: CreateComunidadeDto): Promise<Comunidade> {
    const comunidade = this.comunidadeRepository.create(createComunidadeDto);
    return this.comunidadeRepository.save(comunidade);
  }

  async update(id: string, updateComunidadeDto: UpdateComunidadeDto): Promise<Comunidade> {
    await this.findOne(id);
    await this.comunidadeRepository.update(id, updateComunidadeDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.comunidadeRepository.delete(id);
  }
}
