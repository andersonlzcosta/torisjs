import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, registerEnumType } from 'type-graphql';
import Abrigo from '@modules/abrigos/infra/typeorm/entities/Abrigo';
import Notificacao from '@modules/notificacoes/infra/typeorm/entities/Notificacao';

export enum Credencial {
    Admin = "Admin",
    AbrigoAdmin = "AbrigoAdmin",
    Aluno = "Aluno",
}

registerEnumType(Credencial, {name: 'Credencial'});

@ObjectType()
@Entity('users')
class User {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    password: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    nome?: string;

    @Field({ nullable: true })
    @Column({
        type: "enum",
        enum: Credencial,
        default: Credencial.Aluno,
        nullable: true,
    })
    credencial: Credencial;

    @Field({ nullable: true })
    @Column({ unique: true })
    email!: string;

    @Field({ nullable: true })
    @Column({ unique: true, nullable: true })
    emailAlternativo?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    nascimento?: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    cargo?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    telefone1?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    telefone2?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    profissao?: string;

    @Field(() => Abrigo, { nullable: true })
    @ManyToOne(() => Abrigo, abrigo => abrigo.profissionais,  {
        eager: true,
        nullable: true
    })
    abrigo?: Abrigo;

    @Field(() => [Notificacao], { nullable: true })
    @OneToMany(() => Notificacao, notificacao => notificacao.user,  {
        eager: true
    })
    notificacoes?: Notificacao[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
    
}

export default User;