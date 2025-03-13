import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateProprietarioDto {
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  telefone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
