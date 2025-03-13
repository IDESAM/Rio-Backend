import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(dto: CreateUsuarioDto): Promise<Omit<Usuario, 'senhaHash'>> {
    const { nome, email, senha } = dto;

    // Verifica se o email já está em uso
    const usuarioExistente = await this.usuarioRepository.findOne({ where: { email } });
    if (usuarioExistente) {
      throw new BadRequestException('E-mail já está em uso');
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const usuario = this.usuarioRepository.create({
      nome,
      email,
      senhaHash,
      permissoes: ['USER'],
    });

    const novoUsuario = await this.usuarioRepository.save(usuario);
    delete novoUsuario.senhaHash; // Remove a senha do retorno

    return novoUsuario;
  }

  async login(dto: LoginUsuarioDto): Promise<{ token: string }> {
    const { email, senha } = dto;
    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verifica a senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaCorreta) {
      throw new BadRequestException('Credenciais inválidas');
    }

    // Retorna um token JWT (implementaremos depois)
    return { token: 'JWT_AQUI' };
  }
}
