export class CertificadoResponseDto {
  id: string;
  codigo: string;
  ano: number;
  tco2Compensadas: number;
  arvores: number;
  areaM2: number;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;

  cliente: {
    id: number;
    nome: string;
  };

  saf: {
    id: string;
    identificacao: string;
    localizacao: {
      latitude: number | null;
      longitude: number | null;
    };
  };

  comunidade: {
    id: string;
    nome: string;
  };

  proprietario: {
    id: string;
    nome: string;
  };
}