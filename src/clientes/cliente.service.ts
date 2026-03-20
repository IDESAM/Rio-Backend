import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const nomeNormalizado = createClienteDto.nome.trim();

    const clienteExistente = await this.clienteRepository.findOne({
      where: { nome: ILike(nomeNormalizado) },
    });

    if (clienteExistente) {
      throw new ConflictException('Já existe um cliente com esse nome.');
    }

    const cliente = this.clienteRepository.create({
      nome: nomeNormalizado,
      ativo: createClienteDto.ativo ?? true,
    });

    return this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({
      order: { nome: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['certificados'],
    });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    return cliente;
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const cliente = await this.findOne(id);

    if (updateClienteDto.nome) {
      const nomeNormalizado = updateClienteDto.nome.trim();

      const clienteExistente = await this.clienteRepository.findOne({
        where: { nome: ILike(nomeNormalizado) },
      });

      if (clienteExistente && clienteExistente.id !== id) {
        throw new ConflictException('Já existe um cliente com esse nome.');
      }

      cliente.nome = nomeNormalizado;
    }

    if (typeof updateClienteDto.ativo === 'boolean') {
      cliente.ativo = updateClienteDto.ativo;
    }

    return this.clienteRepository.save(cliente);
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
  }
}