import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { SAF } from '../safs/saf.entity';
import { Comunidade } from '../comunidades/comunidade.entity';
import { Proprietario } from '../proprietarios/proprietario.entity';

@Entity('plantios')
export class Plantio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cliente, { eager: true })
  cliente: Cliente;  // Agora aceita ID de Cliente no formato PCNXXXX

  @ManyToOne(() => SAF, { eager: true })
  saf: SAF;

  @ManyToOne(() => Comunidade, { eager: true })
  comunidade: Comunidade;

  @ManyToOne(() => Proprietario, { eager: true })
  proprietario: Proprietario;

  @Column()
  anoCompensacao: number;

  @Column('decimal', { precision: 10, scale: 2 })
  tCO2Compensadas: number;

  @Column()
  numeroArvores: number;

  @Column('decimal', { precision: 10, scale: 2 })
  areaM2: number;

  @Column("text", { array: true, nullable: true })
  imagens?: string[];
}
