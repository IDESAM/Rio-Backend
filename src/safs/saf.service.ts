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
    private readonly safRepository: Repository<SAF>,
  ) {}

  async findAll(): Promise<SAF[]> {
    return this.safRepository.find();
  }

  async findOne(id: string): Promise<SAF> {
    const saf = await this.safRepository.findOne({ where: { id } });
    if (!saf) throw new NotFoundException('SAF não encontrado');
    return saf;
  }

  async create(createSafDto: CreateSafDto): Promise<SAF> {
    const saf = this.safRepository.create(createSafDto);
    return this.safRepository.save(saf);
  }

  async update(id: string, updateSafDto: UpdateSafDto): Promise<SAF> {
    await this.findOne(id);
    await this.safRepository.update(id, updateSafDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.safRepository.delete(id);
  }
}
