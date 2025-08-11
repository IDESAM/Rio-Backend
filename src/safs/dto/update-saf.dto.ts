import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateSafDto {
  @IsOptional()
  identificacao?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString({ each: true })
  imagens?: string[];
}
