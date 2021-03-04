import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUserInput {

    @Field()
    email: string;
    @Field()
    password: string;
    @Field({ nullable: true })
    nome?: string;
    @Field({ nullable: true })
    emailAlternativo?: string;
    @Field({ nullable: true })
    nascimento?: Date;
    @Field({ nullable: true })
    cargo?: string;
    @Field({ nullable: true })
    telefone1?: string;
    @Field({ nullable: true })
    telefone2?: string;
    @Field({ nullable: true })
    profissao?: string;
    @Field({ nullable: true })
    abrigoId?: number;
}