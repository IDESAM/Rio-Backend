import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('clientes')
export class Cliente {
    @PrimaryColumn() // Agora aceita um ID personalizado
    id: string;

    @Column()
    nome: string;
}
