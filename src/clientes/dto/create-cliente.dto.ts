import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  nome: string;
}

