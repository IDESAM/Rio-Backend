import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comunidades')
export class Comunidade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;
}
