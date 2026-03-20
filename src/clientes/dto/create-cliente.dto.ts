import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  nome: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}