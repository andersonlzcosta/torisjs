import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Pergunta from '@modules/forums/infra/typeorm/entities/Pergunta';

@ObjectType()
@Entity('forum_categorias')
class Categoria {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    nome: string;
    
    // @Field(() => [Pergunta], { nullable: true })
    // @ManyToMany(() => Pergunta, pergunta => pergunta.categorias, { nullable: true })
    // perguntas?: Pergunta[];
    
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Categoria;