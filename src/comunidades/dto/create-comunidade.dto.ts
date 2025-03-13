import { IsNotEmpty } from 'class-validator';

export class CreateComunidadeDto {
  @IsNotEmpty()
  nome: string;
}
