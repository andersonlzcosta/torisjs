import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

// import User from '@modules/users/infra/typeorm/entities/User';
//abrigos "id" "nome" "endereco" "classificacao" "capacidade" "faixaEtaria" "profissionais"
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
    @Column({ unique: true })
    endereco: string;

    @Field()
    @Column()
    classificacao: string;

    @Field()
    @Column()
    capacidade: string;

    @Field()
    @Column()
    faixaEtaria: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Abrigo;