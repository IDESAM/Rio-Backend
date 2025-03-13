import { IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class CreatePlantioDto {
  @IsNotEmpty()
  @Matches(/^PCN\d{4}$/, { message: 'clienteId deve estar no formato PCNXXXX (ex: PCN2300)' })
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
