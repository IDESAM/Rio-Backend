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
  ) { }

  async findAll(): Promise<Comunidade[]> {
    return this.comunidadeRepository.find();
  }

  async findOne(id: string): Promise<Comunidade> {
    const comunidade = await this.comunidadeRepository.findOne({ where: { id } });
    if (!comunidade) throw new NotFoundException('Comunidade não encontrada');
    return comunidade;
  }

  async create(dto: CreateComunidadeDto): Promise<Comunidade> {
    const nome = dto.nome.toUpperCase();
    const existente = await this.comunidadeRepository.findOne({ where: { nome } });

    if (existente) return existente;

    const nova = this.comunidadeRepository.create({ nome });
    return this.comunidadeRepository.save(nova);
  }

  async verificar(nome: string): Promise<{ id: string } | null> {
    const comunidade = await this.comunidadeRepository.findOne({ where: { nome: nome.toUpperCase() } });
    return comunidade ? { id: comunidade.id } : null;
  }

  async update(id: string, dto: UpdateComunidadeDto): Promise<Comunidade> {
    await this.findOne(id);
    await this.comunidadeRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.comunidadeRepository.delete(id);
  }
}
