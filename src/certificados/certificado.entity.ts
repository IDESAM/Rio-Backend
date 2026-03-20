import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { SAF } from '../safs/saf.entity';
import { Comunidade } from '../comunidades/comunidade.entity';
import { Proprietario } from '../proprietarios/proprietario.entity';

@Entity('certificados')
export class Certificado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  codigo: string;

  @Column({ name: 'cliente_id', type: 'int' })
  clienteId: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.certificados, {
    nullable: false,
    eager: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ name: 'saf_id', type: 'uuid' })
  safId: string;

  @ManyToOne(() => SAF, {
    nullable: false,
    eager: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'saf_id' })
  saf: SAF;

  @Column({ name: 'comunidade_id', type: 'uuid' })
  comunidadeId: string;

  @ManyToOne(() => Comunidade, {
    nullable: false,
    eager: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'comunidade_id' })
  comunidade: Comunidade;

  @Column({ name: 'proprietario_id', type: 'uuid' })
  proprietarioId: string;

  @ManyToOne(() => Proprietario, {
    nullable: false,
    eager: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'proprietario_id' })
  proprietario: Proprietario;

  @Column({ type: 'int' })
  ano: number;

  @Column({
    name: 'tco2_compensadas',
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  tco2Compensadas: string;

  @Column({ type: 'int' })
  arvores: number;

  @Column({
    name: 'area_m2',
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  areaM2: string;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}    