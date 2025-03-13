import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plantio } from './plantio.entity';
import { CreatePlantioDto } from './dto/create-plantio.dto';
import { UpdatePlantioDto } from './dto/update-plantio.dto';
import { Cliente } from '../clientes/cliente.entity';
import { SAF } from '../safs/saf.entity';
import { Comunidade } from '../comunidades/comunidade.entity';
import { Proprietario } from '../proprietarios/proprietario.entity';

@Injectable()
export class PlantioService {
  constructor(
    @InjectRepository(Plantio)
    private readonly plantioRepository: Repository<Plantio>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(SAF)
    private readonly safRepository: Repository<SAF>,
    @InjectRepository(Comunidade)
    private readonly comunidadeRepository: Repository<Comunidade>,
    @InjectRepository(Proprietario)
    private readonly proprietarioRepository: Repository<Proprietario>,
  ) {}

  async findAll(): Promise<Plantio[]> {
    return this.plantioRepository.find();
  }

  async findOne(id: string): Promise<Plantio> {
    const plantio = await this.plantioRepository.findOne({ where: { id } });
    if (!plantio) throw new NotFoundException('Plantio não encontrado');
    return plantio;
  }

  async create(dto: CreatePlantioDto): Promise<Plantio> {
    // Verifica se o Cliente existe
    const cliente = await this.clienteRepository.findOne({ where: { id: dto.clienteId } });
    if (!cliente) throw new BadRequestException('Cliente não encontrado');

    // Verifica se o SAF existe
    const saf = await this.safRepository.findOneBy({ id: dto.safId });
    if (!saf) throw new BadRequestException('SAF não encontrado');

    // Verifica se a Comunidade existe
    const comunidade = await this.comunidadeRepository.findOneBy({ id: dto.comunidadeId });
    if (!comunidade) throw new BadRequestException('Comunidade não encontrada');

    // Verifica se o Proprietário existe
    const proprietario = await this.proprietarioRepository.findOneBy({ id: dto.proprietarioId });
    if (!proprietario) throw new BadRequestException('Proprietário não encontrado');

    // Cria o novo plantio
    const plantio = this.plantioRepository.create({
      ...dto,
      cliente, // Agora cliente pode ter ID personalizado (ex: PCN2300)
      saf,
      comunidade,
      proprietario,
    });

    return this.plantioRepository.save(plantio);
  }

  async update(id: string, dto: UpdatePlantioDto): Promise<Plantio> {
    await this.findOne(id);
    await this.plantioRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.plantioRepository.delete(id);
  }
}
