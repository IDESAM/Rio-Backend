import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  imagem?: string;
}