import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('proprietarios')
export class Proprietario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ nullable: true })
  telefone?: string;

  @Column({ nullable: true })
  email?: string;
}
