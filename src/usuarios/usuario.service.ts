import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) { }

  async create(dto: CreateUsuarioDto): Promise<Omit<Usuario, 'senhaHash'>> {
    const { nome, email, senha } = dto;

    const usuarioExistente = await this.usuarioRepository.findOne({ where: { email } });
    if (usuarioExistente) {
      throw new BadRequestException('E-mail já está em uso');
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const usuario = this.usuarioRepository.create({
      nome,
      email,
      senhaHash,
      permissoes: ['USER'],
    });

    const novoUsuario = await this.usuarioRepository.save(usuario);
    delete novoUsuario.senhaHash;

    return novoUsuario;
  }

  async login(dto: LoginUsuarioDto): Promise<{ token: string }> {
    const { email, senha } = dto;
    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaCorreta) {
      throw new BadRequestException('Credenciais inválidas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      permissoes: usuario.permissoes,
    };

    const token = this.jwtService.sign(payload);

    return {token};
  }
}
