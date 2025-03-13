import { IsOptional, IsNumber, IsUUID } from 'class-validator';

export class UpdatePlantioDto {
  @IsOptional()
  @IsUUID()
  clienteId?: string;

  @IsOptional()
  @IsUUID()
  safId?: string;

  @IsOptional()
  @IsUUID()
  comunidadeId?: string;

  @IsOptional()
  @IsUUID()
  proprietarioId?: string;

  @IsOptional()
  @IsNumber()
  anoCompensacao?: number;

  @IsOptional()
  @IsNumber()
  tCO2Compensadas?: number;

  @IsOptional()
  @IsNumber()
  numeroArvores?: number;

  @IsOptional()
  @IsNumber()
  areaM2?: number;
}
