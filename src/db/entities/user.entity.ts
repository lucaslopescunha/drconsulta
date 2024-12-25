import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'USER'})
export class UsuarioEntity {

    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ type: "varchar"})
    username: string;

    @Column({ type: 'varchar', name: 'password_hash' })
    passwordHash: string;
}
