import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('safs')
export class SAF {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  identificacao: string;

  @Column('decimal', { precision: 9, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 9, scale: 6 })
  longitude: number;

  @Column('text', { array: true, nullable: true })
  imagens?: string[];
}

