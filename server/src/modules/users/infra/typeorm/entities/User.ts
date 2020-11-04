import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity('users')
class User {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Field(() => String)
    @Column()
    password: string;

    @Field(() => String)
    @Column()
    nome: string;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Field(() => String)
    @Column()
    idade: string;

    @Field(() => String)
    @Column()
    profissao: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}

export default User;