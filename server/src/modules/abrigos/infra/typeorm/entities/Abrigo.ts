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

    @Field()
    @Column({ unique: true, nullable: true })
    telefone1: string;

    @Field()
    @Column({ unique: true, nullable: true })
    telefone2: string;

    @Field()
    @Column({ unique: true, nullable: true })
    email1: string;

    @Field()
    @Column({ unique: true, nullable: true })
    email2: string;

    @Field()
    @Column({ nullable: true })
    endereco: string;

    @Field()
    @Column({ nullable: true })
    bairro: string;

    @Field()
    @Column({ nullable: true })
    cidade: string;

    @Field()
    @Column({ nullable: true })
    estado: string;

    @Field()
    @Column({ nullable: true })
    classificacao: string;

    @Field()
    @Column({ nullable: true })
    capacidade: string;

    @Field()
    @Column({ nullable: true })
    faixaEtaria: string;

    @Field()
    @Column({ nullable: true })
    lgbt: boolean;

    @Field()
    @Column({ nullable: true })
    genero: string;

    @Field()
    @Column({ nullable: true })
    pcd: boolean;

    @Field()
    @Column({ nullable: true })
    observacao: string;

    @Field(() => [User])
    @OneToMany(() => User, user => user.abrigo)
    profissionais: User[];
    
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Abrigo;