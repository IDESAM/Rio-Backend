import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proprietario } from './proprietario.entity';
import { CreateProprietarioDto } from './dto/create-proprietario.dto';
import { UpdateProprietarioDto } from './dto/update-proprietario.dto';

@Injectable()
export class ProprietarioService {
  constructor(
    @InjectRepository(Proprietario)
    private readonly repo: Repository<Proprietario>,
  ) { }

  async findAll(): Promise<Proprietario[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Proprietario> {
    const prop = await this.repo.findOne({ where: { id } });
    if (!prop) throw new NotFoundException('Proprietário não encontrado');
    return prop;
  }

  async create(dto: CreateProprietarioDto): Promise<Proprietario> {
    const nome = dto.nome.toUpperCase();
    const existente = await this.repo.findOne({ where: { nome } });

    if (existente) return existente;

    const novo = this.repo.create({ nome });
    return this.repo.save(novo);
  }

  async verificar(nome: string): Promise<{ id: string } | null> {
    const prop = await this.repo.findOne({ where: { nome: nome.toUpperCase() } });
    return prop ? { id: prop.id } : null;
  }

  async update(id: string, dto: UpdateProprietarioDto): Promise<Proprietario> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
