import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import User from '@modules/users/infra/typeorm/entities/User';

@ObjectType()
@Entity('notificacoes')
class Notificacao {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Field()
    @Column()
    conteudo: string;

    @Field()
    @Column({ default: false, type: "bool" })
    arquivada: boolean;

    @Field()
    @Column({ nullable: true })
    tipo: string;

    @Field(() => [User], { nullable: true })
    @ManyToMany(() => User, user => user.notificacoes)
    users?: User[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Notificacao;