import { IsNotEmpty, Matches } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @Matches(/^PCN\d{4}$/, { message: 'O ID do cliente deve seguir o formato PCNXXXX (ex: PCN2300)' })
  id: string;

  @IsNotEmpty()
  nome: string;
}
