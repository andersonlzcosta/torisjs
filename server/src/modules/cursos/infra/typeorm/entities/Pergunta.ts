import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Modulo from '@modules/cursos/infra/typeorm/entities/Modulo';

@ObjectType()
@Entity('modulo_perguntas')
class Pergunta {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    ordem: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    enunciado: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    alternativa1: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    alternativa2: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    alternativa3: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    alternativa4: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    resposta: number;
    
    @Field({ nullable: true })
    @Column({ nullable: true })
    justificativa: string;

    @Field(() => Modulo, { nullable: true })
    @ManyToOne(() => Modulo, modulo => modulo.perguntas)
    modulo: Modulo;
    
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Pergunta;