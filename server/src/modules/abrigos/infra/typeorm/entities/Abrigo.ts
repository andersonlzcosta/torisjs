import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import User from '@modules/users/infra/typeorm/entities/User';

//aulas "id" "nome" "video_url"
//cursos "id" "nome" "descricao" "aulas"

@ObjectType()
@Entity('abrigos')
class Abrigo {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Field()
    @Column()
    nome: string;

    @Field({ nullable: true })
    @Column({ unique: true, nullable: true })
    telefone1: string;

    @Field({ nullable: true })
    @Column({ unique: true, nullable: true })
    telefone2: string;

    @Field({ nullable: true })
    @Column({ unique: true, nullable: true })
    email1: string;

    @Field({ nullable: true })
    @Column({ unique: true, nullable: true })
    email2: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    endereco: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    bairro: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    cidade: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    estado: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    classificacao: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    capacidade: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    faixaEtaria: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    lgbt: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    genero: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    pcd: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    observacao: string;

    @Field(() => [User],{ nullable: true })
    @OneToMany(() => User, user => user.abrigo, { nullable: true })
    profissionais: User[];
    
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Abrigo;