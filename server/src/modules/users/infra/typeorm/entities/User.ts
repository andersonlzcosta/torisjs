import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    password: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    idade: string;

    @Column()
    profissao: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;