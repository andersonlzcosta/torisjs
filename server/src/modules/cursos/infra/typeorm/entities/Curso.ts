import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
// import User from '@modules/users/infra/typeorm/entities/User';

//aulas "id" "nome" "video_url"
//cursos "id" "nome" "descricao" "aulas"

@ObjectType()
@Entity('cursos')
class Curso {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Field()
    @Column()
    nome: string;

    @Field()
    @Column()
    descricao: string;

    // @Field(() => [Aula])
    // @OneToMany(() => Aula, aula => aula.curso)
    // aulas?: Aula[];

    // @Field(() => [Pergunta])
    // @OneToMany(() => Pergunta, pergunta => pergunta.curso)
    // perguntas?: Pergunta[];
    
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Curso;