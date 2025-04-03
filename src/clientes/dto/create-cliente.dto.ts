import { IsNotEmpty, Matches } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}\d{4}$/, {
    message: 'O ID do cliente deve seguir o formato AAA9999 (3 letras + 4 dígitos, ex: PCN2300 ou ARV0052)',
  })
  id: string;

  @IsNotEmpty()
  nome: string;
}

