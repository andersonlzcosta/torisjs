import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Pergunta from '@modules/forums/infra/typeorm/entities/Pergunta';

@ObjectType()
@Entity('forum_respostas')
class Resposta {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    corpo: string;

    @Field(() => Pergunta, { nullable: true })
    @ManyToOne(() => Pergunta, pergunta => pergunta.respostas)
    pergunta: Pergunta;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Resposta;