import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSafDto {
  @IsNotEmpty()
  identificacao: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsString({ each: true })
  imagens?: string[];
}
