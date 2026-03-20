export class CertificadoResponseDto {
    id: string;
    codigo: string;
    clienteId: number;
    cliente: string;
    safId: string;
    saf: string;
    comunidadeId: string;
    comunidade: string;
    proprietarioId: string;
    proprietarioResponsavel: string;
    ano: number;
    tco2Compensadas: string;
    arvores: number;
    areaM2: string;
    latitude: string | null;
    longitude: string | null;
    ativo: boolean;
    createdAt: Date;
    updatedAt: Date;
}