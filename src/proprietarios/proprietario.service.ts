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
    private readonly proprietarioRepository: Repository<Proprietario>,
  ) {}

  async findAll(): Promise<Proprietario[]> {
    return this.proprietarioRepository.find();
  }

  async findOne(id: string): Promise<Proprietario> {
    const proprietario = await this.proprietarioRepository.findOne({ where: { id } });
    if (!proprietario) throw new NotFoundException('Proprietário não encontrado');
    return proprietario;
  }

  async create(createProprietarioDto: CreateProprietarioDto): Promise<Proprietario> {
    const proprietario = this.proprietarioRepository.create(createProprietarioDto);
    return this.proprietarioRepository.save(proprietario);
  }

  async update(id: string, updateProprietarioDto: UpdateProprietarioDto): Promise<Proprietario> {
    await this.findOne(id);
    await this.proprietarioRepository.update(id, updateProprietarioDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.proprietarioRepository.delete(id);
  }
}
