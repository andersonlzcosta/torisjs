import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Resposta from '@modules/forums/infra/typeorm/entities/Resposta';
// import Categoria from '@modules/forums/infra/typeorm/entities/Categoria';

@ObjectType()
@Entity('forum_perguntas')
class Pegunta {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Field()
    @Column()
    titulo: string;

    @Field()
    @Column()
    corpo: string;

    @Field()
    @Column({ default: false, type: "bool" })
    foiResolvido: boolean;

    @Field(() => [Resposta])
    @OneToMany(() => Resposta, resposta => resposta.pergunta)
    respostas?: Resposta[];

    // @Field(() => [Categoria])
    // @ManyToMany(() => Categoria, categoria => categoria.resposta)
    // categorias?: Categoria[];
    
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Pegunta;