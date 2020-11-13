import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Abrigo from '@modules/abrigos/infra/typeorm/entities/Abrigo';

@ObjectType()
@Entity('users')
class User {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Field()
    @Column()
    password: string;

    @Field()
    @Column()
    nome: string;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Field()
    @Column()
    idade: string;

    @Field()
    @Column()
    profissao: string;

    @Field(() => Abrigo)
    @ManyToOne(() => Abrigo, abrigo => abrigo.profissionais)
    abrigo: Abrigo;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default User;