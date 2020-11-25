import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Modulo from '@modules/cursos/infra/typeorm/entities/Modulo';

@ObjectType()
@Entity('modulo_perguntas')
class Pergunta {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Field()
    @Column({ type: "int" })
    ordem: number;

    @Field()
    @Column()
    enunciado: string;

    @Field()
    @Column()
    alternativa1: string;

    @Field()
    @Column()
    alternativa2: string;

    @Field()
    @Column()
    alternativa3: string;

    @Field()
    @Column()
    alternativa4: string;

    @Field()
    @Column({ type: "int" })
    resposta: number;
    
    @Field()
    @Column()
    justificativa: string;

    @Field(() => Modulo)
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