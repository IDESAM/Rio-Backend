import { Certificado } from './certificado.entity';
import { CertificadoResponseDto } from './dto/certificado-response.dto';

export function toCertificadoResponseDto(
  certificado: Certificado,
): CertificadoResponseDto {
  return {
    id: certificado.id,
    codigo: certificado.codigo,
    ano: certificado.ano,
    tco2Compensadas: Number(certificado.tco2Compensadas),
    arvores: certificado.arvores,
    areaM2: Number(certificado.areaM2),
    ativo: certificado.ativo,
    createdAt: certificado.createdAt,
    updatedAt: certificado.updatedAt,

    cliente: {
      id: certificado.cliente.id,
      nome: certificado.cliente.nome,
    },

    saf: {
      id: certificado.saf.id,
      identificacao: certificado.saf.identificacao,
      localizacao: {
        latitude: certificado.saf?.latitude
          ? Number(certificado.saf.latitude)
          : null,
        longitude: certificado.saf?.longitude
          ? Number(certificado.saf.longitude)
          : null,
      },
    },

    comunidade: {
      id: certificado.comunidade.id,
      nome: certificado.comunidade.nome,
    },

    proprietario: {
      id: certificado.proprietario.id,
      nome: certificado.proprietario.nome,
    },
  };
}