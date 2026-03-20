import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Matches,
    MaxLength,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCertificadoDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    codigo: string;

    @Type(() => Number)
    @IsInt()
    clienteId: number;

    @IsUUID()
    safId: string;

    @IsUUID()
    comunidadeId: string;

    @IsUUID()
    proprietarioId: string;

    @Type(() => Number)
    @IsInt()
    @Min(1900)
    ano: number;

    @IsString()
    @Matches(/^\d+(\.\d{1,2})?$/)
    tco2Compensadas: string;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    arvores: number;

    @IsString()
    @Matches(/^\d+(\.\d{1,2})?$/)
    areaM2: string;

    @IsOptional()
    @IsBoolean()
    ativo?: boolean;
}