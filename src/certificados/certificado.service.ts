import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Certificado } from './certificado.entity';
import { Cliente } from '../clientes/cliente.entity';
import { SAF } from '../safs/saf.entity';
import { Comunidade } from '../comunidades/comunidade.entity';
import { Proprietario } from '../proprietarios/proprietario.entity';

import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';
import { CertificadoResponseDto } from './dto/certificado-response.dto';
import { toCertificadoResponseDto } from './certificado.mapper';

@Injectable()
export class CertificadosService {
  constructor(
    @InjectRepository(Certificado)
    private readonly certificadoRepository: Repository<Certificado>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(SAF)
    private readonly safRepository: Repository<SAF>,

    @InjectRepository(Comunidade)
    private readonly comunidadeRepository: Repository<Comunidade>,

    @InjectRepository(Proprietario)
    private readonly proprietarioRepository: Repository<Proprietario>,
  ) {}

  async create(dto: CreateCertificadoDto): Promise<CertificadoResponseDto> {
    const certificadoExistente = await this.certificadoRepository.findOne({
      where: { codigo: dto.codigo },
    });

    if (certificadoExistente) {
      throw new ConflictException('Já existe um certificado com esse código.');
    }

    await this.validarRelacionamentos(dto);

    const certificado = this.certificadoRepository.create({
      codigo: dto.codigo,
      clienteId: dto.clienteId,
      safId: dto.safId,
      comunidadeId: dto.comunidadeId,
      proprietarioId: dto.proprietarioId,
      ano: dto.ano,
      tco2Compensadas: dto.tco2Compensadas,
      arvores: dto.arvores,
      areaM2: dto.areaM2,
      ativo: dto.ativo ?? true,
    });

    const salvo = await this.certificadoRepository.save(certificado);

    const carregado = await this.certificadoRepository.findOne({
      where: { id: salvo.id },
    });

    if (!carregado) {
      throw new NotFoundException('Certificado não encontrado após criação.');
    }

    return toCertificadoResponseDto(carregado);
  }

  async findAll(): Promise<CertificadoResponseDto[]> {
    const certificados = await this.certificadoRepository.find({
      order: { createdAt: 'DESC' },
    });

    return certificados.map(toCertificadoResponseDto);
  }

  async findOne(id: string): Promise<CertificadoResponseDto> {
    const certificado = await this.certificadoRepository.findOne({
      where: { id },
    });

    if (!certificado) {
      throw new NotFoundException('Certificado não encontrado.');
    }

    return toCertificadoResponseDto(certificado);
  }

  async update(
    id: string,
    dto: UpdateCertificadoDto,
  ): Promise<CertificadoResponseDto> {
    const certificado = await this.certificadoRepository.findOne({
      where: { id },
    });

    if (!certificado) {
      throw new NotFoundException('Certificado não encontrado.');
    }

    if (dto.codigo) {
      const existente = await this.certificadoRepository.findOne({
        where: { codigo: dto.codigo },
      });

      if (existente && existente.id !== id) {
        throw new ConflictException('Já existe um certificado com esse código.');
      }
    }

    await this.validarRelacionamentos(dto);

    Object.assign(certificado, {
      ...dto,
      ativo: dto.ativo ?? certificado.ativo,
    });

    const atualizado = await this.certificadoRepository.save(certificado);

    const carregado = await this.certificadoRepository.findOne({
      where: { id: atualizado.id },
    });

    if (!carregado) {
      throw new NotFoundException('Certificado não encontrado após atualização.');
    }

    return toCertificadoResponseDto(carregado);
  }

  async remove(id: string): Promise<void> {
    const certificado = await this.certificadoRepository.findOne({
      where: { id },
    });

    if (!certificado) {
      throw new NotFoundException('Certificado não encontrado.');
    }

    await this.certificadoRepository.remove(certificado);
  }

  private async validarRelacionamentos(
    dto: Partial<CreateCertificadoDto>,
  ): Promise<void> {
    if (dto.clienteId !== undefined) {
      const cliente = await this.clienteRepository.findOne({
        where: { id: dto.clienteId },
      });

      if (!cliente) {
        throw new NotFoundException('Cliente não encontrado.');
      }
    }

    if (dto.safId) {
      const saf = await this.safRepository.findOne({
        where: { id: dto.safId },
      });

      if (!saf) {
        throw new NotFoundException('SAF não encontrado.');
      }
    }

    if (dto.comunidadeId) {
      const comunidade = await this.comunidadeRepository.findOne({
        where: { id: dto.comunidadeId },
      });

      if (!comunidade) {
        throw new NotFoundException('Comunidade não encontrada.');
      }
    }

    if (dto.proprietarioId) {
      const proprietario = await this.proprietarioRepository.findOne({
        where: { id: dto.proprietarioId },
      });

      if (!proprietario) {
        throw new NotFoundException('Proprietário não encontrado.');
      }
    }
  }
}