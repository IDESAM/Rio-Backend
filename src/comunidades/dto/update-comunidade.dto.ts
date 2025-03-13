import { IsOptional } from 'class-validator';

export class UpdateComunidadeDto {
  @IsOptional()
  nome?: string;
}
