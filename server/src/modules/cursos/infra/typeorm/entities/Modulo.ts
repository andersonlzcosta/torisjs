import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Curso from '@modules/cursos/infra/typeorm/entities/Curso';

@ObjectType()
@Entity('modulos')
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

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Modulo;