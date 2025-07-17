import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

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
  @Type(() => Number)
  @IsNumber()
  tCO2Compensadas: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  numeroArvores: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  areaM2: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imagens?: string[];
}
