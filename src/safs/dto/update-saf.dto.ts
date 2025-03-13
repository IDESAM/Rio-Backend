import { IsOptional, IsNumber } from 'class-validator';

export class UpdateSafDto {
  @IsOptional()
  identificacao?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;
}
