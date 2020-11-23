import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Modulo from '@modules/cursos/infra/typeorm/entities/Modulo';

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

    @Field(() => [Modulo])
    @OneToMany(() => Modulo, modulo => modulo.curso)
    modulos?: Modulo[];
    
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Curso;