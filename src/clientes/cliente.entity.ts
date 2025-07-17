import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('clientes')
export class Cliente {
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column({ nullable: true })
    imagem?: string; // campo opcional para URL da imagem
}

