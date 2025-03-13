import { IsOptional, IsEmail } from 'class-validator';

export class UpdateProprietarioDto {
  @IsOptional()
  nome?: string;

  @IsOptional()
  telefone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
