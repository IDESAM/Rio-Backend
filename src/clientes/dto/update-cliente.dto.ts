import { IsOptional } from 'class-validator';

export class UpdateClienteDto {
  @IsOptional()
  nome?: string;
}
