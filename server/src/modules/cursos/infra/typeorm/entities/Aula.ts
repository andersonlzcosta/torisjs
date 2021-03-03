import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Modulo from '@modules/cursos/infra/typeorm/entities/Modulo';

@ObjectType()
@Entity('modulo_aulas')
class Aula {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    ordem: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    nome: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    descricao: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    video_url: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    duracao: string;

    @Field(() => Modulo, { nullable: true })
    @ManyToOne(() => Modulo, modulo => modulo.aulas)
    modulo: Modulo;
    
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Aula;