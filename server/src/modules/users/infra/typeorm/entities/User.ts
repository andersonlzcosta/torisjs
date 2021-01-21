import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Abrigo from '@modules/abrigos/infra/typeorm/entities/Abrigo';

@ObjectType()
@Entity('users')
class User {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    password: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    nome?: string;

    @Field()
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
    @ManyToOne(() => Abrigo, abrigo => abrigo.profissionais)
    abrigo?: Abrigo;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default User;