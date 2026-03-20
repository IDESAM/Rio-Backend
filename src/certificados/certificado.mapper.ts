import { Certificado } from './certificado.entity';
import { CertificadoResponseDto } from './dto/certificado-response.dto';

export function toCertificadoResponseDto(
    certificado: Certificado,
): CertificadoResponseDto {
    return {
        id: certificado.id,
        codigo: certificado.codigo,
        clienteId: certificado.clienteId,
        cliente: certificado.cliente.nome,
        safId: certificado.safId,
        saf: certificado.saf.identificacao,
        comunidadeId: certificado.comunidadeId,
        comunidade: certificado.comunidade.nome,
        proprietarioId: certificado.proprietarioId,
        proprietarioResponsavel: certificado.proprietario.nome,
        ano: certificado.ano,
        tco2Compensadas: certificado.tco2Compensadas,
        arvores: certificado.arvores,
        areaM2: certificado.areaM2,
        latitude: certificado.saf?.latitude?.toString() ?? null,
        longitude: certificado.saf?.longitude?.toString() ?? null,
        ativo: certificado.ativo,
        createdAt: certificado.createdAt,
        updatedAt: certificado.updatedAt,
    };
}