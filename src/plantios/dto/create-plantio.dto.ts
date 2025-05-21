import { IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class CreatePlantioDto {
  @IsNotEmpty()
  clienteId: string;

  @IsNotEmpty()
  safId: string;

  @IsNotEmpty()
  comunidadeId: string;

  @IsNotEmpty()
  proprietarioId: string;

  @IsNotEmpty()
  @IsNumber()
  anoCompensacao: number;

  @IsNotEmpty()
  @IsNumber()
  tCO2Compensadas: number;

  @IsNotEmpty()
  @IsNumber()
  numeroArvores: number;

  @IsNotEmpty()
  @IsNumber()
  areaM2: number;
}
