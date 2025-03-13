import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSafDto {
  @IsNotEmpty()
  identificacao: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
