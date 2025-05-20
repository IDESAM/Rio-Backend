import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SAF } from './saf.entity';
import { CreateSafDto } from './dto/create-saf.dto';
import { UpdateSafDto } from './dto/update-saf.dto';

@Injectable()
export class SafService {
  constructor(
    @InjectRepository(SAF)
    private readonly repo: Repository<SAF>,
  ) { }

  async findAll(): Promise<SAF[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<SAF> {
    const saf = await this.repo.findOne({ where: { id } });
    if (!saf) throw new NotFoundException('SAF não encontrado');
    return saf;
  }

  async create(dto: CreateSafDto): Promise<SAF> {
    const identificacao = dto.identificacao.toUpperCase();
    const existente = await this.repo.findOne({ where: { identificacao } });

    if (existente) return existente;

    const novo = this.repo.create({ identificacao, latitude: dto.latitude, longitude: dto.longitude });
    return this.repo.save(novo);
  }

  async verificar(identificacao: string): Promise<{ id: string } | null> {
    const saf = await this.repo.findOne({ where: { identificacao: identificacao.toUpperCase() } });
    return saf ? { id: saf.id } : null;
  }

  async update(id: string, dto: UpdateSafDto): Promise<SAF> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
