import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import Aula from '@modules/cursos/infra/typeorm/entities/Aula';
import Pergunta from '@modules/cursos/infra/typeorm/entities/Pergunta';

@ObjectType()
@Entity('curso_modulos')
class Modulo {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Field()
    @Column()
    nome: string;

    @Field(() => Curso)
    @ManyToOne(() => Curso, curso => curso.modulos)
    curso: Curso;

    @Field(() => [Aula])
    @OneToMany(() => Aula, aula => aula.modulo)
    aulas?: Aula[];

    @Field(() => [Pergunta])
    @OneToMany(() => Pergunta, pergunta => pergunta.modulo)
    perguntas?: Pergunta[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Modulo;