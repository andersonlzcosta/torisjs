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
    id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    nome: string;

    @Field(() => Curso, { nullable: true })
    @ManyToOne(() => Curso, curso => curso.modulos)
    curso: Curso;

    @Field(() => [Aula], { nullable: true })
    @OneToMany(() => Aula, aula => aula.modulo)
    aulas?: Aula[];

    @Field(() => [Pergunta], { nullable: true })
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